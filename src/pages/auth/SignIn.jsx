import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'

const SignIn = () => {

    const dispatch = useDispatch()
    
    const [credentials, setCredentials] = useState({})

    const handleChange = e => {
        const {name, value} = e.target
        setCredentials(prev => ({...prev, [name] : value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(credentials))
    }
  return (

    <div className='br2 ba dark-gray b--black-70 w-100 w-50-m w-25-l  center' style={{height: '400px'}}>
        <div className="pa4 black-80">
            <form className="measure center" onSubmit={handleSubmit}>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email" id="email-address" required onChange={handleChange}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" required onChange={handleChange}/>
                </div>
                <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                </fieldset>
                <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                <a href="#0" className="f6 link dim black db">Sign up</a>
                <a href="#0" className="f6 link dim black db">Forgot your password?</a>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignIn
