import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../../store/authSlice'

const SignUp = () => {

    const [userInfo, setUserInfo] = useState({})
    const {error, status} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register(userInfo))
    }

    const handleChange = e => {
        const {name, value} = e.target
        setUserInfo(prev => ({...prev, [name] : value}))
    }

    useEffect(() => {
        if (error !== null) {
            alert(error)
        }
    },[error])
    
    return (
        <div className='br2 ba dark-gray b--black-70 w-100 w-50-m w-25-l  center'>
            <div className="pa4 black-80">
                <form className="measure center" onSubmit={handleSubmit} >
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" required onChange={handleChange}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email" id="email-address" required onChange={handleChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input autoComplete="new-password" className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" required onChange={handleChange}/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign up"
                            disabled={status === 'loading'}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <Link to={'/sign-in'} className="f6 link dim black db">Sign in</Link>
                        <a href="#0" className="f6 link dim black db">Forgot your password?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
