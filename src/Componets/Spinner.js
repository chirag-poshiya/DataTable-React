import React from 'react'

function Spinner({loading}) {
    
    return (
        loading &&
        <div className='spinner-main h-[100vh] w-[100vh]'>
            <div className="spinner"></div>
        </div>
    )
}

export default Spinner
