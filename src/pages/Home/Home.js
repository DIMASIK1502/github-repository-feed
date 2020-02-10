import React, { Component } from "react";
import { connect } from "react-redux";
import { getRepositores } from "../../redux/actions/repositories";
import RepoList from "../../components/RepoList/RepoList";
import SearchBox from "../../components/SearchBox/SearchBox";

import "antd/es/pagination/style/css";

class Home extends Component {
  componentDidMount() {
    this.props.getRepositores();
  }
  render() {
    return (
      <div className="home-page">
        <div className="container pt-4 pb-4">
          <SearchBox />
          <RepoList />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { getRepositores })(Home);
