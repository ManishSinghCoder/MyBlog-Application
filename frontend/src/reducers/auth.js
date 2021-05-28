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
    BLOG_LOAD_SUCCESS,
   
}
    from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: {},
    blogs:[],
    alblog:[],
    user: false,
    users:null,
    registererror:{}
    

}
export default function auth(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            return {
                ...state,
                isAuthenticated: payload,
                access: payload.access,
                refresh: payload.refresh,
                user:true
            }
        case LOGIN_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                users: payload,
                user:false
            }
        case USER_LOAD_SUCCESS:
            return{
                ...state,
                isAuthenticated:payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                registererror:payload
            }
        case BLOGCREATE:
            return{
                ...state,
                blogs:[...state.blogs,payload]
            }
        case BLOGVIEW:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                blogs:payload,

            }
        case BLOG_LOAD_SUCCESS:
            
            return{
            ...state,
            isAuthenticated:payload
            
            }
        
        case ALLBLOGS:
            return{
                ...state,
                alblog:payload
            }
        case BLOGUPDATE:
            return{
                ...state,
                blogs:[...state.blogs.slice(0,payload.index),payload.blogup,...state.blogs.slice(payload.index+1)]
            }
       
        case BOLGDELETE:
            return{
                ...state,
                blogs:[...state.blogs.slice(0,payload),...state.blogs.slice(payload+1)]
            }
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                access: true,
                refresh: true,
                isAuthenticated: {},
                blogs:[],
                alblog:[],
                users:null,
                registererror:{},
                user:false
            }
        default:
            return state
    }
}