import React from "react";
import { Grid, Radio, Form, Checkbox } from "semantic-ui-react";
import { SingleInput } from "../Form/SingleInput.jsx";

export default class TalentStatus extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, { value }) {
    this.props.saveProfileData({
      jobSeekingStatus: { status: value, availableDate: null },
    });
  }

  render() {
    console.log(this.props.status);
    return (
      <React.Fragment>
        <Grid columns={1}>
          <Grid.Row>
            <Grid.Column>
              <h4>Current Status</h4>
              <Radio
                name="jobSeekingStatus"
                label="Actively looking for a job"
                value="Actively looking for a job"
                checked={
                  this.props.status.status === "Actively looking for a job"
                }
                onChange={this.handleChange}
              />
              <br />
              <Radio
                name="jobSeekingStatus"
                label="Not looking for a job at the moment"
                value="Not looking for a job at the moment"
                checked={
                  this.props.status.status ===
                  "Not looking for a job at the moment"
                }
                onChange={this.handleChange}
              />
              <br />
              <Radio
                name="jobSeekingStatus"
                label="Currently employeed but open to offers"
                value="Currently employeed but open to offers"
                checked={
                  this.props.status.status ===
                  "Currently employeed but open to offers"
                }
                onChange={this.handleChange}
              />
              <br />
              <Radio
                name="jobSeekingStatus"
                label="Will be available on late date"
                value="Will be available on late date"
                checked={
                  this.props.status.status === "Will be available on late date"
                }
                onClick={this.handleChange}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}
