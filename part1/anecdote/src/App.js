import React, { useState } from 'react'

const App = () => {

const [bestAnecdote, setBestAnecdote] = useState('')
const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4:0, 5:0 })
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
   
const [selected, setSelected] = useState(0)
const randomAnecdote = () => {
const randomIndex = Math.floor(Math.random() * 5)
  console.log(randomIndex)
    setSelected(randomIndex)
}

const vote = () => {
const copy = { ...points }
  copy[selected] += 1
    setPoints(copy)
      console.log(copy)
        setBestAnecdote(mostVoteAnecdote(copy))    
}

const mostVoteAnecdote = (copy) => {
const bestVote = Math.max(...Object.values(copy))
const x = Object.keys(copy).filter(i => copy[i] === bestVote)
  console.log(x)
  return anecdotes[x[0]] 
}

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <p>Has {points[selected]}  votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {bestAnecdote}
    </div>
  )
}

export default App