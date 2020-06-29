import React, { Component } from "react";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";
import AccountSectionItem from "../../components/Accounts/AccountSectionItem";
import AccountDialogForm from "../../components/Accounts/AccountDialogForm";
import AccountPaymentDialogForm from "../../components/Accounts/AccountPaymentDialogForm";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";
import AccountSection from "../../containers/AccountSection/AccountSection";

class Accounts extends Component {
    state = {
        formDialogOpen: false,
        accounts: [],
        accountID: "",
        paymentDialogOpen: false,
        deleteDialogOpen: false,
        itemToEdit: {},
    };

    componentDidMount() {
        this.props.firebase.getAccounts().then((snapshots) => {
            const accounts = [];
            snapshots.forEach((doc) =>
                accounts.push({ id: doc.id, ...doc.data() })
            );
            this.setState({ accounts });
        });
    }

    onOpenPaymentDialog = (accountID) => {
        this.setState({ accountID, paymentDialogOpen: true });
    };

    onClosePaymentDialog = () => {
        this.setState({ paymentDialogOpen: false });
    };

    onCreate = () => {
        this.setState({ formDialogOpen: true, itemToEdit: {} });
    };

    onEdit = (itemToEdit) => {
        this.setState({ formDialogOpen: true, itemToEdit });
    };

    onDelete = (accountID) => {
        this.setState({ accountID, deleteDialogOpen: true });
    };

    handleDeleteConfirmation = (decision) => {
        if (decision) {
            const { accountID } = this.state;
            this.props.firebase
                .deleteAccount(accountID)
                .then(() => {
                    this.setState({ deleteDialogOpen: false });
                })
                .catch((error) => console.log(error));
        } else {
            this.setState({ deleteDialogOpen: false });
        }
    };

    onClose = (error) => {
        if (error) console.log(error);
        this.setState({ formDialogOpen: false });
    };

    render() {
        const {
            formDialogOpen,
            accounts,
            accountID,
            paymentDialogOpen,
            deleteDialogOpen,
            itemToEdit,
        } = this.state;
        return (
            <AppView title="Accounts">
                <AccountSection>
                    {accounts.map((account) => (
                        <AccountSectionItem
                            key={account.id}
                            item={account}
                            onDelete={this.onDelete}
                            onEdit={this.onEdit}
                            onAddPayment={this.onOpenPaymentDialog}
                        />
                    ))}
                </AccountSection>
                <AccountDialogForm
                    open={formDialogOpen}
                    itemToEdit={itemToEdit}
                    onClose={this.onClose}
                />
                <AccountPaymentDialogForm
                    open={paymentDialogOpen}
                    onClose={this.onClosePaymentDialog}
                    accountID={accountID}
                />
                <DeleteDialog
                    entity="account"
                    open={deleteDialogOpen}
                    handleConfirmation={this.handleDeleteConfirmation}
                />
                <Fab
                    aria-label="Add"
                    color="primary"
                    onClick={this.onCreate}
                    style={{
                        position: "fixed",
                        bottom: "2rem",
                        right: "2rem",
                    }}
                >
                    <Add />
                </Fab>
            </AppView>
        );
    }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Accounts);
