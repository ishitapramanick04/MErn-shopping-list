import axios from 'axios';
import {returnErrors} from './errorActions';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    } from "./types";
    //check tken & load user
    //Login USer
    export const login=({email,password})=>dispatch=>{
        //config
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body=JSON.stringify({
            email,password
        })
        axios.post('/api/auth',body,config)
        .then(res=>dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        }))
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'));

            dispatch({
                type:LOGIN_FAIL
            })
        })
    }
//logout user
export const logout=()=>{
    return{
        type:LOGOUT_SUCCESS
    }
}
export const loadUser=()=>(dispatch,getState)=>{
        //User loading
        dispatch({type:USER_LOADING});
        //get token from local
       
        axios.get('/api/auth/user',tokenConfig(getState))
        .then(
            res=> dispatch({
                type:USER_LOADED,
                payload:res.data
            }))
            .catch(err=>{
                dispatch(returnErrors(err.response.data,err.response.status));
                dispatch({
                    type:AUTH_ERROR
                });
            });
    }
    //register
    export const register=({name,email,password})=>dispatch=>{
        //config
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body=JSON.stringify({
            name,email,password
        })
        axios.post('/api/users',body,config)
        .then(res=>dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        }))
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'));

            dispatch({
                type:REGISTER_FAIL
            });
        });
    }
    //setup cnfig 
    export const tokenConfig=getState=>{
        const token=getState().auth.token;
        //Headers
        const config={
            headers:{
                "Content-type":"application/json"
            }
        }
        //If token add to headers
        if(token){
            config.headers['x-auth-token']=token;
        }
        return config;
    }