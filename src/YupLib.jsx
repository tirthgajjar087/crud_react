import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
function YupLib() {
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
    });


    const { handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: employee,
        validationSchema: Yup.object({
            first_name: Yup.string().min(3, 'Atleast 3 character is required').max(10, 'maximum 10 character is required').required("First name is required!"),
            last_name: Yup.string().min(3, "Atleast 3 character is required").max(10, "maximum 10 character is required !").required("Last name is required!")
        }),
        onSubmit: (values) => {
            console.log('My value is--', values);
        }
    })


    // const handleChange = (e) => {
    //     const { value, name } = e.target;
    //     setEmployee((prevEmployee) => ({
    //         ...prevEmployee,
    //         [name]: value,
    //     }));


    //     console.log("value=", value);
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("submitted", employee);
    // };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='first_name'> First Name</label>
                    <input type="text" name="first_name" value={values.first_name} onChange={handleChange} />
                    {touched?.first_name && errors?.first_name ?
                        <p style={{ color: "red" }}>{errors.first_name}</p>
                        : ""}
                    {/* <p style={{ color: "red" }}>{errors.first_name}</p> */}
                </div>

                <div>
                    <label htmlFor='last_name'>Last name</label>
                    <input type="text" name="last_name" value={values.last_name} onChange={handleChange} />
                    {touched.last_name && errors?.last_name
                        ? <p style={{ color: "red" }}>{errors.last_name}</p> : ''}

                </div>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default YupLib;