import React, { useState } from 'react';
import { connect, useSelector, } from 'react-redux'
import { signUp } from '../actions/auth'



const Signup = ({ signUp,history }) => {
    const [signupData, setFormData] = useState({
        

    });
    const detail = useSelector(state => state.auth)
        const { registererror } = detail
    const onChange = e => setFormData({ ...signupData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        
        e.preventDefault();
        signUp(signupData,history);
    
    }
    return (
        <div className='container mt-5' id="signup">
            {registererror && registererror.email && (
                <h4 id="denger">{registererror.email[0]}</h4>
            )}
            {registererror && registererror.username && (
                <h4 id="denger">{registererror.username[0]}</h4>
            )}
            {registererror && registererror.password && (
                <h4 id="denger">{"Ensure password field has at least 6 character"}</h4>
            )}
            <h1>Sign Up</h1>
            <p>Register your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group' id="lg" >
                    First Name:
                <input id="form"
                    className='form-control'
                    type='text'
                    placeholder='first_name'
                    name='first_name'
                    value={signupData.first_name}
                    onChange={onChange}
                    required
                    />
                </div>
                <div className='form-group' id="lg" >
                    Last Name:
                    <input id="form"
                        className='form-control'
                        type='text'
                        placeholder='last_name'
                        name='last_name'
                        value={signupData.last_name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group' id="lg">
                    Email:
                    <input id="form"
                        className='form-control'
                        type='text'
                        placeholder='email'
                        name='email'
                        value={signupData.email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group' id="lg">
                    Username:
                    <input id="form"
                        className='form-control'
                        type='text'
                        placeholder='username'
                        name='username'
                        value={signupData.username}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group' id="lg">
                    Password:
                    <input id="form"
                        className='form-control'
                        type='password'
                        placeholder='password'
                        name='password'
                        value={signupData.password}
                        onChange={onChange}
                        minLength='6'
                        required
                    />
                </div>
                <button id="form" className='btn btn-primary' type='submit'>Register</button>
            </form>
            <p className="mt-3">
            </p>
        </div>
    )
};


export default connect(null, { signUp })(Signup);