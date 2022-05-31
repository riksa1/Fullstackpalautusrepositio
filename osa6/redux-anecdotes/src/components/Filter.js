import React from "react";
import { connect } from "react-redux";
import { changeSearch } from "../reducers/searchReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    props.changeSearch(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={props.search} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

const mapDispatchToProps = {
  changeSearch,
};

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default ConnectedFilter;
