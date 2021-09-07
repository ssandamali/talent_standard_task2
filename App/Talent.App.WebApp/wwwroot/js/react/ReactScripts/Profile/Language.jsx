/* Language section */
import React from "react";
import Cookies from "js-cookie";
import { Table, Icon } from "semantic-ui-react";
import { times } from "lodash";
import { languageLevelOptions } from "../Employer/common.js";
import { ChildSingleInput } from "../Form/SingleInput.jsx";

export default class Language extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.languageData
      ? Object.assign([], this.props.languageData)
      : [];
    this.state = {
      newLanguageData: data,
      name: "",
      level: "",
      selectedId: "",
      nameTableData: "",
      levelTableData: "",
      showAddSection: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.addNew = this.addNew.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onTableEditCancel = this.onTableEditCancel.bind(this);
    this.onSaveTableData = this.onSaveTableData.bind(this);
    this.handleChangeTableData = this.handleChangeTableData.bind(this);
  }

  addNew() {
    this.setState({
      showAddSection: true,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSave() {
    const newLanguage = {
      id: Date.now().toString(),
      name: this.state.name,
      level: this.state.level,
    };
    const newLanguageData = this.props.languageData;
    newLanguageData.push(newLanguage);
    const data = {
      languages: newLanguageData,
    };
    this.props.updateProfileData(data);
    this.onCancel();
  }

  onCancel() {
    this.setState({
      name: "",
      level: "",
      showAddSection: false,
    });
  }

  onEdit(item, e) {
    this.setState({
      selectedId: item.id,
      nameTableData: item.name,
      levelTableData: item.level,
    });
  }

  onDelete(item, e) {
    const newLanguageData = this.props.languageData;
    newLanguageData.pop(item);
    const data = {
      languages: newLanguageData,
    };
    this.props.updateProfileData(data);
  }

  handleChangeTableData(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSaveTableData() {
    let languageData = this.props.languageData;
    let objIndex = languageData.findIndex(
      (obj) => obj.id === this.state.selectedId
    );
    languageData[objIndex].name = this.state.nameTableData;
    languageData[objIndex].level = this.state.levelTableData;

    const data = {
      languages: languageData,
    };
    this.props.updateProfileData(data);
    this.onTableEditCancel();
  }
  onTableEditCancel() {
    this.setState({
      selectedId: "",
      nameTableData: "",
      levelTableData: "",
    });
  }

  render() {
    const newLanguageData = this.props.languageData;
    const languageLevelOption = languageLevelOptions.map((x) => (
      <option key={x} value={x}>
        {x}
      </option>
    ));
    return (
      <React.Fragment>
        {this.state.showAddSection ? (
          <div className="row">
            <span className="ui five wide column">
              <ChildSingleInput
                inputType="text"
                name="name"
                value={this.state.name}
                controlFunc={this.handleChange}
                maxLength={50}
                placeholder="Add Language"
                errorMessage="Please enter a valid language"
              />
            </span>
            <span className="ui five wide column">
              <select
                className="ui right labeled dropdown"
                placeholder="Language Level"
                value={this.state.level}
                onChange={this.handleChange}
                name="level"
              >
                <option value="">Language Level</option>
                {languageLevelOption}
              </select>
            </span>
            <span className="ui four wide column">
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
            </span>
          </div>
        ) : null}
        <div className="row">
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Language</Table.HeaderCell>
                <Table.HeaderCell>Level</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  <button
                    type="button"
                    className="ui black right floated button"
                    onClick={this.addNew}
                  >
                    <Icon name="plus"></Icon>Add New
                  </button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {newLanguageData.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>
                    {item.id === this.state.selectedId ? (
                      <ChildSingleInput
                        inputType="text"
                        name="nameTableData"
                        value={this.state.nameTableData}
                        controlFunc={this.handleChangeTableData}
                        maxLength={50}
                        placeholder="Add Language"
                        errorMessage="Please enter a valid language"
                      />
                    ) : (
                      item.name
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {item.id === this.state.selectedId ? (
                      <select
                        className="ui right labeled dropdown"
                        placeholder="Language Level"
                        value={this.state.levelTableData}
                        onChange={this.handleChangeTableData}
                        name="levelTableData"
                      >
                        {languageLevelOption}
                      </select>
                    ) : (
                      item.level
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {item.id === this.state.selectedId ? (
                      <React.Fragment>
                        <button
                          type="button"
                          className="ui basic blue left floated button"
                          onClick={this.onSaveTableData}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="ui basic red left floated button"
                          onClick={this.onTableEditCancel}
                        >
                          Cancel
                        </button>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Icon
                          name="pencil"
                          onClick={this.onEdit.bind(this, item)}
                        />
                        <Icon
                          name="close"
                          onClick={this.onDelete.bind(this, item)}
                        />
                      </React.Fragment>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}
