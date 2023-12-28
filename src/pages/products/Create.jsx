import "./create.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
const Create =() => {
    const navigate = useNavigate()
    const [category,setCategory] = useState([]);
    const add = (value) => {
        value.category.id = +value.category.id;
        axios.post('http://localhost:8080/products', value).then(() => {
            navigate('/products/list', {state: {message: 'Add Success'}});
        })
    }
    useEffect(() => {
        axios.get('http://localhost:8080/categories').then (response => {
            setCategory(response.data)
        })
    }, []);
    return (
        <>
            <div className="create-form">
                <h2>Create</h2>
                {/*<input type="text"/>*/}
                {/*<button onClick={() => {*/}
                {/*    navigate('/students/list' ,{state:{message: 'Added Successfully'}})*/}
                {/*}}>Click</button>*/}

                <Formik initialValues={{
                    name: "",
                    description: "",
                    image: "",
                    price: "",
                    category : {
                        id: 1
                    }
                }
                } onSubmit={add}>

                    <Form>
                        <Field name="name" placeholder={"Name"} type={"text"}/>
                        {/*<span style={{color: 'red'}}><ErrorMessage name={'name'}/></span><br/>*/}
                        <Field name="description" placeholder={"Description"} type={"text"}/>
                        {/*<span style={{color: 'red'}}><ErrorMessage name={'description'}/></span><br/>*/}
                        <Field name="image" placeholder={"Image"} type={"text"}/>
                        {/*<span style={{color: 'red'}}><ErrorMessage name={'action'}/></span><br/>*/}
                        <Field name="price" placeholder={"Price"} type={"text"}/>
                        <Field name="category.id" placeholder={"CategoryId"} type={"number"} as="select">
                            {category.map((cate) => (
                                <option key={cate.id} value= {cate.id}>{cate.name}</option>
                            ))}

                        </Field>
                        <button type={"submit"}>Add</button>

                    </Form>

                </Formik>
            </div>
        </>

    )
}
export default Create;