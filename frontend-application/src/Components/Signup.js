import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const auth = localStorage.getItem('User');
        if(auth)
        {
            navigate('/')
        }

    })

    const SaveData = async () => {
        console.log(name, email, password)

        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json()
        console.warn(result)
        localStorage.setItem("User", JSON.stringify(result));
        navigate('/');
    }

    return (
        <div className='Form-Field'>
            <h1 className='Form-h1'>Register</h1>
            <input className='inputField' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your Name' required name='UserName' autoComplete='off' />
            <input className='inputField' type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' required />
            <input className='inputField' type='text' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password' />
            <button type='submit' onClick={SaveData} className='btn'>Sign Up</button>
        </div>
    )
}

export default Signup
