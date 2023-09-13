import React from 'react'
import { Button } from 'primereact/button';


export default function HeaderDataTable() {
    return (
        <div>
            <div className='py-[10px] px-[30px] flex items-center justify-between'>
                <div className='text-center'>
                    <p className='text-[30px] font-bold'>Logo</p>
                    <p className='text-[15px] font-medium'>WMF Update request</p>
                </div>

                <div className='flex items-center justify-end gap-[10px]'>
                    <button className='border p-2 rounded-lg'>
                        <svg className='w-[20px] h-[20px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="#343a40" d="m22 2-7 20-4-9-9-4Z" /><path stroke="#343a40" d="M22 2 11 13" /></svg>
                    </button>
                    <div className='p-2 border rounded-lg flex gap-3'>
                        <p className='text-[#343a40]'>Send Mandatory info</p>
                        <div className='flex items-center justify-center'>
                            <span className='text-[1rem] font-medium'>0</span>
                            <span className='text-[1rem] font-medium'>/5</span>
                        </div>
                    </div>
                    <Button className='!bg-blue-500 text-[1.25rem] font-medium'>Open Tutorial</Button>
                </div>
            </div>
        </div>
    )
}
