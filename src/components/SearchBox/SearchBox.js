import React, { Component } from "react";
import { Input, Select } from "antd";
import { debounce } from "lodash";
import { getRepositores } from "../../redux/actions/repositories";
import { setSearchInput, setLicenseType } from "../../redux/actions/common";
import { getLicenses } from "../../redux/actions/licenses";
import { connect } from "react-redux";
import "antd/es/input/style/css";
import "antd/es/select/style/css";

const { Option } = Select;
const { Search } = Input;
class SearchBox extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      currentLicense: ""
    };
  }
  async componentDidMount() {
    await this.props.getLicenses();
  }
  onSelectChange = value => {
    const { pageSize, search, setLicenseType, getRepositores } = this.props;
    setLicenseType(value);
    getRepositores(1, pageSize, search, value);
  };

  onInputChange = debounce(async e => {
    const {
      getRepositores,
      setSearchInput,
      page,
      pageSize,
      licenseType
    } = this.props;
    this.setState({ loading: true });
    setSearchInput(e.target.value);
    await getRepositores(page, pageSize, e.target.value, licenseType);
    this.setState({ loading: false });
  }, 1000);
  render() {
    const { loading } = this.state;
    const { licenseList } = this.props;
    return (
      <div className="search-box">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <Search
              title="Search"
              placeholder="Search..."
              loading={loading}
              onChange={e => {
                e.persist();
                this.onInputChange(e);
              }}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mt-3 mt-sm-3 mt-md-0 mt-lg-0 mt-xl-0">
            <Select
              title=""
              onChange={this.onSelectChange}
              defaultValue=""
              className="w-100"
            >
              <Option key="any-license" value="">
                Any
              </Option>
              {licenseList.map((item, key) => (
                <Option key={item.key} value={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    page: state.repositories.page,
    pageSize: state.repositories.pageSize,
    licenseList: state.licenses.results,
    licenseType: state.common.licenseType,
    search: state.common.search
  };
}
export default connect(mapStateToProps, {
  getRepositores,
  setSearchInput,
  getLicenses,
  setLicenseType
})(SearchBox);
