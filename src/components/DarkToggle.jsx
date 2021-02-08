import React from 'react'
import { motion } from 'framer-motion'

const c1variants = {
  dark: { fill: '#fff', scale: 1 },
  light: { fill: '#fff', scale: 0 },
}
const c2variants = {
  dark: { fill: '#333', scale: 1, x: 0, y: 0 },
  light: { fill: '#333', scale: [1, 1.1, 1, 1], x: -4, y: 12 },
}
const l4variants = {
  dark: { stroke: '#333', x: 0, y: 5, scale: 0 },
  light: {
    stroke: '#333',
    x: -8,
    y: -2,
    scale: 1,
    transition: { delay: 0.1 },
  },
}
const l1variants = {
  dark: { stroke: '#333', x: 0, y: 5, scale: [0, 0] },
  light: {
    stroke: '#333',
    x: -5,
    y: -10,
    scale: 1,
    transition: { delay: 0.2 },
  },
}
const l2variants = {
  dark: { stroke: '#333', x: 0, y: 5, scale: 0 },
  light: {
    stroke: '#333',
    x: 0,
    y: -11,
    scale: 1,
    transition: { delay: 0.3 },
  },
}
const l3variants = {
  dark: { stroke: '#333', x: 0, y: 5, scale: 0 },
  light: {
    stroke: '#333',
    x: 5,
    y: -10,
    scale: 1,
    transition: { delay: 0.4 },
  },
}

const l5variants = {
  dark: { stroke: '#333', x: 0, y: 5, scale: 0 },
  light: {
    stroke: '#333',
    x: 8,
    y: -2,
    scale: 1,
    transition: { delay: 0.5 },
  },
}

function DarkToggle({ colorMode, toggleColorMode }) {
  return (
    <a
      href="#"
      className={`theme-text header-icon darkToggleContainer theme-bg`}
      onClick={toggleColorMode}
    >
      <motion.svg
        height="20"
        width="29"
        className="darkToggle"
        style={{ overflow: 'hidden' }}
      >
        <motion.circle
          cx="15"
          cy="10"
          r="8"
          transition={{ duration: 0.19 }}
          fill={colorMode === 'light' ? '#333' : '#fff'}
          variants={c1variants}
          animate={colorMode === 'light' ? 'light' : 'dark'}
        />
        <motion.circle
          cx="19"
          cy="6"
          r="8"
          transition={{ duration: 0.19 }}
          fill={colorMode === 'light' ? '#fff' : '#333'}
          variants={c2variants}
          animate={colorMode === 'light' ? 'light' : 'dark'}
        />
        <g strokeWidth="2">
          <motion.path
            d="M 14 18 L 10 18"
            variants={l4variants}
            stroke={colorMode === 'light' ? '#333' : '#fff'}
            animate={colorMode === 'light' ? 'light' : 'dark'}
          />
          <motion.path
            d="M 14 21 L 11 18"
            variants={l1variants}
            stroke={colorMode === 'light' ? '#333' : '#fff'}
            animate={colorMode === 'light' ? 'light' : 'dark'}
          />
          <motion.path
            d="M 15 20 L 15 15"
            variants={l2variants}
            stroke={colorMode === 'light' ? '#333' : '#fff'}
            animate={colorMode === 'light' ? 'light' : 'dark'}
          />
          <motion.path
            d="M 16 21 L 19 18"
            variants={l3variants}
            stroke={colorMode === 'light' ? '#333' : '#fff'}
            animate={colorMode === 'light' ? 'light' : 'dark'}
          />
          <motion.path
            d="M 16 18 L 20 18"
            variants={l5variants}
            stroke={colorMode === 'light' ? '#333' : '#fff'}
            animate={colorMode === 'light' ? 'light' : 'dark'}
          />
        </g>
      </motion.svg>
    </a>
  )
}

export default DarkToggle
