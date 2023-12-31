import React, { useEffect, useState } from 'react'
import {FaSignInAlt} from 'react-icons/fa';

import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { login,reset } from '../Features/Auth/authSlice';
import Spinner from '../Components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const {email, password} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isSuccess, isError, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset())

  },[isError, user, isSuccess, message, dispatch, navigate])

  const onChange = (e) => {
    setFormData((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }
    ))
  }
  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  if(isLoading){
    return <Spinner/>
  }


  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Login And Set Your Goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              className="form-control" 
              id='email' 
              name='email' 
              value={email} 
              placeholder='Enter Your Email' 
              onChange={onChange} 
            />
            <input 
              type="password" 
              className="form-control" 
              id='password' 
              name='password' 
              value={password} 
              placeholder='Enter Your Password' 
              onChange={onChange} 
            />
          </div>
          <div className="form-group">
            <button type="submit" className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
