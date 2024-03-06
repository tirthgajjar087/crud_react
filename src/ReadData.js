import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Outlet, useNavigate } from 'react-router-dom';

function ReadData() {
    const [employee, setEmployee] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchData = () => {

        axios.get("http://localhost:9002/employee")
            .then((res) => {
                setEmployee(res.data)
                console.log("data", res.data)
            }).catch((err) => {
                alert(err)
            })
            .finally(() => {
                setLoading(false)
            })

    }

    const deleteData = (id) => {
        console.log("Deleting employee with ID:", id);

        axios.delete(`http://localhost:9002/employee/${id}`)
            .then((res) => {
                alert("delete one employee ")
                setEmployee(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
                console.log("Employee deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting employee:", error);
            });
    };


    useEffect(() => {
        fetchData()
    }, [])

    console.log("emp", employee)
    return (
        <>

            <div className='container mt-3 d-flex flex-column gap-4 justify-content-center'>
                <h4>Employee Data</h4>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-primary' onClick={() => navigate("/add_data")}>ADD Item</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Emp First name</th>
                            <th>Emp Last name</th>
                            <th>Gender</th>
                            <th>Designation</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            loading ? (
                                <tr>
                                    <td>Loading..</td>
                                    <td>Loading..</td>
                                    <td>Loading..</td>
                                    <td>Loading..</td>
                                    <td>Loading..</td>
                                    <td>Loading..</td>
                                </tr>
                            )
                                : (

                                    employee.length === 0 ? (<tr><td>No data found here</td></tr>) : (

                                        employee.map((empdata, index) => {

                                            return (
                                                <tr key={index}>

                                                    <td>{index + 1}</td>
                                                    <td>{empdata.emp_fname}</td>
                                                    <td>{empdata.emp_lname}</td>
                                                    <td>{empdata.gender}</td>
                                                    <td>{empdata.designation}</td>
                                                    <td>{empdata.salary}</td>
                                                    <td>
                                                        <button className='btn btn-warning mx-3' onClick={() => navigate(`/show_data/${empdata.emp_id}`)}>View</button>
                                                        <button className='btn btn-success mx-3' onClick={() => navigate(`/edit_data/${empdata.id}`)}>Edit</button>
                                                        <button className='btn  btn-outline-danger' onClick={() => { deleteData(empdata.id) }}>Delete</button>
                                                    </td>


                                                </tr>
                                            )
                                        })

                                    )

                                )


                        }
                    </tbody>

                </table>
            </div>

        </>
    )
}

export default ReadData