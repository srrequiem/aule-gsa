import React, { Component } from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";
import PageSection from "../../components/PageSection/PageSection";
import AccountSectionItem from "../../components/Accounts/AccountSectionItem";
import AccountForm from "../../components/Accounts/AccountForm";
import AccountPaymentDialogForm from "../../components/Accounts/AccountPaymentDialogForm";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";

class Accounts extends Component {
    state = {
        showForm: false,
        accounts: [],
        accountID: "",
        paymentDialogOpen: false,
        deleteDialogOpen: false
    };

    componentDidMount() {
        this.props.firebase.getAccounts().then(snapshots => {
            const accounts = [];
            snapshots.forEach(doc =>
                accounts.push({ id: doc.id, ...doc.data() })
            );
            this.setState({ accounts });
        });
    }

    onOpenPaymentDialog = accountID => {
        this.setState({ accountID, paymentDialogOpen: true });
    };

    onClosePaymentDialog = () => {
        this.setState({ paymentDialogOpen: false });
    };

    onCreate = () => {
        this.setState({ showForm: true });
    };

    onDelete = accountID => {
        this.setState({ accountID, deleteDialogOpen: true });
    };

    handleDeleteConfirmation = decision => {
        if (decision) {
            const { accountID } = this.state;
            this.props.firebase
                .deleteAccount(accountID)
                .then(() => {
                    this.setState({ deleteDialogOpen: false });
                })
                .catch(error => console.log(error));
        } else {
            this.setState({ deleteDialogOpen: false });
        }
    };

    onCancel = () => {
        this.setState({ showForm: false });
    };

    render() {
        const {
            showForm,
            accounts,
            accountID,
            paymentDialogOpen,
            deleteDialogOpen
        } = this.state;
        return (
            <AppView title="Accounts">
                <PageSection onCreate={this.onCreate}>
                    {showForm && <AccountForm onCancel={this.onCancel} />}
                    {accounts.map(account => (
                        <AccountSectionItem
                            key={account.id}
                            id={account.id}
                            name={account.name}
                            email={account.email}
                            phone={account.phone}
                            balance={account.balance}
                            onDelete={this.onDelete}
                            onAddPayment={this.onOpenPaymentDialog}
                        />
                    ))}
                </PageSection>
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
            </AppView>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Accounts);
