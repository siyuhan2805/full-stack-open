import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // state mirroring the index of the anecdote
  const [selected, setSelected] = useState(0)
  //state capturing the votes of each anecdotes
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  // function to generate a random index based on length of the anecdotes array
  const randomAnecdote = () => {
    const newAnecdoteIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(newAnecdoteIndex)
    console.log(newAnecdoteIndex)
  }

  // function to update vote for a specific anecdote
  const anecdoteVotes = () => {
    const arrCopy = [...votes]
    // updating the vote count based on the index of the current anecdote
    arrCopy[selected] += 1 
    // passing in the updated copied arr to set new state
    setVotes(arrCopy)
  }

  // function that returns the index of the votes state array with the highest value 
  const popularAnecdote = () => {
    return votes.indexOf(Math.max(...votes))
  }
  
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br></br>
      has {votes[selected]} votes
      <div>
        <button onClick={anecdoteVotes}>vote</button>
        <button onClick={randomAnecdote}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[popularAnecdote()]}<br></br>
        has {votes[popularAnecdote()]} votes
      </p>

    </div>
    
  )
}

export default App
