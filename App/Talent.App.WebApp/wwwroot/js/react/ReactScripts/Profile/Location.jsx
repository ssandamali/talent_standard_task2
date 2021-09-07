import React from "react";
import Cookies from "js-cookie";
import { default as Countries } from "../../../../util/jsonFiles/countries.json";
import { ChildSingleInput } from "../Form/SingleInput.jsx";
import react from "react";
import { countries, nationalities } from "../Employer/common.js";

export class Address extends React.Component {
  constructor(props) {
    super(props);
    const addressData = props.addressData
      ? Object.assign({}, props.addressData)
      : {
          city: "",
          country: "",
          number: "",
          postCode: 0,
          street: "",
          suburb: "",
        };

    this.state = {
      showEditSection: false,
      newAddressData: addressData,
    };
    this.renderDisplay = this.renderDisplay.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  onEdit() {
    let data = Object.assign({}, this.props.addressData);
    this.setState({
      newAddressData: data,
      showEditSection: true,
    });
  }

  handleChange(e) {
    let data = Object.assign({}, this.state.newAddressData);
    data[e.target.name] = e.target.value;
    this.setState({
      newAddressData: data,
    });
  }

  closeEdit() {
    this.setState({
      showEditSection: false,
    });
  }

  onSave() {
    const data = {
      address: this.state.newAddressData,
    };
    this.props.saveProfileData(data);
    this.closeEdit();
  }

  onCancel() {
    this.closeEdit();
  }

  render() {
    return this.state.showEditSection
      ? this.renderEdit()
      : this.renderDisplay();
  }

  renderEdit() {
    let number = this.state.newAddressData
      ? this.state.newAddressData.number
      : "";
    let street = this.state.newAddressData
      ? this.state.newAddressData.street
      : "";
    let suburb = this.state.newAddressData
      ? this.state.newAddressData.suburb
      : "";
    let postCode = this.state.newAddressData
      ? this.state.newAddressData.postCode
      : 0;
    let city = this.state.newAddressData ? this.state.newAddressData.city : "";
    let country = this.state.newAddressData
      ? this.state.newAddressData.country
      : "";
    let countriesOptions = Object.keys(countries).map((x) => (
      <option key={x} value={x}>
        {x}
      </option>
    ));
    let popCities = [];
    if (country !== "" && country !== null) {
      popCities = countries[country].map((x) => (
        <option key={x} value={x}>
          {x}
        </option>
      ));
    }
    return (
      <React.Fragment>
        <div className="row">
          <span className="ui eight wide column">
            <h4>Street</h4>
            <ChildSingleInput
              inputType="text"
              name="street"
              value={street}
              controlFunc={this.handleChange}
              maxLength={100}
              placeholder="Enter street name"
              errorMessage="Please enter a valid street name"
            />
          </span>
          <span className="ui four wide column">
            <h4>Suburb</h4>
            <ChildSingleInput
              inputType="text"
              name="suburb"
              value={suburb}
              controlFunc={this.handleChange}
              maxLength={100}
              placeholder="Enter your suburb"
              errorMessage="Please enter your suburb"
            />
          </span>
        </div>
        <div className="row">
          <span className="ui six wide column">
            <h4>Country</h4>
            <select
              className="ui right labeled dropdown"
              placeholder="Country"
              value={country}
              onChange={this.handleChange}
              name="country"
            >
              <option value="">Select a country</option>
              {countriesOptions}
            </select>
          </span>
          <span className="ui six wide column">
            <h4>City</h4>
            <select
              className="ui dropdown"
              placeholder="City"
              value={city}
              onChange={this.handleChange}
              name="city"
            >
              <option value=""> Select a town or city</option>
              {popCities}
            </select>
          </span>
          <span className="ui four wide column">
            <h4>PostCode</h4>
            <ChildSingleInput
              inputType="number"
              name="postCode"
              value={postCode}
              controlFunc={this.handleChange}
              maxLength={4}
              placeholder="Enter your postalcode"
              errorMessage="Please enter a valid postalcode"
            />
          </span>
        </div>
        <div className="row">
          <button
            type="button"
            className="ui black left floated button"
            onClick={this.onSave}
          >
            Save
          </button>
          <button
            type="button"
            className="ui grey left floated button"
            onClick={this.onCancel}
          >
            Cancel
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderDisplay() {
    let number = this.props.addressData ? this.props.addressData.number : "";
    let street = this.props.addressData ? this.props.addressData.street : "";
    let suburb = this.props.addressData ? this.props.addressData.suburb : "";
    let postCode = this.props.addressData
      ? this.props.addressData.postCode
        ? this.props.addressData.postCode
        : ""
      : "";
    let address = [number, street, suburb, postCode];
    let addressStr = "";

    address.map((element) => {
      addressStr =
        addressStr && element
          ? `${addressStr}, ${element}`
          : `${addressStr}${element}`;
    });

    let city = this.props.addressData ? this.props.addressData.city : "";
    let country = this.props.addressData.country
      ? this.props.addressData.country
      : "";

    return (
      <div className="row">
        <div className="ui sixteen wide column">
          <React.Fragment>
            <p>Address: {addressStr}</p>
            <p>City: {city}</p>
            <p>Country: {country}</p>
          </React.Fragment>
          <button
            type="button"
            className="ui right floated teal button"
            onClick={this.onEdit}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
}

export class Nationality extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const data = {
      [event.target.name]: event.target.value,
    };
    this.props.saveProfileData(data);
  }

  render() {
    const nationalityOptions = nationalities.map((item) => (
      <option key={item.NationalityID} value={item.Nationality}>
        {item.Nationality}
      </option>
    ));
    return (
      <div className="row">
        <span className="ui six wide column">
          <select
            className="ui right labeled dropdown"
            placeholder="Select your nationality"
            value={this.props.nationalityData ? this.props.nationalityData : ""}
            onChange={this.handleChange}
            name="nationality"
          >
            <option value="">Select your nationality</option>
            {nationalityOptions}
          </select>
        </span>
      </div>
    );
  }
}
