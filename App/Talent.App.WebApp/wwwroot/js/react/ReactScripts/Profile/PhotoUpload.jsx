/* Photo upload section */
import React, { Component } from "react";
import { Button, Image, Icon } from "semantic-ui-react";
import Cookies from "js-cookie";

export default class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    let placeHolderImg = "../../../../icons/camera.png";
    this.state = {
      src: placeHolderImg,
      selectedFile: null,
      selectedFileName: "",
      imageSrc: "",
      imageId: "",
      showUpload: false,
    };

    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.handleUplaod = this.handleUpload.bind(this);
    this.maxFileSize = 2097152;
    this.acceptedFileType = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    this.placeHolderImg = placeHolderImg;
  }

  handleChangeImage() {
    document.getElementById("imgupload").click();
  }

  fileSelectedHandler(event) {
    let localSelectedFile = this.state.selectedFile;
    let localSelectedFileName = this.state.selectedFileName;
    let localImageSrc = this.state.imageSrc;
    let localImageId = this.state.imageId;

    if (
      event.target.files[0].size > this.maxFileSize ||
      this.acceptedFileType.indexOf(event.target.files[0].type) == -1
    ) {
      TalentUtil.notification.show(
        "Max file size is 2 MB and supported file types are *.jpg, *.jpeg, *.png, *.gif",
        "error",
        null,
        null
      );
    } else {
      localSelectedFile = event.target.files[0];
      localSelectedFileName = event.target.files[0].name;
      localImageSrc = window.URL.createObjectURL(event.target.files[0]);
    }

    this.setState({
      selectedFile: localSelectedFile,
      selectedFileName: localSelectedFileName,
      imageSrc: localImageSrc,
      src: localImageSrc,
      showUpload: true,
    });
  }

  handleUpload() {
    let data = new FormData();
    data.append("file", this.state.selectedFile);
    var cookies = Cookies.get("talentAuthToken");

    $.ajax({
      url: this.props.savePhotoUrl,
      headers: {
        Authorization: "Bearer " + cookies,
      },
      type: "POST",
      data: data,
      cache: false,
      processData: false,
      contentType: false,
      success: function (res) {
        if (res.success) {
          const data = {
            profilePhoto: this.state.localSelectedFileName,
            profilePhotoUrl: this.state.localImageSrc,
          };
          TalentUtil.notification.show(
            "Profile photo updated sucessfully",
            "success",
            null,
            null
          );
          this.setState(
            {
              showUpload: false,
            },
            this.props.updateProfileData(data)
          );
        } else {
          TalentUtil.notification.show(res.message, "error", null, null);
        }
      }.bind(this),
      error: function (res, status, error) {
        //Display error
        TalentUtil.notification.show(
          "There is an error when updating Images - " + error,
          "error",
          null,
          null
        );
      },
    });
  }

  render() {
    let imgSrc = this.state.showUpload ? this.state.src : this.props.imageId;
    return (
      <React.Fragment>
        <div className="row">
          <span className="ui sixteen wide column">
            <img
              src={imgSrc ? imgSrc : this.state.src}
              style={{
                height: 112,
                width: 112,
                borderRadius: 55,
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 1,
                alignContent: "right",
                verticalAlign: "top",
              }}
              onClick={this.handleChangeImage}
            />
          </span>
        </div>
        {this.state.showUpload ? (
          <div className="row">
            <span className="ui sixteen wide column">
              <br />
              <button
                type="button"
                className="ui black left floated button"
                onClick={this.handleUplaod}
              >
                <Icon name="upload" />
                Upload
              </button>
            </span>
          </div>
        ) : null}
        <input
          type="file"
          id="imgupload"
          style={{ display: "none" }}
          accept="image/*"
          onChange={this.fileSelectedHandler}
        />
      </React.Fragment>
    );
  }
}
