import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { json, useNavigate, useParams } from 'react-router';

function EditData() {
    const { id } = useParams();
    console.log("Emp_id--", id);
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({});
    const [initialEmployee, setInitialEmployee] = useState({});

    useEffect(() => {
        fetchEmpData();
    }, []);

    const fetchEmpData = () => {
        axios.get(`http://localhost:9002/employee?id=${id}`)
            .then((res) => {
                setEmployee(res.data[0]);
                setInitialEmployee(res.data[0]);
            })
            .catch((err) => alert('Failed to fetch employee data'));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmitData = (e) => {
        e.preventDefault();
        console.log('update data---', employee);

        axios.put(`http://localhost:9002/employee/${id}`, employee)
            .then((res) => {
                console.log('Updat e EMP_DATA--:', res.data);
                alert('Employee data updated successfully');
                navigate('/')
            })
            .catch((err) => {
                console.error('Error:', err);
                alert('Failed to update employee data');
            });
    };

    const handleResetData = () => {
        setEmployee(initialEmployee);
    };

    return (
        <div className='container'>
            <h4>Edit Employee</h4>
            <form onSubmit={handleSubmitData}>
                <label>Employee first name</label>
                <input type="text" name="emp_fname" id="" value={employee.emp_fname} onChange={handleChange} />
                <label>Employee last name</label>
                <input type="text" name="emp_lname" id="" value={employee.emp_lname} onChange={handleChange} />
                <label>Employee designation</label>
                <input type="text" name="designation" id="" value={employee.designation} onChange={handleChange} />
                <label>Employee salary</label>
                <input type="number" name="salary" id="" value={employee.salary} onChange={handleChange} />
                <button type='submit'>Submit</button>
                <button type='button' className='mx-3' onClick={handleResetData}>Reset</button>
            </form>
        </div>
    );
}

export default EditData;
