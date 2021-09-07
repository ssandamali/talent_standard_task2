/* Social media JSX */
import React from "react";
import { ChildSingleInput } from "../Form/SingleInput.jsx";
import { Button, Icon, Popup } from "semantic-ui-react";

export default class SocialMediaLinkedAccount extends React.Component {
  constructor(props) {
    super(props);
    const data = props.linkedAccounts
      ? Object.assign({}, props.linkedAccounts)
      : {
          linkedIn: "",
          github: "",
        };
    this.state = { showEditSection: false, newLinkedAccounts: data };

    this.renderEdit = this.renderEdit.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    $(".ui.button.social-media").popup();
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.newLinkedAccounts);
    data[event.target.name] = event.target.value;
    this.setState({ newLinkedAccounts: data });
  }

  onEdit() {
    const data = Object.assign({}, this.props.linkedAccounts);
    this.setState({
      newLinkedAccounts: data,
      showEditSection: true,
    });
  }

  closeEdit() {
    this.setState({
      showEditSection: false,
    });
  }

  onSave() {
    const data = {
      linkedAccounts: this.state.newLinkedAccounts,
    };
    this.props.saveProfileData(data);
    this.closeEdit();
  }

  onCancel() {
    this.setState(
      {
        newLinkedAccounts: {
          linkedIn: "",
          github: "",
        },
      },
      this.closeEdit()
    );
  }

  render() {
    return this.state.showEditSection
      ? this.renderEdit()
      : this.renderDisplay();
  }

  renderDisplay() {
    return (
      <div className="ui sixteen wide column">
        <Button color="linkedin" floated="left" className="social-media">
          <Icon name="linkedin" /> LinkedIn
        </Button>
        <Button color="black" floated="left" className=" social-media">
          <Icon name="github square" /> GitHub
        </Button>
        <Button color="black" floated="right" onClick={this.onEdit}>
          Edit
        </Button>
      </div>
    );
  }

  renderEdit() {
    const linkedAccounts = this.state.newLinkedAccounts;
    return (
      <div className="ui sixteen wide column">
        <ChildSingleInput
          inputType="text"
          label="LinkedIn"
          name="linkedIn"
          value={linkedAccounts.linkedIn}
          controlFunc={this.handleChange}
          maxLength={150}
          placeholder="Enter your LinkedIn Url"
          errorMessage="Please enter valid Url"
          //isError={this.state.isSummaryError}
        />

        <ChildSingleInput
          inputType="text"
          label="GitHub"
          name="github"
          value={linkedAccounts.github}
          controlFunc={this.handleChange}
          maxLength={150}
          placeholder="Enter your GitHub Url"
          errorMessage="Please enter valid Url"
          //isError={this.state.isSummaryError}
        />
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
    );
  }
}
