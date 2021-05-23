import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux'
import { blogcreate } from '../actions/auth'

const Blogcreate = ({ blogcreate,history }) => {
    const blogd = useSelector(state => (state.auth))
    const { isAuthenticated } = blogd
    const [blogdata, setBlogData,] = useState({
        user: isAuthenticated.id
    });
    const onChange = e => setBlogData({ ...blogdata, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        blogcreate(blogdata,history);
    }

    return (
        <div className='container mt-5' id="create">
            <h1>Create Your Blog</h1>
            <form onSubmit={e => onSubmit(e)} >
                <div className='form-group'>
                    BlogTitle:
                    <input id="form"
                        className='form-control'
                        type='text'
                        placeholder='BlogTitle'
                        name='title'
                        value={blogdata.title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    BlogContent:
                    <div class="form-outline">
                        <textarea id="form"
                            class="form-control"
                            id="textAreaExample"
                            rows="4"
                            type='text'
                            name="content"
                            value={blogdata.content}
                            placeholder='write your blog content here.......'
                            onChange={onChange}
                            required
                        />
                    </div>
                </div>
                <button id="form" className='btn btn-primary' type='submit' >CreateBlog</button>
            </form>
        </div>
    )
};


export default connect(null, { blogcreate })(Blogcreate);