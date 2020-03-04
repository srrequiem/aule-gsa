import React, { Component } from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";
import PageSection from "../../components/PageSection/PageSection";
import GroupServicesSectionItem from "../../components/GroupServices/GroupServicesSectionItem";
import GroupServicesForm from "../../components/GroupServices/GroupServicesForm";

class GroupServices extends Component {
    state = {
        groupServices: [],
        groupServicesAccounts: {}
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

    renderSectionItems = () => {
        const { groupServices, groupServicesAccounts } = this.state;
        return groupServices.map(group => {
            const accounts = [];
            for (let accountID of group.accounts) {
                if (groupServicesAccounts[accountID]) {
                    accounts.push(groupServicesAccounts[accountID]);
                }
            }
            return <GroupServicesSectionItem key={group.id} name={group.name} accounts={accounts} />;
        });
    };

    renderFormComponent = onCancelEvent => {
        return <GroupServicesForm onCancel={onCancelEvent} />;
    };

    render() {
        return (
            <AppView title="Group Services">
                <PageSection>
                    {this.renderSectionItems()}
                </PageSection>
            </AppView>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(GroupServices);
