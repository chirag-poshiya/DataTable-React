import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Form, Field } from 'react-final-form';
import { classNames } from 'primereact/utils';
import { useWordCount } from '../../Context/WordCountContext';
import { Checkbox } from 'primereact/checkbox';



export default function HeaderDataTable() {
    // pop-up modal
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [visible, setVisible] = useState(false);
    const validate = (data) => {
        let errors = {};

        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }
        return errors;

    }
    const onSubmit = (data, form) => {
        setFormData(data);
        setShowMessage(true);

        form.restart();
    };
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    // pop-up modal end

    const { wordCount, recordCount } = useWordCount();
    const isDisabled = wordCount < 3;


    return (
        <div>
            <div className='bg-white py-[10px] px-[30px] flex items-center justify-between'>
                <div className='text-center'>
                    <p className='text-[30px] font-bold'>Logo</p>
                    <p className='text-[15px] font-medium'>WMF Update request</p>
                </div>
                <div className='flex items-center justify-end gap-[10px]'>
                    <div className="open-modal-btn">
                        <Button
                            label=""
                            onClick={() => setVisible(true)}
                            className={`border p-2 rounded-lg ${isDisabled ? 'disabled' : ''}`}
                            disabled={isDisabled} // Add the disabled attribute to the button
                            aria-disabled={isDisabled} // For accessibility
                        >
                            <svg
                                className='w-[20px] h-[20px]'
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={isDisabled ? "#343a40" : "#000"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m22 2-7 20-4-9-9-4Z" />
                                <path d="M22 2 11 13" />
                            </svg>
                        </Button>
                        <div className="card flex justify-content-center">
                            <Dialog header="Enter Your Email" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                                <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', password: '', date: null, country: null, accept: false }} validate={validate} render={({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit} className="p-fluid">
                                        <Field name="email" render={({ input, meta }) => (
                                            <div className="field mb-4">
                                                <span className="p-float-label p-input-icon-right">
                                                    <i className="pi pi-envelope" />
                                                    <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                    <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )} />
                                        <Field name="accept" type="checkbox" render={({ input, meta }) => (
                                            <div className="field-checkbox mb-4">
                                                <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Confirm email</label>
                                            </div>
                                        )} />
                                        <Button type="submit" label="Submit" className="mt-2 pt-5" />
                                    </form>
                                )} />

                            </Dialog>
                        </div>
                    </div>
                    <div className='p-2 border rounded-lg flex gap-3 hover:border-[#cbcccf]'>
                        <p className='text-[#343a40]'>Send Mandatory info</p>
                        <div className='flex items-center justify-center'>
                            <span className='text-[1rem] font-medium'>{wordCount}</span>
                            <span className='text-[1rem] font-medium'>/{recordCount}</span>
                        </div>
                    </div>
                    <Button className='!bg-blue-500 text-[1.25rem] font-medium'>Open Tutorial</Button>
                </div>
            </div >
        </div >
    )
}
