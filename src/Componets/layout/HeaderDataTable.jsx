import React from 'react'
import { Button } from 'primereact/button';


export default function HeaderDataTable() {
    return (
        <div>
            <div className='p-[10px] flex items-center justify-between'>
                <div>
                    <p className='text-[30px] font-bold'>Logo</p>
                    <p className='text-[15px] font-medium'>WMF Update request</p>
                </div>

                <div className='flex items-center justify-end gap-[10px]'>
                    <button>
                        <svg className='w-[2.6rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                    </button>
                    <div className='p-2 border rounded-lg'>
                        <p>Send Mandatory info</p>
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
