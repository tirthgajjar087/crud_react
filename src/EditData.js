import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { json, useNavigate, useParams } from 'react-router';

function EditData() {
    const { id } = useParams();
    console.log("Emp_id--", id);
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({});
    const [initialEmployee, setInitialEmployee] = useState({});
    const lagArr = ['HTML', 'CSS', 'JAVASCRIPT'];
    const genderArr = ['male', 'female']

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchEmpData();
    }, []);
    console.log("emp", employee)

    const fetchEmpData = () => {
        axios.get(`http://localhost:9002/employee?id=${id}`)
            .then((res) => {
                setEmployee(res.data[0]);
                setInitialEmployee(res.data[0]);
                setLoading(false);
            })
            .catch((err) => alert('Failed to fetch employee data'));
    };



    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        if (type === 'checkbox') {
            if (checked) {
                if (employee.language && !employee.language.includes(value)) {
                    console.log("true", employee.language.includes(value));
                    setEmployee((prevState) => ({
                        ...prevState,
                        language: [...prevState.language, value],
                    }));
                }
            } else {
                console.log("false");
                setEmployee((prevState) => ({
                    ...prevState,
                    language: prevState.language.filter(lang => lang !== value)
                }));
            }
        }

        else if (type === 'radio') {
            if (checked) {
                setEmployee((prevState) => ({
                    ...prevState,
                    gender: value
                }));
            }
        }
        else {
            setEmployee((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
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
                {
                    genderArr.map((genValue, index) => {
                        return (
                            <React.Fragment key={genValue} >
                                <label htmlFor={genValue}>{genValue}</label>
                                <input type="radio" name="gender" value={genValue} checked={employee?.gender === genValue} onChange={handleChange} />
                            </React.Fragment>
                        )
                    })
                }
                <br />
                <label>Language</label> <br />

                {
                    lagArr.map((lang, i) => {
                        return (
                            <React.Fragment key={lang} >
                                <label htmlFor={lang}>{lang}</label>
                                <input type="checkbox" id={lang} name="language" value={lang} checked={employee?.language && employee.language.includes(lang)} onChange={handleChange} />

                            </React.Fragment>
                        )
                    })
                }


                <button type='submit'>Submit</button>
                <button type='button' className='mx-3' onClick={handleResetData}>Reset</button>
            </form>
        </div >
    );
}

export default EditData;

