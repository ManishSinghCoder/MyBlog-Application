import React from 'react';
import { Link } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { Card } from 'antd'
import { allblog } from '../actions/auth'
import GroupIcon from '@material-ui/icons/Group';

import './All.css'
import Truncate from 'react-truncate';

const Allblogs = ({ allblog, history }) => {
    const details = useSelector(state => state.auth)
    const { isAuthenticated, alblog } = details
    const handleup = (id) => {
        history.push(`/Content/${id}`)
    }
    const onSubmit = e => {
        allblog(isAuthenticated);
    }
    return (
        <div id="bl">
               <Link classname="bl" onClick={onSubmit} ><GroupIcon fontSize="large" />Allblogs</Link>

        <div className='cont mt-5'>
         
            {alblog.map(item => <Card 
            headStyle={{backgroundColor: '#f1efef', border: 50 }}
                hoverable
                style={{ width: 300 }} title={item.title}  >
                <Truncate lines={1} ellipsis={<span>... <Link href='/Content' onClick={() => handleup(item.id)} >Read more...</Link></span>}>
                    {item.content}
                </Truncate>
                    
            </Card>)}

        </div>
        </div>

    )
}


export default connect(null, { allblog })(Allblogs);