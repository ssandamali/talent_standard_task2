/* Skill section */
import React from "react";
import Cookies from "js-cookie";
import { Table, Icon } from "semantic-ui-react";
import { times } from "lodash";
import { skillLevelOptions } from "../Employer/common.js";
import { ChildSingleInput } from "../Form/SingleInput.jsx";

export default class Skill extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.skillData
      ? Object.assign([], this.props.skillData)
      : [];
    this.state = {
      newSkillData: data,
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
    const newSkill = {
      id: Date.now().toString(),
      name: this.state.name,
      level: this.state.level,
    };
    const newSkillLata = this.props.skillData;
    newSkillLata.push(newSkill);
    const data = {
      skills: newSkillLata,
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
    const newSkillData = this.props.skillData;
    newSkillData.pop(item);
    const data = {
      skills: newSkillData,
    };
    this.props.updateProfileData(data);
  }

  handleChangeTableData(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSaveTableData() {
    let skillData = this.props.skillData;
    let objIndex = skillData.findIndex(
      (obj) => obj.id === this.state.selectedId
    );
    skillData[objIndex].name = this.state.nameTableData;
    skillData[objIndex].level = this.state.levelTableData;

    const data = {
      skills: skillData,
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
    const newSkillData = this.props.skillData;
    const skillLevelOption = skillLevelOptions.map((x) => (
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
                placeholder="Add Skill"
                errorMessage="Please enter a valid skill"
              />
            </span>
            <span className="ui five wide column">
              <select
                className="ui right labeled dropdown"
                placeholder="Skill Level"
                value={this.state.level}
                onChange={this.handleChange}
                name="level"
              >
                <option value="">Skill Level</option>
                {skillLevelOption}
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
                <Table.HeaderCell>Skill</Table.HeaderCell>
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
              {newSkillData.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>
                    {item.id === this.state.selectedId ? (
                      <ChildSingleInput
                        inputType="text"
                        name="nameTableData"
                        value={this.state.nameTableData}
                        controlFunc={this.handleChangeTableData}
                        maxLength={50}
                        placeholder="Add Skill"
                        errorMessage="Please enter a valid Skill"
                      />
                    ) : (
                      item.name
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {item.id === this.state.selectedId ? (
                      <select
                        className="ui right labeled dropdown"
                        placeholder="Skill Level"
                        value={this.state.levelTableData}
                        onChange={this.handleChangeTableData}
                        name="levelTableData"
                      >
                        {skillLevelOption}
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
