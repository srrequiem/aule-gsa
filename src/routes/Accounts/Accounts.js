import React, { Component } from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";
import PageSection from "../../components/PageSection/PageSection";
import AccountSectionItem from "../../components/Accounts/AccountSectionItem";
import AccountForm from "../../components/Accounts/AccountForm";

class Accounts extends Component {
    state = {
        accounts: []
    };

    componentDidMount() {
        this.props.firebase.getAccounts().then(snapshots => {
            const accounts = [];
            snapshots.forEach(doc => accounts.push(doc.data()));
            this.setState({ accounts });
        });
    }

    renderItemComponent = item => {
        return <AccountSectionItem key={item.phone} {...item} />;
    };

    renderFormComponent = onCancelEvent => {
        return <AccountForm onCancel={onCancelEvent} />;
    };

    render() {
        return (
            <AppView title="Accounts">
                <PageSection
                    data={this.state.accounts}
                    renderItemComponent={this.renderItemComponent}
                    renderFormComponent={this.renderFormComponent}
                ></PageSection>
            </AppView>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Accounts);
