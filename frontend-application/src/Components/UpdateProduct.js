import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';


const UpdateProduct = () => {

    const [name, setName] = useState('');;
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        console.warn(params)
        let result = await fetch(`http://localhost:5000/updateproduct/${params.id}`)
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company)
    }

    const updateItem = async () => {
        console.warn(name, price, category, company);

        let result = await fetch(`http://localhost:5000/updateProduct/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.warn(result)
        navigate('/')
    }

    return (
        <div className='Form-Field'>
            <h1 className='Form-h1'>Update Product</h1>
            <input className='inputField' value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter the name of product' required />

            <input className='inputField' value={price} onChange={(e) => setPrice(e.target.value)} type='text' placeholder='Enter the Price of product' required />

            <input className='inputField' value={category} onChange={(e) => setCategory(e.target.value)} type='text' placeholder='Enter the Category' required />

            <input className='inputField' value={company} onChange={(e) => setCompany(e.target.value)} type='text' placeholder='Enter the Company' required />

            <button className='btn' type='submit' onClick={updateItem}>Update</button>
        </div>
    )
}

export default UpdateProduct
