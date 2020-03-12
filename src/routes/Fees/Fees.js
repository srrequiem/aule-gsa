import React, { Component } from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";
import PageSection from "../../components/PageSection/PageSection";
import FeeForm from "../../components/Fees/FeeForm";
import FeeSectionItem from "../../components/Fees/FeeSectionItem";

class Fees extends Component {
    state = {
        showForm: false,
        fees: []
    };

    componentDidMount() {
        this.props.firebase.getFees().then(snapshots => {
            const fees = [];
            snapshots.forEach(doc => fees.push({ id: doc.id, ...doc.data() }));
            this.setState({ fees });
        });
    }

    onCreate = () => {
        this.setState({ showForm: true });
    };

    onCancel = () => {
        this.setState({ showForm: false });
    };

    render() {
        const { showForm, fees } = this.state;
        return (
            <AppView title="Fees">
                <PageSection onCreate={this.onCreate}>
                    {showForm && <FeeForm onCancel={this.onCancel} />}
                    {fees.map(fee => (
                        <FeeSectionItem
                            key={fee.id}
                            name={fee.name}
                            amount={fee.amount}
                            concurrency={fee.concurrency}
                            triggerDate={fee.triggerDate.toDate()}
                            reminder={{
                                concurrency: fee.reminderConcurrency,
                                options: fee.reminders
                            }}
                        />
                    ))}
                </PageSection>
            </AppView>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Fees);
