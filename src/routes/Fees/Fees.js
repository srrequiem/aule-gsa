import React, { Component } from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";
import PageSection from "../../components/PageSection/PageSection";

class Fees extends Component {
    state = { 
        fees: [
            { amount: 25, concurrency: 25, reminders: [], reminderConcurrency: 30 },
        ] 
    };

    render() {
        return (
            <AppView title="Fees">
                <PageSection
                    data={this.state.fees}
                    renderItemComponent={this.renderItemComponent}
                    renderFormComponent={this.renderFormComponent}
                ></PageSection>
            </AppView>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Fees);
