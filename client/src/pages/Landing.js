import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/Testing'

// Components
import {Logo} from '../components'


// reac router 
import { Link } from 'react-router-dom'


// import motion 
import {motion} from 'framer-motion'

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };


  const transition = {
    ease: [0.5, 0.01, -0.05, 0.9]
  }
  
  const firstExampleVariant = {
    animate: i => ({
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.18,
        staggerDirection: i //we can replace it with custom number so that custom props doesn't need to declared!
      }
    })
  }
  const secondExampleVariant = {
    animate: {
        transition: {
            delayChildren: 0.6,
            staggerChildren: 0.04,
            staggerDirection: -1,
        }
    }
  };
  
  
  const firstExampleLetterVariant = {
      initial: { opacity: 0, y: "120%" },
      animate: { 
        opacity: 1, y: 0,
        transition: {
          duration: 0.4,
           ...transition 
       }
      }
  }
  
  const secondExampleLetterVariant = {
    initial: {
        y: 400
    },
    animate: {
        y: 0,
        transition: { duration: 1, ...transition }
    }
  };


const name = 'jobHere'
const nameArr = name.split(" ")


const Landing = () => {
  return (
    <Wrapper>
        <nav>
            {/* <Logo /> */}<motion.h1 
        variants={firstExampleVariant}
        initial="initial"
        animate="animate"
        className="firstExample"
      >
            {nameArr.map((letter, index) => (
            <motion.span
              key={index}
              variants={firstExampleLetterVariant}
              custom={1} // we can remove it if we declare a staggerDirection of 1 or -1 !
            >
              {letter}
            </motion.span>
            ))}
      </motion.h1>
        </nav>
        <div className='container page'>
            {/* info */}
            <div className='info'>
                    <h1>
                        job <span>tracking</span> app 
                    </h1>
                    <p>
                     Jobify is a website that help you keep track of your job application status. 
                      It also has peer to peer chat room to enable you to schedule a mock interview with your friend.  
                    </p>
                    <Link to = "/register"className='btn btn-hero'>
                        Login/Register
                    </Link>
            </div>

               <motion.svg
                   width="600"
                   height="600"
                   viewBox="0 0 600 600"
                   initial="hidden"
                   animate="visible"
                >
            <motion.circle
              cx="100"
              cy="100"
              r="80"
              stroke="#ff0055"
              variants={draw}
              custom={1}
             />
            <motion.line
              x1="220"
              y1="30"
              x2="360"
              y2="170"
              stroke="#00cc88"
              variants={draw}
              custom={2}
            />
            <motion.line
              x1="220"
              y1="170"
              x2="360"
              y2="30"
              stroke="#00cc88"
              variants={draw}
              custom={2.5}
            />
            <motion.rect
              width="140"
              height="140"
              x="410"
              y="30"
              rx="20"
              stroke="#0099ff"
              variants={draw}
              custom={3}
            />
            <motion.circle
              cx="100"
              cy="300"
              r="80"
              stroke="#0099ff"
              variants={draw}
              custom={2}
            />
            <motion.line
              x1="220"
              y1="230"
              x2="360"
              y2="370"
              stroke="#ff0055"
              custom={3}
              variants={draw}
            />
            <motion.line
              x1="220"
              y1="370"
              x2="360"
              y2="230"
              stroke="#ff0055"
              custom={3.5}
              variants={draw}
            />
            <motion.rect
              width="140"
              height="140"
              x="410"
              y="230"
              rx="20"
              stroke="#00cc88"
              custom={4}
              variants={draw}
            />
            <motion.circle
              cx="100"
              cy="500"
              r="80"
              stroke="#00cc88"
              variants={draw}
              custom={3}
            />
            <motion.line
              x1="220"
              y1="430"
              x2="360"
              y2="570"
              stroke="#0099ff"
              variants={draw}
              custom={4}
            />
            <motion.line
              x1="220"
              y1="570"
              x2="360"
              y2="430"
              stroke="#0099ff"
              variants={draw}
              custom={4.5}
            />
            <motion.rect
              width="140"
              height="140"
              x="410"
              y="430"
              rx="20"
              stroke="#ff0055"
              variants={draw}
              custom={5}
            />
    </motion.svg>
        </div>
    </Wrapper>
  )
}


export default Landing