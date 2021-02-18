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
export default function OperatorLookup() {
  return (
    <motion.div>
      <h2>Operator Lookup</h2>
    </motion.div>
  )
}
