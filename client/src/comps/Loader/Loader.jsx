import React from 'react'
import "./Loader.css";

const Loader = () => {
    return (
        <div className='bg-black h-full w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-opacity-40'>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

        </div>

    )
}

export default Loader