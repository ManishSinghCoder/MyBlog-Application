import React, { useState,useEffect } from 'react';
import { connect, useSelector } from 'react-redux'
import { blogupdate } from '../actions/auth'

import './All.css'


const Content = ({ match }) => {
    const blogu = useSelector(state=>(state.auth))
    const {isAuthenticated,blogs} = blogu
    const [blogdata, setBlogData,] = useState({ 
        user:isAuthenticated.id

    });
    const {id}= match.params
    useEffect(()=>{
        const ids = blogs.find(item=> item.id==id)
        setBlogData(ids)
    },[])
   

    return (

        <div id="read">
            <p>{blogdata.content}</p>
        </div>

    )
}


export default connect(null, { blogupdate })(Content);


