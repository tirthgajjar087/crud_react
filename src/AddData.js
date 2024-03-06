import React, { useState } from 'react'
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
function AddData() {

    // const [counter, setCounter] = useState(1)
    const [employee, setEmployee] = useState({
        emp_id: new Date().getTime(),
        emp_fname: "",
        emp_lname: "",
        designation: "",
        salary: "",
        gender: "",
        language: []
    })
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        console.log("name -- value", name, value);


        if (name === 'language') {
            if (checked) {
                setEmployee((prevState) => ({
                    ...prevState,
                    language: [...prevState.language, value]
                }));
            } else {
                setEmployee((prevState) => ({
                    ...prevState,
                    language: prevState.language.filter(lang => lang !== value)
                }));
            }
        }
        // else if(name==='gender'){
        //     if()
        //     setEmployee({...employee ,[name]:value.charAt(0).toUpperCase() + value.substr(1)} ) 

        // } 
        else {
            setEmployee((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    function validate() {
        let flag = true;

        for (let key in employee) {
            console.log("key--", key);
            console.log("Value ==", employee[key]);
            if (!employee[key]) flag = false;
        }

        return flag;
    }


    const handleSubmitData = (e) => {

        e.preventDefault();
        console.log(employee);

        if (validate()) {
            axios.post('http://localhost:9002/employee', employee).then(
                (res) => {
                    // alert("Record Added Successfully");  
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful!',
                        text: 'Record added successfully.'

                    }).then(() => {
                        window.location.reload();

                    }).catch((err) => alert(err))


                })
        }
        else {
            alert("Please Fill all fields correctly")
        }


    }
    return (
        <>
            <div className='container'>
                <h4>Add EMployee</h4>
                <form onSubmit={handleSubmitData}>
                    <label>Employee first name</label>
                    <input type="text" name="emp_fname" id="" value={employee.emp_fname} onChange={handleChange} />
                    <label>Employe last name</label>
                    <input type="text" name="emp_lname" id="" value={employee.emp_lname} onChange={handleChange} />

                    <label>EMployee dasignation</label>
                    <input type="text" name="designation" id="" value={employee.designation} onChange={handleChange} />

                    <label>Employee salary</label>
                    <input type="number" name="salary" id="" value={employee.salary} onChange={handleChange} />
                    <label>Male</label>
                    <input type="radio" name="gender" id="" value="male" onChange={handleChange} />
                    <label>FeMale</label>
                    <input type="radio" name="gender" id="" value="male" onChange={handleChange} />
                    <br />

                    HTML
                    <input type="checkbox" name="language" id="" value="HTML" onChange={handleChange} />
                    CSS
                    <input type="checkbox" name="language" id="" value="CSS" onChange={handleChange} />

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddData