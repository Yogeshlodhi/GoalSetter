import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../Features/goals/goalSlice'

function GoalForm() {
    const [name, setName] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createGoal({name}))
        setName('')
    }

  return (
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Goal</label>
                <input type="text" name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>
                    Add Goal
                </button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm
