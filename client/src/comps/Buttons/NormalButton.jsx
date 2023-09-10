import React from 'react'

const NormalButton = ({ children, type }) => {
    return (
        <button
            type={type}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            {children}
        </button>
    )
}

export default NormalButton