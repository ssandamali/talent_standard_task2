import React from "react";
import { Loader, Icon } from "semantic-ui-react";

export default class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.placeholder = "../../../../images/no-image1.png";
  }

  render() {
    let companyContact = this.props.employer.companyContact;
    console.log(companyContact);
    return (
      <div className="ui card">
        <div className="content">
          <div className="center aligned header">
            <img
              src={this.placeholder}
              style={{
                height: 56,
                width: 56,
                borderRadius: 55,
                borderColor: "white",
                borderStyle: "solid",
                borderWidth: 1,
                alignContent: "right",
                verticalAlign: "top",
              }}
            />
          </div>
          <div className="center aligned header">{companyContact.name}</div>
          <div className="center aligned">
            <p>
              <Icon name="point" />: {companyContact.location.city},
              {companyContact.location.country}
            </p>
          </div>
          <div className="center aligned description">
            <br />
            <p>We currently do not have specific skills that we desire</p>
          </div>
        </div>
        <div className="extra content">
          <div className="left aligned">
            <p>
              <Icon name="call" />: {companyContact.phone}
            </p>
            <p>
              <Icon name="mail" />: {companyContact.email}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
