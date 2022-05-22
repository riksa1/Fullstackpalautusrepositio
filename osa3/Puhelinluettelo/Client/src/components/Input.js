import React from "react";

const Input = ({ name, newValue, handleValueChange }) => {
  return (
    <div>
      {name}: <input value={newValue} onChange={handleValueChange} />
    </div>
  );
};

export default Input;
