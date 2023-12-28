import {createRef, useEffect, useRef, useState} from "react";
import axios from "axios";
import "./products.css"
import {Link, useLocation} from "react-router-dom";

const ProductList = () => {
    const [searchInput,setSearchInput] = useState('');
    const updateInput = () => {
        const inputText = inputRef.current.value
        setSearchInput(inputText);
    }
    const inputRef = createRef();
    const {state} = useLocation();
    const [data,setData] = useState([]);



    const remove = (id) => {
        axios.delete(`http://localhost:8080/products/` + id).then((res) => {
            const isConfirm = confirm("Are you sure you want to remove")
            if (isConfirm){
                setData(data.filter(product =>{
                    return data.id !== id

                }))
            }
        })

    }



    useEffect(() => {
        axios.get('http://localhost:8080/products?name=' + searchInput)
          .then(res => {
                // console.log(res.data);
                setData(res.data);
            })
          .catch(err => {
                console.log(err);
            })
    },[searchInput])
    return (
        <>
             <span className={"title-table"}>
                <h2>List Product</h2>
                <br/>
                <input type="text" ref={inputRef} placeholder={"Search"} value={searchInput} onChange={updateInput}/>
                 {state && state.message && (<span style={{color: "green"}}>{state.message}</span>)}
            </span>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Image</th>
                    <th scope="col">Category</th>
                    <th colSpan={2}>Update - Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((item) => (
                        <tr key={item.id}>
                            <th scope="row">1</th>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td><img src={item.image} alt="" style={{height : 100 ,width : 100}}/></td>
                            <td>{item.category.name}</td>
                            <td>{item.action}</td>
                            <td><Link to={`/products/edit/${item.id}`}>
                                    <button>Update</button>
                            </Link></td>
                            <td>
                                <button onClick={() => {remove(item.id)}}>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </>
    )
}

export default ProductList;