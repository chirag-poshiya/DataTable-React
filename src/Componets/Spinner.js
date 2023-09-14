import React from 'react'

function Spinner({loading}) {
    console.log('Spinner')
    console.log(loading)
    return (
        loading &&
        <div className='spinner-main'>
            <div className="spinner"></div>
        </div>
    )
}

export default Spinner
