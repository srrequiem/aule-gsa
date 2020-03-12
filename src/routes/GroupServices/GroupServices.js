import React, { Component } from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";
import PageSection from "../../components/PageSection/PageSection";
import GroupServicesSectionItem from "../../components/GroupServices/GroupServicesSectionItem";
import GroupServicesForm from "../../components/GroupServices/GroupServicesForm";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";

class GroupServices extends Component {
    state = {
        groupServices: [],
        groupServicesAccounts: {},
        showForm: false,
        groupServiceID: "",
        deleteDialogOpen: false
    };

    componentDidMount() {
        const groupServices = [];
        this.props.firebase
            .getGroupServices()
            .then(groupSnap => {
                groupSnap.forEach(doc =>
                    groupServices.push({ id: doc.id, ...doc.data() })
                );
                this.setState({ groupServices });
            })
            .then(() => {
                const accountPromises = [];
                const accounts = [];
                for (let group of groupServices) {
                    for (let accountID of group.accounts) {
                        if (!accounts.includes(accountID)) {
                            accounts.push(accountID);
                            accountPromises.push(
                                this.props.firebase.getAccount(accountID)
                            );
                        }
                    }
                }
                Promise.all(accountPromises).then(docs => {
                    const groupServicesAccounts = {};
                    for (let doc of docs) {
                        groupServicesAccounts[doc.id] = doc.data();
                    }
                    this.setState({ groupServicesAccounts });
                });
            });
    }

    onCreate = () => {
        this.setState({ showForm: true });
    };

    onCancel = () => {
        this.setState({ showForm: false });
    };

    onDelete = groupServiceID => {
        this.setState({ groupServiceID, deleteDialogOpen: true });
    };

    handleDeleteConfirmation = decision => {
        if (decision) {
            const { groupServiceID } = this.state;
            this.props.firebase
                .deleteGroupService(groupServiceID)
                .then(() => {
                    this.setState({ deleteDialogOpen: false });
                })
                .catch(error => console.log(error));
        } else {
            this.setState({ deleteDialogOpen: false });
        }
    };

    renderSectionItems = () => {
        const { groupServices, groupServicesAccounts } = this.state;
        return groupServices.map(group => {
            const accounts = [];
            for (let accountID of group.accounts) {
                if (groupServicesAccounts[accountID]) {
                    accounts.push(groupServicesAccounts[accountID]);
                }
            }
            return (
                <GroupServicesSectionItem
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    accounts={accounts}
                    onDelete={this.onDelete}
                />
            );
        });
    };

    render() {
        const { showForm, deleteDialogOpen } = this.state;
        return (
            <AppView title="Group Services">
                <PageSection onCreate={this.onCreate}>
                    {showForm && <GroupServicesForm onCancel={this.onCancel} />}
                    {this.renderSectionItems()}
                </PageSection>
                <DeleteDialog
                    entity="group services"
                    open={deleteDialogOpen}
                    handleConfirmation={this.handleDeleteConfirmation}
                />
            </AppView>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(GroupServices);
