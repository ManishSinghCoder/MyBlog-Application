import React from 'react';
import { Link } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { Card } from 'antd'
import { blogview, blogdelete } from '../actions/auth'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import GroupIcon from '@material-ui/icons/Group';
import { ToastContainer } from 'react-toastify';
import './All.css'
import Truncate from 'react-truncate';

const Blogview = ({ blogview, blogdelete,allblog, history }) => {
    const detail = useSelector(state => state.auth)
    const { isAuthenticated, blogs } = detail

    const handledelete = (id) => {
        const index = blogs.findIndex(item => item.id == id)
        blogdelete(index, id, isAuthenticated)

    }
    const handleupdate = (id) => {
        history.push(`/blogupdate/${id}`)
    }
   
    const handleup = (id) => {
        history.push(`/Content/${id}`)
    }
    
    const onSubmit = e => {
        blogview(isAuthenticated);
    }
    return (
        <div id="blog">
            <Link id="bl" onClick={onSubmit} ><GroupIcon fontSize="large"/>MyBlogs</Link>
        <div className='cont mt-5'>
            
            {blogs.map(item => <Card 
            headStyle={{backgroundColor: '#f1efef', border: 50 }}
                hoverable
                style={{ width: 300 }} title={item.title}  >
                <Truncate lines={1} ellipsis={<span>... <Link href='/Content' onClick={() => handleup(item.id)} >Read more...</Link></span>}>
                    {item.content}
                </Truncate>
                <a id="an" onClick={() => handleupdate(item.id)}><CreateIcon/></a>
                <a id="anc" onClick={() => handledelete(item.id)}> <DeleteIcon/></a>     
            </Card>)}
            </div>

        <ToastContainer/>
        </div>

    )
}

export default connect(null, { blogview, blogdelete })(Blogview);


