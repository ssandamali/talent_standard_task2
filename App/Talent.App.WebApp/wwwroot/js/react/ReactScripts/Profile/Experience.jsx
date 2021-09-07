/* Experience section */
import React from "react";
import Cookies from "js-cookie";
import { Grid, Table, Icon } from "semantic-ui-react";
import { times } from "lodash";
import { ChildSingleInput } from "../Form/SingleInput.jsx";

export default class Experience extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.experienceData
      ? Object.assign([], this.props.experienceData)
      : [];
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    // const todayString =
    //   (today.getMonth() > 8
    //     ? today.getMonth() + 1
    //     : "0" + (today.getMonth() + 1))
    //   (today.getDate() > 9 ? today.getDate() : "0" + today.getDate()) +
    //   "/" +
    //   today.getFullYear();
    this.state = {
      newexperienceData: data,
      company: "",
      position: "",
      responsibilities: "",
      start: todayString,
      end: todayString,
      selectedId: "123",
      editedCompany: "",
      editedPosition: "",
      editedResponsibilities: "",
      editedStart: "",
      editedEnd: "",
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
    const newExperience = {
      id: Date.now().toString(),
      company: this.state.company,
      position: this.state.position,
      responsibilities: this.state.responsibilities,
      start: this.state.start,
      end: this.state.end,
    };
    const newExperienceData = this.props.experienceData;
    newExperienceData.push(newExperience);
    const data = {
      experience: newExperienceData,
    };
    this.props.updateProfileData(data);
    this.onCancel();
  }

  onCancel() {
    this.setState({
      company: "",
      position: "",
      responsibilities: "",
      start: new Date().toISOString().split("T")[0],
      end: new Date().toISOString().split("T")[0],
      showAddSection: false,
    });
  }

  onEdit(item, e) {
    this.setState({
      selectedId: item.id,
      editedCompany: item.company,
      editedPosition: item.position,
      editedResponsibilities: item.responsibilities,
      editedStart: item.start,
      editedEnd: item.end,
    });
  }

  onDelete(item, e) {
    const newExperienceData = this.props.experienceData;
    newExperienceData.pop(item);
    const data = {
      experience: newExperienceData,
    };
    this.props.updateProfileData(data);
  }

  handleChangeTableData(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSaveTableData() {
    let experienceData = this.props.experienceData;
    let objIndex = experienceData.findIndex(
      (obj) => obj.id === this.state.selectedId
    );
    experienceData[objIndex].company = this.state.editedCompany;
    experienceData[objIndex].position = this.state.editedPosition;
    experienceData[objIndex].responsibilities =
      this.state.editedResponsibilities;
    experienceData[objIndex].start = this.state.editedStart;
    experienceData[objIndex].end = this.state.editedEnd;

    const data = {
      experience: experienceData,
    };
    this.props.updateProfileData(data);
    this.onTableEditCancel();
  }
  onTableEditCancel() {
    this.setState({
      selectedId: "",
      editedCompany: "",
      editedPosition: "",
      editedResponsibilities: "",
      editedStart: "",
      editedEnd: "",
    });
  }

  render() {
    const newExperienceData = this.props.experienceData;

    return (
      <React.Fragment>
        {this.state.showAddSection ? (
          <React.Fragment>
            <div className="row">
              <span className="ui eight wide column">
                <h5>Company</h5>
                <ChildSingleInput
                  inputType="text"
                  name="company"
                  value={this.state.company}
                  controlFunc={this.handleChange}
                  maxLength={100}
                  placeholder="Enter the company name"
                  errorMessage=""
                />
              </span>
              <span className="ui eight wide column">
                <h5>Position</h5>
                <ChildSingleInput
                  inputType="text"
                  name="position"
                  value={this.state.position}
                  controlFunc={this.handleChange}
                  maxLength={100}
                  placeholder="Enter the Position"
                  errorMessage=""
                />
              </span>
            </div>
            <div className="row">
              <span className="ui eight wide column">
                <h5>Start Date</h5>
                <input
                  type="date"
                  name="start"
                  value={this.state.start.split("T")[0]}
                  onChange={this.handleChange}
                />
              </span>
              <span className="ui eight wide column">
                <h5>End Date</h5>
                <input
                  type="date"
                  name="end"
                  value={this.state.end.split("T")[0]}
                  onChange={this.handleChange}
                />
              </span>
            </div>
            <div className="row">
              <span className="ui sixteen wide column">
                <h5>Responsibilities</h5>
                <ChildSingleInput
                  inputType="text"
                  name="responsibilities"
                  value={this.state.responsibilities}
                  controlFunc={this.handleChange}
                  maxLength={100}
                  placeholder="Responsibilities"
                  errorMessage=""
                />
              </span>
            </div>
            <div className="row">
              <span className="ui sixteen wide column">
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
          </React.Fragment>
        ) : null}
        <div className="row">
          <Table compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Company</Table.HeaderCell>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                <Table.HeaderCell>Start</Table.HeaderCell>
                <Table.HeaderCell>End</Table.HeaderCell>
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
              {newExperienceData.map((item) => (
                <Table.Row key={item.id}>
                  {item.id === this.state.selectedId ? (
                    <Table.Cell colSpan="6">
                      <Grid>
                        <Grid.Row columns={2}>
                          <Grid.Column>
                            <h5>Company</h5>
                            <ChildSingleInput
                              inputType="text"
                              name="editedCompany"
                              value={this.state.editedCompany}
                              controlFunc={this.handleChangeTableData}
                              maxLength={100}
                              placeholder="Enter the company name"
                              errorMessage=""
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <h5>Position</h5>
                            <ChildSingleInput
                              inputType="text"
                              name="editedPosition"
                              value={this.state.editedPosition}
                              controlFunc={this.handleChangeTableData}
                              maxLength={100}
                              placeholder="Enter the company name"
                              errorMessage=""
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                          <Grid.Column>
                            <h5>Start Date</h5>
                            <input
                              type="date"
                              name="editedStart"
                              value={this.state.editedStart.split("T")[0]}
                              onChange={this.handleChangeTableData}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <h5>End Date</h5>
                            <input
                              type="date"
                              name="editedEnd"
                              value={this.state.editedEnd.split("T")[0]}
                              onChange={this.handleChangeTableData}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                          <Grid.Column>
                            <h5>Responsibilities</h5>
                            <ChildSingleInput
                              inputType="text"
                              name="editedResponsibilities"
                              value={this.state.editedResponsibilities}
                              controlFunc={this.handleChangeTableData}
                              maxLength={100}
                              placeholder="Enter the company name"
                              errorMessage=""
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                          <Grid.Column>
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
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Table.Cell>
                  ) : (
                    <React.Fragment>
                      <Table.Cell>{item.company}</Table.Cell>
                      <Table.Cell>{item.position}</Table.Cell>

                      <Table.Cell>{item.responsibilities}</Table.Cell>
                      <Table.Cell>{formatDateString(item.start)}</Table.Cell>
                      <Table.Cell>{formatDateString(item.end)}</Table.Cell>
                      <Table.Cell textAlign="right">
                        <Icon
                          name="pencil"
                          onClick={this.onEdit.bind(this, item)}
                        />
                        <Icon
                          name="close"
                          onClick={this.onDelete.bind(this, item)}
                        />
                      </Table.Cell>
                    </React.Fragment>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

const formatDateString = (date) => {
  let event = new Date(date);
  let Str = event.toString().split(" ");
  let formatedStr = Str[2] + "th " + Str[1] + ", " + Str[3];
  return formatedStr;
};

const formatDate = (dateStr) => {
  let date = new Date(dateStr);
  let fmt = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return fmt.format(date);
};
