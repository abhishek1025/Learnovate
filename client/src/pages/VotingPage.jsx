import React from 'react'
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'

const VotingPage = () => {
    return (
        <>
            <Navbar />

            <div className='max-w-[1240px] m-auto'>

                <div className='flex'>

                    <p>
                        Candidate Name
                    </p>

                </div>

            </div>

            <Footer />
        </>
    )
}

export default VotingPage;