import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import {
  Popup,
  Button,
  Icon,
  Grid,
  GridColumn,
  Image,
} from "semantic-ui-react";

export default class TalentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfileSelected: false,
    };
    this.placeholderImg = "../../../../images/User.png";
    this.handleProfile = this.handleProfile.bind(this);
    this.loadPlaceholderImg = this.loadPlaceholderImg.bind(this);
  }

  handleProfile() {
    this.setState({ isProfileSelected: !this.state.isProfileSelected });
  }
  loadPlaceholderImg(id, e) {
    document.getElementById(id).src = this.placeholderImg;
  }

  render() {
    let talent = this.props.data;
    let url = this.placeholderImg;

    return (
      <div className="ui  raised link job card ">
        <div className="content">
          <div className="left floated">
            <h4>{talent.name}</h4>
          </div>
          <div className="right floated">
            <Icon name="star" size="large" />
          </div>
        </div>
        <div className="content video-player" style={{ padding: 0 }}>
          {this.state.isProfileSelected ? (
            <Grid>
              <GridColumn key={1} width={8}>
                <img
                  id={talent.id}
                  src={talent.photoId ? talent.photoId : url}
                  onError={this.loadPlaceholderImg.bind(this, talent.id)}
                  // onerror="this.src='../../../../images/User.png';"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </GridColumn>
              <GridColumn key={2} width={8}>
                <div className="content">
                  <div className="left aligned header">
                    <h4>Talent Snapshot</h4>
                  </div>
                  <div className="left aligned">
                    <p>
                      CURRENT EMPLOYER
                      <br />
                      {talent.currentEmployment}
                    </p>

                    <p>
                      VISA STATUS <br />
                      {talent.visa}
                    </p>

                    <p>
                      POSITION <br />
                      {talent.summary}
                    </p>
                  </div>
                </div>
              </GridColumn>
            </Grid>
          ) : (
            <ReactPlayer
              width="100%"
              height="100%"
              controls
              url="https://www.youtube.com/watch?v=7sDY4m8KNL"
            />
          )}
        </div>
        <div className="center aligned extra content">
          <Grid>
            <GridColumn key={1} width={4}>
              <Icon
                name={this.state.isProfileSelected ? "video" : "user"}
                onClick={this.handleProfile}
              />
            </GridColumn>
            <GridColumn key={2} width={4}>
              <Icon name="file pdf outline" />
            </GridColumn>
            <GridColumn key={3} width={4}>
              <Icon name="linkedin" />
            </GridColumn>
            <GridColumn key={4} width={4}>
              <Icon name="github" />
            </GridColumn>
          </Grid>
        </div>
        <div className="extra content">
          <div className="left aligned">
            {talent.skills.map((item) => (
              <Button key={item} basic compact={true} color="blue" size="mini">
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
