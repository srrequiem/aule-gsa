import React, { Component } from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";
import PageSection from "../../components/PageSection/PageSection";
import AccountSectionItem from "../../components/Accounts/AccountSectionItem";
import AccountForm from "../../components/Accounts/AccountForm";
import AccountPaymentForm from "../../components/Accounts/AccountPaymentForm";

class Accounts extends Component {
    state = {
        showForm: false,
        accounts: [],
        paymentDialogOpen: false,
        accountID: ""
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

    onCancel = () => {
        this.setState({ showForm: false });
    };

    render() {
        const { showForm, accounts, paymentDialogOpen, accountID } = this.state;
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
                            onAddPayment={this.onOpenPaymentDialog}
                        />
                    ))}
                </PageSection>
                <AccountPaymentForm
                    open={paymentDialogOpen}
                    onClose={this.onClosePaymentDialog}
                    accountID={accountID}
                />
            </AppView>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Accounts);
