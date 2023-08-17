import React from 'react'
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'
import BrainIcon from "../assets/imgs/hero-sec-icon.png"
import PeoplesInChainImg from "../assets/imgs/home-page-benifit-img.png"
import { FaLaptopCode, FaLightbulb, FaRoad } from 'react-icons/fa';

const Home = () => {

  const featureData = [
    {
      icon: <FaLaptopCode className="text-5xl text-blue-500 mb-4" />,
      title: "On Demand Courses",
      description: "Find all the instructions you need to get an entry-level job in tech you already know with Compass."
    },
    {
      icon: <FaLightbulb className="text-5xl text-green-500 mb-4" />,
      title: "Interactive Learning",
      description: "Our courses have quizzes and code challenges to keep you engaged because the best way to learn."
    },
    {
      icon: <FaRoad className="text-5xl text-purple-500 mb-4" />,
      title: "Learning With Tracks",
      description: "Each of our Tracks is a mini-program designed to teach you a particular set of skills."
    }
  ];

  const benefitsContent = [
    {
      heading: "Flexibility",
      text: "Online education offers the flexibility to learn anytime, anywhere."
    },
    {
      heading: "Reduced Costs",
      text: "With online education, you save on commuting and accommodation expenses."
    },
    {
      heading: "Networking Opportunities",
      text: "Online courses provide opportunities to connect with a diverse group of learners from around the world."
    },
    {
      heading: "Documentation",
      text: "Access comprehensive documentation to support your learning journey"
    },
    {
      heading: "Increased Time",
      text: "Online education saves you time by eliminating the need for commuting. "
    },
    {
      heading: "Access to Expertise",
      text: "Gain access to expert instructors and industry professionals. "
    }
  ];


  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <div className='hero-section h-[90vh] text-white flex flex-col justify-center items-center '>

        <img src={BrainIcon} alt="" />

        <div className='text-center mt-10'>
          <p>We believe in</p>
          <h1 className='text-6xl font-bold'>Passion for learning</h1>
        </div>

        <div className='mt-5 mb-8 font-bold text-lg'>
          <p>And E-Learning is great tool to learn!</p>
        </div>

        <div>
          <button className='bg-[#E03A11] py-3 px-5 rounded-sm'>EXPLORE WITH US</button>
        </div>

      </div>

      {/* FEATURE SECTION */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            The Great Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureData.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg text-center"
              >
                <div className="mb-4">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}

      <div className='bg-gray-100  py-20'>

        <div className='text-center pb-16'>
          <p className='text-[#E03A11] text-xl'>How It Works</p>
          <h2 className='text-5xl'>Benefits Of Online Education</h2>
        </div>

        <div className='grid grid-cols-3 w-[80%] m-auto gap-x-4'>

          <div className='space-y-5'>

            {
              benefitsContent.slice(0, 3).map(({ heading, text }) => (
                <div>
                  <h2 className='font-semibold'>{heading}</h2>
                  <p className='text-gray-500 mt-2'>{text}</p>
                </div>
              ))
            }

          </div>

          <div className='flex  justify-center'>

            <img src={PeoplesInChainImg} className='h-[350px]' />

          </div>

          <div className='space-y-5'>

            {
              benefitsContent.slice(3).map(({ heading, text }) => (
                <div>
                  <h2 className='font-semibold'>{heading}</h2>
                  <p className='text-gray-500 mt-2'>{text}</p>
                </div>
              ))
            }

          </div>

        </div>

      </div>


      <Footer />

    </>
  )
}

export default Home