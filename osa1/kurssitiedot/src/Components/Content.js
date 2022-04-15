import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export default Content;
