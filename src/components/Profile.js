import React from 'react'
import { motion } from 'framer-motion'
import { SiReact, SiJavascript, SiFramer } from 'react-icons/si'
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
export default function Profile({ profile }) {
  return (
    <motion.div
      id="profile"
      variants={variants}
      initial={'closed'}
      animate={profile ? 'open' : 'closed'}
    >
      <h2>Hi, I'm Reid!</h2>
      <p>
        I'm a self taught software developer living in Portland, OR with my
        girlfriend Lauren and dog Olive.{' '}
      </p>
      <p>
        After about 6 years of working with a variety of libraries and
        languages, I've spent a lot of time lately doing a deep dive into React
        and thought I'd start this blog to share some of what I've learned and
        built with the hopes of making someone's life out there a bit easier.
      </p>

      <p>
        The content here is primarily going to deal with{' '}
        <a href="https://reactjs.org" target="_blank">
          React
        </a>
        ,{' '}
        <a href="https://www.framer.com/api/motion/" target="_blank">
          Framer Motion
        </a>
        , and plain old{' '}
        <a href="https://www.javascript.com/" target="_blank">
          JavaScript
        </a>
        !
        <br />
        <br />
        <SiReact />
        <SiFramer />
        <SiJavascript />
      </p>
    </motion.div>
  )
}
