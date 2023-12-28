import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import axios from "axios";

const Update =() => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [data,setData] = useState({});
    const [category,setCategory] = useState([]);

    const save = (data) => {
        axios.put(`http://localhost:8080/products/`+id,data).then(() => {
            navigate('/products/list', {state: {message: 'Update Success'}});
        })
    }
    useEffect(() => {
        axios.get(`http://localhost:8080/products/${id}`)
            .then(res => {
                setData(res.data);
            })
    }, []
    )

    useEffect(() => {
        axios.get('http://localhost:8080/categories').then (response => {
            setCategory(response.data)
        })
    }, []);


    return (
        <>
            <Formik
                initialValues={data}
                onSubmit={save}
                enableReinitialize={true}
            >

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
                    <button type={"submit"}>Save</button>

                </Form>

            </Formik>

        </>
    )
}

export default Update;