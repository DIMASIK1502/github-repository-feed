import React, { Component } from "react";
import { connect } from "react-redux";
import { setSearchInput } from "../../redux/actions/common";
import { getRepositores } from "../../redux/actions/repositories";
import { List, Spin, Icon, Avatar } from "antd";

import "antd/es/icon/style/css";
import "antd/es/spin/style/css";
import "antd/es/list/style/css";
import "antd/es/avatar/style/css";

class RepoList extends Component {
  renderIconText = (text, type, color = "rgba(0, 0, 0, 0.45)") => (
    <span className="d-flex align-items-center">
      <Icon className="mr-2" style={{ color: color }} type={type} />
      {text}
    </span>
  );
  renderOwner = owner => {
    return (
      <a className="d-flex align-items-center" href={owner.html_url}>
        <span className="d-block mr-2">Owner</span>
        <Avatar
          src={owner.avatar_url}
          shape="square"
          size="small"
          icon="user"
        />
      </a>
    );
  };

  renderItem = item => {
    const { full_name, html_url, description, stargazers_count, forks } = item;
    return (
      <List.Item
        actions={[
          this.renderIconText(stargazers_count, "star-o", "#fadb14"),
          this.renderIconText(forks, "fork"),
          this.renderOwner(item.owner)
        ]}
        key={full_name}
      >
        <List.Item.Meta
          title={<a href={html_url}>{full_name}</a>}
          description={description}
        />
      </List.Item>
    );
  };
  onPaginateChage = async value => {
    const { getRepositores, pageSize, search, licenseType } = this.props;
    await getRepositores(value, pageSize, search, licenseType);
  };
  render() {
    const { repoList, total, pageSize, loading, page } = this.props;
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          current: page,
          onChange: this.onPaginateChage,
          total: total < 1000 ? total : 1000,
          pageSize: pageSize
        }}
        loading={loading}
        loadingindicator={<Spin />}
        dataSource={repoList}
        renderItem={item => this.renderItem(item)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    total: state.repositories.total,
    repoList: state.repositories.results,
    pageSize: state.repositories.pageSize,
    loading: state.common.loading,
    page: state.repositories.page,
    licenseType: state.common.licenseType
  };
}
export default connect(mapStateToProps, {
  setSearchInput,
  getRepositores
})(RepoList);
