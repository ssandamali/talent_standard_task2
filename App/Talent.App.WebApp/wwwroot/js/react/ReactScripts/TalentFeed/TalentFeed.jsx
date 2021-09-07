import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import TalentCard from "../TalentFeed/TalentCard.jsx";
import { Loader } from "semantic-ui-react";
import CompanyProfile from "../TalentFeed/CompanyProfile.jsx";
import FollowingSuggestion from "../TalentFeed/FollowingSuggestion.jsx";
import { BodyWrapper, loaderData } from "../Layout/BodyWrapper.jsx";

export default class TalentFeed extends React.Component {
  constructor(props) {
    super(props);

    let loader = loaderData;
    loader.allowedUsers.push("Employer");
    loader.allowedUsers.push("Recruiter");

    this.state = {
      loadNumber: 5,
      loadPosition: 0,
      feedData: [],
      watchlist: [],
      loaderData: loader,
      loadingFeedData: false,
      companyDetails: null,
    };

    this.init = this.init.bind(this);
    this.loadTalentData = this.loadTalentData.bind(this);
    this.loadCompanyData = this.loadCompanyData.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  init() {
    let loaderData = TalentUtil.deepCopy(this.state.loaderData);
    loaderData.isLoading = false;
    this.loadCompanyData(() => this.setState({ loaderData }));
  }

  loadCompanyData(callback) {
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url: "http://localhost:60290/profile/profile/GetEmployerProfile",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      success: function (res) {
        console.log(res);
        this.setState(
          { companyDetails: res.employer },
          this.loadTalentData(callback)
        );
      }.bind(this),
      error: function (res, a, b) {
        //this.init();

        console.log(res);
        console.log(a);
        console.log(b);
      }.bind(this),
    });
  }

  loadTalentData(callback) {
    console.log(this.state);
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url: "http://localhost:60290/profile/profile/GetTalent",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "GET",
      data: {
        position: this.state.loadPosition,
        number: this.state.loadNumber,
      },
      contentType: "application/json",
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.success == true) {
          this.setState(
            (state) => ({
              feedData: res.talentList,
              loadPosition: state.loadPosition + state.loadNumber,
            }),
            callback
          );
        } else {
          TalentUtil.notification.show(
            "Error occured when loading Talent",
            "error",
            null,
            null
          );
          callback;
        }
      }.bind(this),
      error: function (res, a, b) {
        //this.init();

        console.log(res);
        console.log(a);
        console.log(b);
      }.bind(this),
    });
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.init();
  }

  handleScroll() {
    const win = $(window);

    if (
      $(document).height() - win.height() == Math.round(win.scrollTop()) ||
      $(document).height() - win.height() - Math.round(win.scrollTop()) == 1
    ) {
      $("#load-more-loading").show();
      let loaderData = TalentUtil.deepCopy(this.state.loaderData);
      loaderData.isLoading = false;
      this.loadTalentData(() => this.setState({ loaderData }));
    }
  }

  render() {
    let talentFeed = this.state.feedData;

    return (
      <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
        <div className="ui grid talent-feed container">
          <div className="four wide column">
            <CompanyProfile employer={this.state.companyDetails} />
          </div>
          <div className="eight wide column">
            {talentFeed.length !== 0 ? (
              talentFeed.map((talent) => (
                <TalentCard key={talent.id} data={talent} />
              ))
            ) : (
              <p>No available talents matched with the employer</p>
            )}
            <p id="load-more-loading">
              <img src="/images/rolling.gif" alt="Loading…" />
            </p>
          </div>
          <div className="four wide column">
            <div className="ui card">
              <FollowingSuggestion />
            </div>
          </div>
        </div>
      </BodyWrapper>
    );
  }
}
