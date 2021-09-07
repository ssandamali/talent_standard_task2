import React from "react";
import { SingleInput } from "../Form/SingleInput.jsx";
import { visaStatusOptions } from "../Employer/common.js";

export default class VisaStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visaStatus: props.visaStatus ? props.visaStatus : "",
      visaExpiryDate: props.visaExpiryDate ? props.visaExpiryDate : "",
      showExpiryDate: false,
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleStatusChange(event) {
    event.target.value === "Work Visa" || event.target.value === "Student Visa"
      ? this.setState({
          [event.target.name]: event.target.value,
          showExpiryDate: true,
        })
      : this.setState(
          {
            [event.target.name]: event.target.value,
            showExpiryDate: false,
          },
          this.props.saveProfileData({
            visaStatus: event.target.value,
            visaExpiryDate: "",
          })
        );
  }

  handleDateChange(event) {
    console.log(this.state);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSave() {
    let data = {
      visaStatus: this.state.visaStatus,
      visaExpiryDate: this.state.visaExpiryDate,
    };
    this.props.saveProfileData(data);
  }

  render() {
    const visaStatusOption = visaStatusOptions.map((x) => (
      <option key={x} value={x}>
        {x}
      </option>
    ));
    const showExpiryDate =
      this.state.showExpiryDate ||
      this.props.visaStatus === "Work Visa" ||
      this.props.visaStatus === "Student Visa"
        ? true
        : false;
    const visaExpiryDate = this.state.visaExpiryDate
      ? this.state.visaExpiryDate
      : this.props.visaExpiryDate
      ? this.props.visaExpiryDate.split("T")[0]
      : "";

    const visaStatus = this.state.visaStatus
      ? this.state.visaStatus
      : this.props.visaStatus;
    return (
      <React.Fragment>
        <div className="row">
          <span className="ui six wide column">
            <h5>Visa Status</h5>
          </span>
          {showExpiryDate ? (
            <span className="ui ten wide column">
              <h5>Visa Expiry Date</h5>
            </span>
          ) : null}
        </div>
        <div className="row">
          <span className="ui six wide column">
            <select
              className="ui right labeled dropdown"
              placeholder="Visa Status"
              value={visaStatus}
              onChange={this.handleStatusChange}
              name="visaStatus"
            >
              <option value="">Select your Visa Status</option>
              {visaStatusOption}
            </select>
          </span>
          {showExpiryDate ? (
            <React.Fragment>
              <span className="ui six wide column">
                <input
                  type="date"
                  name="visaExpiryDate"
                  value={visaExpiryDate}
                  onChange={this.handleDateChange}
                />
              </span>
              <span className="ui four wide column">
                <button
                  type="button"
                  className="ui black left floated button"
                  onClick={this.onSave}
                >
                  Save
                </button>
              </span>
            </React.Fragment>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
