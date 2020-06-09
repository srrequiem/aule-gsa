import React, { Component } from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";
import PageSection from "../../components/PageSection/PageSection";
import ServicesFeeForm from "../../components/ServicesFees/ServicesFeeForm";
import ServicesFeeSectionItem from "../../components/ServicesFees/ServicesFeeSectionItem";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";

class ServicesFees extends Component {
    state = {
        showForm: false,
        servicesFees: [],
        servicesFeesAccounts: {},
        servicesFeeID: "",
        deleteDialogOpen: false,
        itemToEdit: {},
    };

    componentDidMount() {
        const servicesFees = [];
        this.props.firebase
            .getServicesFees()
            .then((snapshots) => {
                snapshots.forEach((doc) =>
                    servicesFees.push({ id: doc.id, ...doc.data() })
                );
                this.setState({ servicesFees });
            })
            .then(() => {
                const accountPromises = [];
                const accounts = [];
                for (let servicesFee of servicesFees) {
                    for (let accountID of servicesFee.accountsIDS) {
                        if (!accounts.includes(accountID)) {
                            accounts.push(accountID);
                            accountPromises.push(
                                this.props.firebase.getAccount(accountID)
                            );
                        }
                    }
                }
                Promise.all(accountPromises).then((docs) => {
                    const servicesFeesAccounts = {};
                    for (let doc of docs) {
                        servicesFeesAccounts[doc.id] = doc.data();
                    }
                    this.setState({ servicesFeesAccounts });
                });
            });
    }

    onCreate = () => {
        this.setState({ showForm: true, itemToEdit: {} });
    };

    onEdit = (itemToEdit) => {
        this.setState({ showForm: true, itemToEdit });
    };

    onDelete = (servicesFeeID) => {
        this.setState({ servicesFeeID, deleteDialogOpen: true });
    };

    handleDeleteConfirmation = (decision) => {
        if (decision) {
            const { servicesFeeID } = this.state;
            this.props.firebase
                .deleteServicesFee(servicesFeeID)
                .then(() => {
                    this.setState({ deleteDialogOpen: false });
                })
                .catch((error) => console.log(error));
        } else {
            this.setState({ deleteDialogOpen: false });
        }
    };

    onCancel = () => {
        this.setState({ showForm: false });
    };

    renderSectionItems = () => {
        const { servicesFees, servicesFeesAccounts } = this.state;
        return servicesFees.map((servicesFee) => {
            const accounts = [];
            for (let accountID of servicesFee.accountsIDS) {
                if (servicesFeesAccounts[accountID]) {
                    accounts.push(servicesFeesAccounts[accountID]);
                }
            }
            return (
                <ServicesFeeSectionItem
                    key={servicesFee.id}
                    item={servicesFee}
                    accounts={accounts}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                />
            );
        });
    };

    render() {
        const { showForm, deleteDialogOpen, itemToEdit } = this.state;
        return (
            <AppView title="Services Fees">
                <PageSection onCreate={this.onCreate}>
                    {showForm && (
                        <ServicesFeeForm
                            itemToEdit={itemToEdit}
                            onCancel={this.onCancel}
                        />
                    )}
                    {this.renderSectionItems()}
                </PageSection>
                <DeleteDialog
                    entity="services fee"
                    open={deleteDialogOpen}
                    handleConfirmation={this.handleDeleteConfirmation}
                />
            </AppView>
        );
    }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ServicesFees);
