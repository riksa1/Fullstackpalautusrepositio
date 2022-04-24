import React from "react";
import Part from "./Part";

const Content = ({ parts, courseid }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </div>
  );
};

export default Content;
