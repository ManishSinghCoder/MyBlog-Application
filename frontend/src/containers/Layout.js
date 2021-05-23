import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';


const Layout = ({  children }) => {
    useEffect(() => {
        
    }, []);

    return (
        <div>
            <Navbar />
            {children}
           <footer id ="foot" ><i class="fas fa-heart"></i> <p>This is blog application developed by Manish 2021</p>
          <div id="pa">Email-Us     ms8704479@gmail.com</div>
           </footer > 
        </div>
    );
};

export default connect(null, {  })(Layout);