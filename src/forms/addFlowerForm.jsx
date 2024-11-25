import * as Yup from 'yup';
import { useFormik } from 'formik';
import React from 'react';

export default function AddFlowerForm() {
    const addFlowerInitialValues = {
        name: "",
        price: "",
        description: "",
        category: ""
    }

    const addFlowerValidationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        price: Yup.number().min(1).required("Price is required"),
        description: Yup.string(),
        category: Yup.string()
    })

    const handleSubmit = (values) => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues: addFlowerInitialValues,
        validationSchema: addFlowerValidationSchema,
        onSubmit: handleSubmit
    })

    return (
        <div>
            <p>Add Flower Form</p>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                ) : null}

                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    name="price"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price ? (
                    <div>{formik.errors.price}</div>
                ) : null}

                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                    <div>{formik.errors.description}</div>
                ) : null}

                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                    <div>{formik.errors.description}</div>
                ) : null}

            </form>
        </div>


    )
}