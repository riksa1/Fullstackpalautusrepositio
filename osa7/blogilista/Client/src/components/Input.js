import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const Input = ({ newValue, handleValueChange, placeHolder, id }) => {
  return (
    <div>
      <TextField
        value={newValue}
        onChange={handleValueChange}
        label={placeHolder}
        variant="outlined"
        id={id}
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  newValue: PropTypes.string.isRequired,
  handleValueChange: PropTypes.func.isRequired,
};

export default Input;
