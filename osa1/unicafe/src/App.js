import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>
      {props.value}
      {props.endtext}
    </td>
  </tr>
);

const Statistics = (props) => {
  return (
    <>
      {props.good > 0 || props.neutral > 0 || props.bad > 0 ? (
        <>
          <table>
            <tbody>
              <StatisticLine text="good" value={props.good} endtext="" />
              <StatisticLine text="neutral" value={props.neutral} endtext="" />
              <StatisticLine text="bad" value={props.bad} endtext="" />
              <StatisticLine
                text="all"
                value={props.good + props.neutral + props.bad}
                endtext=""
              />
              <StatisticLine
                text="average"
                value={
                  (props.good - props.bad) /
                    (props.good + props.neutral + props.bad) || 0
                }
                endtext=""
              />
              <StatisticLine
                text="positive"
                value={
                  (props.good * 100) /
                    (props.good + props.neutral + props.bad) || 0
                }
                endtext="%"
              />
            </tbody>
          </table>
        </>
      ) : (
        <>
          <p>No feedback given</p>
        </>
      )}
    </>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
