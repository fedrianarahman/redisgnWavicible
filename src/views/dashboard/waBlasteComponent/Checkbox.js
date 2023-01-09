import React from 'react'

const Checkbox = ({ id, type, name, handleClick, isChecked, data }) => {
  //console.log("line 4",id, type, name, handleClick, isChecked)
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={e => handleClick(e,data)}
      checked={isChecked}
    />
  );
};

export default Checkbox;
