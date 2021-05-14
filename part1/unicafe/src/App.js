import React, { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
  const AllClicks = good + neutral + bad
    if (AllClicks ===0) {
      return (
        <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
        </div>
  )
} 

return (
<div>
  <h1>statistics</h1>
    <table>
    <tbody>
      <Statistic text="Good" value={good} />
      <Statistic text="Neutral" value={neutral} />
      <Statistic text="Bad" value={bad} />
      <Statistic text="All" value={AllClicks} />
      <Statistic text="Average" value={good * 1 + bad * (-1) / (good + neutral + bad)} />
      <Statistic text="Positive" value={good / AllClicks * 100 + "%"} />
    </tbody>
    </table>
</div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

const handleGoodClick = () => {
  setGood(good + 1)
}

const handleNeutralClick = () => {
  setNeutral(neutral + 1)
}

const handleBadClick = () => {
  setBad(bad + 1)
}

return (
<div>
  <h1>give feedback</h1>
    <Button handleClick={handleGoodClick} text='good' />
    <Button handleClick={handleNeutralClick} text='neutral' />
    <Button handleClick={handleBadClick} text='bad' />
    <Statistics good={good} neutral={neutral} bad={bad} />
</div>
  )
}

export default App;