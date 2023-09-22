import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { useWordCount } from '../../Context/WordCountContext';






export default function HeaderDataTable() {
    // pop-up modal
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});


    const footerContent = (
        <div className='w-[100%]'>
            <Button label="Submit" className='w-[100%]' onClick={() => setVisible(false)} autoFocus />
        </div>
    );
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

    const { wordCount, recordCount, visible, setVisible } = useWordCount();
    const isDisabled = wordCount < recordCount;



    return (
        <div>
            <div className='bg-white py-[10px] px-[30px] flex items-center justify-between'>
                <div className='text-center'>
                    <p className='text-[30px] font-bold'>Logo</p>
                    <p className='text-[15px] font-medium text-[#4472c4]'>WMF Update request</p>
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
                                stroke={isDisabled ? "#343a40" : "#4472c4"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m22 2-7 20-4-9-9-4Z" />
                                <path d="M22 2 11 13" />
                            </svg>
                        </Button>

                    </div>
                    <div className='p-2 border border-[#4472c4] rounded-lg flex gap-3 hover:border-[#cbcccf]'>
                        <p className='text-[#4472c4]'>Send Mandatory info</p>
                        <div className='flex items-center justify-center'>
                            <span className='text-[1rem] font-medium text-[#4472c4]'>{wordCount}</span>
                            <span className='text-[1rem] font-medium text-[#4472c4]'>/{recordCount}</span>
                        </div>
                    </div>
                    <Button className='!bg-blue-500 text-[1.25rem] font-medium'>Open Tutorial</Button>
                </div>
            </div >
        </div >
    )
}
