import React from 'react'
import { motion } from 'framer-motion'
import { SiReact, SiJavascript, SiFramer } from 'react-icons/si'
import Layout from '../components/layout'
const variants = {
  open: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.4,
    },
  },
  closed: {
    opacity: 1,
    transition: {
      delay: 0,
    },
  },
}
export default function Profile() {
  return (
    <Layout location={{ pathname: '/profile' }}>
      <motion.div
        id="profile"
        variants={variants}
        initial={'open'}
        animate={'open'}
      >
        <h2>Hi, I'm Reid!</h2>
        <p>
          I'm a software developer living in Portland, OR with my girlfriend
          Lauren and dog Olive.{' '}
        </p>
        <p>
          After about 6 years of working with a variety of libraries and
          languages, I've spent a lot of time lately doing a deep dive into
          React and thought I'd start this blog to share some of what I've
          learned and built with the hopes of making someone's life out there a
          bit easier.
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
        <p>
          Thank you for coming to my Ted talk. Feel free to drop me a line at
          &nbsp;<a href="mailto:reid@43webstudio.com">reid@43webstudio.com</a>{' '}
          or check out my Linkedin at{' '}
          <a href="https://linkedin.com/in/reid-plumlee">
            https://linkedin.com/in/reid-plumlee
          </a>
          !
        </p>
      </motion.div>
    </Layout>
  )
}
