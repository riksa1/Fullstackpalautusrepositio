import React, { useState } from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course, courseid }) => {
  let sum = course.parts.reduce(function (prev, current) {
    return prev + current.exercises;
  }, 0);
  return (
    <>
      <Header coursename={course.name}></Header>
      <Content parts={course.parts} courseid={courseid} />
      <Total total={sum} />
    </>
  );
};

export default Course;
