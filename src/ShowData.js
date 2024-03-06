import React, { useEffect, useState } from 'react'

import axios from "axios";
import { useParams } from 'react-router';

function ShowData() {
    const [employee, setEmployee] = useState([]);
    const lagArr = ["HTML", "CSS", "JS"]

    const { emp_id } = useParams();
    console.log("Emp_id--", emp_id);

    const showSubmitData = (e) => {


        axios.get(`http://localhost:9002/employee?emp_id=${emp_id}`)
            .then((res) => {
                setEmployee(res.data)
            })
            .catch((err) => alert(err))

    }

    useEffect(() => {
        showSubmitData();
    }, [])

    console.log("Emp data --", employee[0]);
    return (
        <>
            <div className='container'>
                <h4>View Employee details</h4>
                <form>
                    <label>Employee first name</label>
                    <input type="text" name="emp_fname" id="" value={employee[0] ? employee[0].emp_fname : ""} readOnly />

                    <label>Employee last name</label>
                    <input type="text" name="emp_lname" id="" value={employee[0] ? employee[0].emp_lname : ""} readOnly />

                    <label>Employee dasignation</label>
                    <input type="text" name="designation" id="" value={employee[0] ? employee[0].designation : ""} readOnly />

                    <label>Employee salary</label>
                    <input type="number" name="salary" id="" value={employee[0] ? employee[0].salary : ""} readOnly />
                    <label>Language</label> <br />
                    
                    {
                        lagArr.map((lag, i) => {
                            return (
                                <>
                                    <label>{lag}</label>
                                    <input type="checkbox" name="language" id={lag} value={lag} checked={employee[0]?.language && employee[0].language.includes(lag)} />
                                </>
                            )
                        })
                    }

                </form>
            </div>
        </>
    )
}

export default ShowData