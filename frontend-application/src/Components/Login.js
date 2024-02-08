import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let auth = localStorage.getItem("User");
        if(auth)
        {
            navigate('/');
        }
    })

    const HandleLogin = async () => {
        console.warn(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        result = await result.json();
        console.warn(result);
        if(result.name)
        {
            localStorage.setItem("User",JSON.stringify(result));
            navigate("/");
        } else {
            alert("Please Enter Correct details");
        }
    }
  return (
    <div className='Form-Field'>
        <h1 className='Form-h1'>Login Profile</h1>
            <input className='inputField' type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' required />
            <input className='inputField' type='text' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password' />
            <button type='submit' onClick={HandleLogin} className='btn'>Login</button>
    </div>
  )
}

export default Login
