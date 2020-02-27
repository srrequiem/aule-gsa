import React, { Component } from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";
import PageSection from "../../components/PageSection/PageSection";
import GroupServicesSectionItem from "../../components/GroupServices/GroupServicesSectionItem";
import AccountForm from "../../components/Accounts/AccountForm";

class GroupServices extends Component {
    state = {
        groups: [{ name: "Spotify", accounts: [] }]
    };

    componentDidMount() {}

    renderItemComponent = item => {
        return <GroupServicesSectionItem key={item.name} {...item} />;
    };

    renderFormComponent = onCancelEvent => {
        return <AccountForm onCancel={onCancelEvent} />;
    };

    render() {
        return (
            <AppView title="Group Services">
                <PageSection
                    data={this.state.groups}
                    renderItemComponent={this.renderItemComponent}
                ></PageSection>
            </AppView>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(GroupServices);
