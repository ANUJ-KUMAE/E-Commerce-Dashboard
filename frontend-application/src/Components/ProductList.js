import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        userProducts();
    }, []);

    const userProducts = async () => {
        let result = await fetch('http://localhost:5000/product')
        result = await result.json();
        setProducts(result);
    }

    const deleteRecord = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            userProducts();
        }
    }

    const updateRecord = (id) => {
        navigate('/update/' + id)
    }


    const searchProduct = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result)
            {
                setProducts(result);
            }
        }
        else {
            userProducts();
        }

    }

    //console.warn("Products", products)
    return (
        <div className='user-products'>
            <h2 className='product-h2'>Product List</h2>
            <input type='text' placeholder='Search Product' className='Search-product' onChange={searchProduct} />
            <ul className='product-list'>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul className='product-list' key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>₹{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteRecord(item._id)} className='press'>Delete</button>
                            <button className='press' onClick={() => updateRecord(item._id)}>Update</button>
                            {/* <Link to={"/update/"+item._id}>Update</Link> */}
                        </li>
                    </ul>
                )
                    :
                    <h2>No Result Found</h2>
            }
        </div>
    )
}

export default ProductList
