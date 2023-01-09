import React, {useEffect, useState} from 'react'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { ApiService } from '../ApiService/ApiService';
import store from '../store';
import { useDispatch, useSelector } from 'react-redux';
const ProtectedRoute = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate
    // const token  = window.localStorage.getItem("token");
    const token = useSelector((token)=> token.token);
    
    const dispatch = useDispatch()
    
    // console.log("line 12", token);
    const [data, setdata] = useState({
        nomorWa : '',
        namaSekolah : '',
        saldo : '',
        statusLogin : ''
    })
    
    // console.log("line 9",token)
    if (!token) {
        return <Navigate to="/login" replace state={{from : location}}/>
        // navigate("/login")
    }
    const fecthData = async ()=>{
        const tokenData = jwtDecode(token)  
        const response  = await ApiService.post(`/wa/get-user-wa`, {id : tokenData.id});
        const responseLoginSs = await ApiService.post(`/wa/login-ss`);
        // console.log("line 32 protected route", responseLoginSs.data.data);
        let tokenSS = window.sessionStorage.setItem("tokenSS", responseLoginSs.data.data);

        // const response1 = await ApiService.post(`/wa/get-state-server`, {id : tokenData.id});
        // console.log('line 30 PR', response.data)
        dispatch({type : 'set', whatsAppInfo: response.data.data, tokenSS : tokenSS});
        // dispatch({type : "set", statusLogin : response1.status});
        // console.log("line 35", response1.status); 
    }

    useEffect(()=>{
        fecthData()

    }, [])

  
    return children 

}

export default ProtectedRoute