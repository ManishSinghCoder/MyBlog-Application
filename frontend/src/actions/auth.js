import axios from 'axios'
import {  toast } from 'react-toastify'; 

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    BLOGCREATE,
    USER_LOAD_SUCCESS,
    BLOGVIEW,
    BLOGUPDATE,
    BOLGDELETE,
    ALLBLOGS,
    BLOG_LOAD_SUCCESS
}
    from './types';


export const login = (username,history) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    
    try {
        const res = await axios.post("http://127.0.0.1:8000/blog/login", username, config)
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data

        })
        toast("Login Success Enjoy!");
        history.push('/logview')
        localStorage.setItem("deatil",JSON.stringify(res.data))

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.detail
        });
    }

};
export const Locaget =()=> async (dispatch) =>{
    const  log = await localStorage.getItem("deatil")? JSON.parse(localStorage.getItem("deatil")):{}
    dispatch({
        type: USER_LOAD_SUCCESS,
        payload: log

    })
}

export const signUp = (form,history) => async dispatch =>{
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    try{
        const res = await axios.post("http://127.0.0.1:8000/blog/register",form, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        toast("Signup success Login for blogs!");
        history.push('/login')
    }catch(error){
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data
        })
    }

};
export const blogcreate =(blog,history)=> async dispatch =>{
        const config ={
            headers:{
                'Content-type': 'application/json'
            }
        }
    try{
        const blogc = await axios.post("http://127.0.0.1:8000/blog/blogpost",blog,config)
        dispatch({
            type: BLOGCREATE,
            payload: blogc.data
        })
        history.push('/logview')
    }catch(err){
        dispatch({
            
        })
    }
}


export const blogview =(isAtuthanticated) => async dispatch => {
    const config ={
        headers:{
            'Authorization': `Bearer ${isAtuthanticated.token}`,
            'Content-type': 'application/json'

        }
    }
    const blogvi = await axios.get("http://127.0.0.1:8000/blog/view",config)
    dispatch({
        type:BLOGVIEW,
        payload: blogvi.data
    })
    localStorage.setItem("detail",JSON.stringify(blogvi.data))
}
export const Locg =()=> async (dispatch) =>{
    const  logg = await localStorage.getItem("detail")? JSON.parse(localStorage.getItem("detail")):[]
    dispatch({
        type: BLOG_LOAD_SUCCESS,
        payload: logg

    })
}
export const allblog = (isAtuthanticated) => async dispatch =>{
    const config ={
        headers:{
            'Authorization': `Bearer ${isAtuthanticated.token}`,
            'Content-type': 'application/json'

        }
    }
    const blogal = await axios.get("http://127.0.0.1:8000/blog/allview",config).then(response=>response.data)
    dispatch({
        type:ALLBLOGS,
        payload: blogal
    })

}

export const blogupdate =(index,id,isAtuthanticated,blogdata,history)=> async dispatch=>{
const config ={
    headers:{
        'Authorization': `Bearer ${isAtuthanticated?.token}`,
        'Content-type': 'application/json'
    }
}
const blogup = await axios.put(`http://127.0.0.1:8000/blog/update/${id}`,blogdata,config).then(
    response=> response.data
)
dispatch({
    type:BLOGUPDATE,
    payload:{blogup,index}
})
history.push('/logview')

}
export const blogdelete = (index,id,isAtuthanticated)=> async dispatch=>{
    const config ={
        headers:{
            'Authorization': `Bearer ${isAtuthanticated?.token}`,
            'Content-type': 'application/json'
        }
    }
    await axios.delete(`http://127.0.0.1:8000/blog/delete/${id}`,config)
    dispatch({
        type:BOLGDELETE,
        payload:index
    })
}
export const logout = (history) => async dispatch => {
    localStorage.clear()
    localStorage.clear()

    dispatch({
        type: LOGOUT
    });
    history.push('/')
    toast("Logout Successfully!");
};