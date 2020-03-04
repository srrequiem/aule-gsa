import React, { Component } from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";
import PageSection from "../../components/PageSection/PageSection";
import AccountSectionItem from "../../components/Accounts/AccountSectionItem";
import AccountForm from "../../components/Accounts/AccountForm";

class Accounts extends Component {
    state = {
        showForm: false,
        accounts: []
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

    onCreate = () => {
        this.setState({ showForm: true });
    };

    onCancel = () => {
        this.setState({ showForm: false });
    };

    render() {
        const { showForm, accounts } = this.state;
        return (
            <AppView title="Accounts">
                <PageSection onCreate={this.onCreate}>
                    {showForm && <AccountForm onCancel={this.onCancel} />}
                    {accounts.map(account => (
                        <AccountSectionItem
                            key={account.id}
                            name={account.name}
                            email={account.email}
                            phone={account.phone}
                            balance={account.balance}
                        />
                    ))}
                </PageSection>
            </AppView>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Accounts);
