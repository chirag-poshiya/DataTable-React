import React, { useContext, useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import axios from 'axios';
// import { Link, NavLink } from 'react-router-dom';

import { useWordCount } from '../Context/WordCountContext';



function UserLogin({ setFormId, setLoading, setError }) {

    const [inputId, setInputId] = useState('');
    // const [apiData, setApiData] = useState(null);
    const { setApiData } = useWordCount();



    const handleSendClick = async () => {
        try {
            setLoading(true);
            setFormId(inputId);
            // setError(false);
            // Make an API request using Axios
            // const response = await axios.get(`https://wmf-test.free.mockoapp.net/form/${inputId}`);
            // const data = response.data;

            // // Update the apiData state with the response data
            // setApiData(data);
        } catch (error) {
            console.error('Error fetching data from API:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <div className='bg-white py-[10px] px-[30px] flex items-center justify-between'>
                    <div className='text-center'>
                        <p className='text-[30px] font-bold'>Logo</p>
                        <p className='text-[15px] font-medium'>WMF Update request</p>
                    </div>
                    <div className='flex items-center justify-end gap-[10px]'>
                        <Button className='!bg-blue-500 text-[1.25rem] font-medium'>Open Tutorial</Button>
                    </div>
                </div>
                <div className='flex justify-center items-center h-[calc(100vh_-_88px)]'>
                    <form action="">
                        <div className='user-login flex gap-5 border rounded-lg p-10 bg-white'>
                            {/* 7b3e6d9a2c1b459fa6f88a28f48e1c9f4d72bf7b8c7524cbbf7d9b70d9d86a4e */}
                            <InputText
                                value={inputId}
                                className='w-[30vw] min-w-[550px]'
                                placeholder='Form id'
                                onChange={(e) => setInputId(e.target.value)}
                            />
                            {/* <NavLink to="/indexDataTable"> */}
                            <Button
                                label="Submit"
                                className="!bg-blue-500 h-fit"
                                onClick={handleSendClick}
                            />
                            {/* </NavLink> */}
                        </div>
                    </form>
                </div>

            </div >
        </>
    )
}

export default UserLogin
