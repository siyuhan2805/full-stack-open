import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const StatisticLine = ({text, value}) => {
  // conditional rendering for the statistic with a percentage
  if (text == "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  else {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.btnText}</button>
  )
}

const Statistics = (props) => {
  // total feedback sum
  const total =  props.good + props.neutral + props.bad
  // avg calculation
  const avg = (props.good + (-1 * props.bad)) / total
  // positive feedback percentage
  const positivePercent = props.good / total * 100

  // conditional rendering
  if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good}/>
            <StatisticLine text="neutral" value={props.neutral}/>
            <StatisticLine text="bad" value={props.bad}/>
            <StatisticLine text="all" value={total}/>
            <StatisticLine text="average" value={avg}/>
            <StatisticLine text="positive" value={positivePercent}/>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log("good clicks current", updatedGood)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    console.log("neutral clicks current", updatedNeutral)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    console.log("bad clicks current", updatedBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} btnText="good"/>
      <Button handleClick={handleNeutralClick} btnText="neutral"/>
      <Button handleClick={handleBadClick} btnText="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App
