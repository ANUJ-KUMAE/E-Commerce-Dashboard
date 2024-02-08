import React, { useState } from 'react'

const AddProducts = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false)

    const Additems = async () => {

      if(!name || !price || !category || !company)
      {
         setError(true);
         return false;
      }
        console.warn(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('User'))._id;
        console.log(userId)

        let result = await fetch('http://localhost:5000/add-products',{
          method: 'Post',
          body: JSON.stringify({ name, price, category,company,userId }),
          headers: {
              'Content-Type': 'application/json'
          },
      });

      result = await result.json();
      console.warn(result);
    }

  return (
    <div className='Form-Field'>
       <h1 className='Form-h1'>Add Products</h1>
       <input className='inputField' value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter the name of product' required/>
       { error && !name && <span className='show-error'>Enter a valid product name</span>}
       <input className= 'inputField' value={price} onChange={(e) => setPrice(e.target.value)} type='text' placeholder='Enter the Price of product' required/>
       { error && !price && <span className='show-error'>Enter a valid product price</span>}
       <input className='inputField' value={category} onChange={(e) => setCategory(e.target.value)} type='text' placeholder='Enter the Category' required/>
       { error && !category && <span className='show-error'>Enter a valid product category</span>}
       <input className='inputField' value={company} onChange={(e) => setCompany(e.target.value)} type='text' placeholder='Enter the Company' required/>
       { error && !company && <span className='show-error'>Enter a valid product company</span>}
       <button className='btn' type='submit' onClick={Additems}>Add</button>
    </div>
  )
}

export default AddProducts

