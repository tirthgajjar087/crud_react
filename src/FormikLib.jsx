import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';

function FormikLib() {
    const newValidation = yup.object({
        first_name: yup.string().min(4, "At least 4 characters are required").max(10, "Maximum 10 characters are allowed").required("First name is required"),
        last_name: yup.string().min(4, "At least 4 characters are required").required("Last name is required"),
        hobbies: yup.array().min(1, "At least one hobby is required").required("Hobbies are required"),
        gender: yup.string().required("Gender is required"),
        language: yup.string().required("Language is required")
    });

    return (
        <>
            <h5>Formik Form</h5>
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    hobbies: [],
                    gender: "",
                    language: ""
                }}
                validationSchema={newValidation}


                onSubmit={(values) => {
                    console.log("Your input value is: ", values);
                }}
            >
                <Form>

                    <div>
                        <label>First name</label>
                        <Field type="text" name="first_name" />
                        <ErrorMessage name="first_name" />
                    </div>


                    <div>
                        <label>Last name</label>
                        <Field type="text" name="last_name" />
                        <ErrorMessage name="last_name" />
                    </div>

                    <div style={{ display: "inline" }}>
                        <label>Hobbies :</label> <br />
                        <Field type="checkbox" name="hobbies" value="cricket" />
                        Cricket
                        <Field type="checkbox" name="hobbies" value="reading" />
                        Reading
                        <Field type="checkbox" name="hobbies" value="football" />
                        Football
                        <Field type="checkbox" name="hobbies" value="writing" />
                        Writing
                        <ErrorMessage name="hobbies" />
                    </div>

                    <div>
                        <label>Gender : </label>
                        <Field type="radio" name="gender" value="male" />Male
                        <Field type="radio" name="gender" value="female" />Female
                    </div>

                    <div>
                        <label>Language</label>
                        <Field name="language" as="select">
                            <option value=''>Select any language</option>
                            <option value='english'>English</option>
                            <option value='hindi'>Hindi</option>
                            <option value="gujarati">Gujarati</option>
                        </Field>
                        <ErrorMessage name="language" />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default FormikLib;
