import React from 'react'
import { motion } from 'framer-motion'
import { SiReact, SiJavascript, SiFramer } from 'react-icons/si'
import Input from '@material-ui/core/Input'
import Tilt from 'react-parallax-tilt'
const variants = {
  open: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.4,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      delay: 0,
    },
  },
}
const operators = [
  { label: '&&', info: 'yada yada yada', hint: 'yada ' },
  { label: '||', info: 'yida yida yida', hint: 'yida ' },
  { label: '==', info: 'yoda yoda yoda', hint: 'yoda ' },
  { label: '!=', info: 'yada yada yada', hint: 'yada ' },
  { label: '===', info: 'yida yida yida', hint: 'yida ' },
  { label: '!==', info: 'yoda yoda yoda', hint: 'yoda ' },
]
export default function OperatorLookup() {
  const [state, setState] = React.useState('')
  const renderOperators = operators.map((operator, i) => {
    if (operator.label.startsWith(state)) {
      return (
        <motion.li key={`li-${i}`} layout>
          {operator.label}
        </motion.li>
      )
    }
  })
  return (
    <>
      <Tilt
        tiltMaxAngleX={0}
        tiltMaxAngleY={0}
        className="parallax-effect card checkered-bg"
        perspective={400}
        scale={1}
        style={{
          background:
            'url(https://scotch-res.cloudinary.com/image/upload/w_1050,q_auto:good,f_auto/media/4741/PTLHvdFMQuW7VhAXQc0G_es6_what_to_use_and_what_not_to.png.jpg)',
          maxWidth: '90%',
          backgroundSize: '350%',
          backgroundPosition: 'right center',
          marginBottom: 40,
        }}
      >
        <div
          to="/operatorLookup"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          className="makewaves-card"
        >
          {/* <motion.svg
                  viewBox="0 0 1600 900"
                  initial={{
                    y: 25,
                    overflow: 'visible',
                  }}
                >
                  <path
                    opacity=".7"
                    fill="#d5b71e"
                    d="M0,582C178,387,356,561,534,604,C712,647,890,556,1068,372,C1246,188,1424,539,1602,381C1600, 450,1600, 450,1600, 450C1600, 450,1600, 450,1600, 450C1600, 450,1600, 450,1600, 450L1600,450C1422,450,1244,450,1066,450,C888,450,710,450,532,450,C354,450,176,450,-2,450C0, 450,0, 450,0, 450C0, 450,0, 450,0, 450C0, 450,0, 450,0, 450L1404,450L0,450Z"
                  />
                </motion.svg> */}
          <motion.div className="inner-element" style={{ height: '100%' }}>
            {' '}
            <div
              className="logo-container-makewaves operator"
              style={{ width: '100%', height: '100%', padding: 0 }}
            >
              <h5
                style={{
                  color: '#222',
                  textAlign: 'left',
                  width: '100%',
                  margin: 0,
                  height: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  fontSize: '.8rem',
                }}
              >
                ES6<br></br>Operator<br></br>Lookup
              </h5>
            </div>
          </motion.div>
        </div>
      </Tilt>
      <Input
        value={state}
        placeholder={`Search here..`}
        onChange={(e) => setState(e.target.value)}
        style={{ fontSize: '2rem', alignSelf: 'flex-start' }}
      />
      <motion.div className="operators" layout>
        <motion.ul layout>{renderOperators}</motion.ul>
      </motion.div>
    </>
  )
}
