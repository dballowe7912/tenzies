import React, { useEffect, useState } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

const App = () => {
  
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
    
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }

  }, [dice])

  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push({
              value: Math.ceil(Math.random() * 6), 
              isHeld: false,
              id: nanoid()
          })
      }
      return newDice
  }
  
  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : {
          value: Math.ceil(Math.random() * 6), 
          isHeld: false,
          id: nanoid()
        }
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice)
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} :
        die
    }))
  }
  
  const diceElements = dice.map(die => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)}
    />
  ))
  
  return (
      <main>
          { tenzies && <Confetti /> }
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {diceElements}
          </div>
          <button className="roll-dice" onClick={rollDice}>
            {tenzies ? 'New Game' : 'Roll'}
          </button>
      </main>
  )
}

export default App