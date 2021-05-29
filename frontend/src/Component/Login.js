import React, { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { connect, useSelector} from 'react-redux'
import {  login } from '../actions/auth'
import './All.css'
import { ToastContainer } from 'react-toastify';


const Login = ({ login,history }) => {

   
    const [formData, setFormData] = useState({


    });
    const detail = useSelector(state => state.auth)
    const { users } = detail


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        login(formData,history);
        

    }
    return (
        <div className='container mt-5' id="login" >
            <ToastContainer/>
            {users ? <h4 id="use">{users}</h4> : <></>}
            <h1 id="log">LogIn</h1>
            <p id="log">Login into your Account</p>
            <form onSubmit={e => onSubmit(e)}  >
                <div className='form-group' id="lg">
                    Username:
                    <input id="form"
                        className='form-control'
                        type='text'
                        placeholder='username'
                        name='username'
                        value={formData.username}
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
                        value={formData.password}
                        onChange={onChange}
                        minLength='6'
                        required
                    />
                </div>
                <button id="form" className='btn btn-primary' type='submit' >Login</button>
        
            </form>
          
            <p className="mt-3" >
                Don't have an Account? <Link to='/Signup' id="lg">SignUp</Link>
            </p>
        </div>
    )
};
const mapStateToProps = state => ({
    users: state.auth.users
});


export default connect(null, { login })(Login);