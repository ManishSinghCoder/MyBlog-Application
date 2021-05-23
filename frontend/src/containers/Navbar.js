import React, { Fragment, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../actions/auth';
import '../Component/All.css'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { ToastContainer } from 'react-toastify';


const Navbar = ({ logout, isAuthenticated, history,user }) => {
    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout(history);
        setRedirect(true);
    };

    const guestLinks = () => (
        <Fragment>
           
            <li className='nav-item'>
                <Link className='nav-link' to='/login' >Login</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/Signup'>Sign Up</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link'  onClick={()=>logout_user()}><ExitToAppIcon style={{ color: 'darkred' }} fontSize="large"/>Logout</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link'  to='/Blog'><GroupAddIcon fontSize="large" style={{ color: 'darkgreen' }}/>Blogcreate</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link'  to='/logview'>MyBlogs</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link'  to='/Allblogs'>Allblogs</Link>
            </li>
        </Fragment>
    );

    return (
        <Fragment>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                        <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                         />
                            <Link className='nav-link' to='/'><HomeIcon color="primary" fontSize="large" />Home <span className='sr-only'>(current)</span></Link>
                        </li>
                        {user ? authLinks():guestLinks()  }
                    </ul>
                </div>
                
            </nav>
            {redirect ? <Redirect to='/' /> : <Fragment></Fragment>}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));