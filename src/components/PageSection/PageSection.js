import React, { Component } from "react";
import { Paper, Button } from "@material-ui/core";

class PageSection extends Component {
    state = { showForm: false };

    onCancelEvent = () => {
        this.setState({ showForm: false });
    };

    render() {
        return (
            <Paper>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.setState({ showForm: true })}
                >
                    Add
                </Button>
                {this.state.showForm
                    ? this.props.renderFormComponent(this.onCancelEvent)
                    : null}
                {this.props.data.map(item =>
                    this.props.renderItemComponent(item)
                )}
            </Paper>
        );
    }
}

export default PageSection;
