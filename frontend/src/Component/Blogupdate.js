import React,{useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux'
import {blogupdate} from '../actions/auth'


const Blogupdate =({ blogupdate,match,history }) =>{
    
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
    const handlechange = (e)=> {
       setBlogData({...blogdata,[e.target.name]:e.target.value})
    }
    const onSubmit = e =>{
        e.preventDefault();
        const index = blogs.findIndex(item => item.id == id)
        blogupdate(index,id,isAuthenticated,blogdata,history)
    }

    return(
        <div className='container mt-5 ' id="update">
            <h1>Create Your Blog</h1>
            <form onSubmit={e=> onSubmit(e)} >
            <div className='form-group'>
                    BlogTitle:
                    <input
                    type='text'
                    placeholder='BlogTitle'
                    name='title'
                    value={blogdata.title}
                    onChange={handlechange}
                    required
                    />
                </div>
                <div >
                    BlogContent:
                    <div class="form-outline">
                    <textarea 
                    id="textAreaExample" 
                    rows="4"
                    type='text'
                    name="content"
                    value={blogdata.content}
                    placeholder='write your blog content here.......'
                    onChange={handlechange}
                    required
                    />
                    </div>
                </div>
                <button className='btn btn-primary' type='submit' >updateblog</button>
            </form>
        </div>
    )
};
export default connect(null, { blogupdate }) (Blogupdate);