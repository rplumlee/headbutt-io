import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import WaveBuilder from '../components/WaveBuilder'
import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'

import Slider from '@material-ui/core/Slider'
import '../styles.scss'
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}
function generateWaves(number, intensity, bumps, left, right) {
  let waves = []
  const width = 1400
  const height = 500
  const amplitude = 30 * intensity
  let x = width / (bumps * 3)
  x = x + width / x
  let startY
  let endY

  function generateYCoords(bumps) {
    let coords = []
    let antiCoords = []
    let bumpUp = true
    let lastPoints = []

    for (let i = 1; i <= bumps; i++) {
      let howFar = i / bumps
      let xDiscrepancy = left - right
      let group = []
      let antiGroup = []

      for (let x = 1; x <= 3; x++) {
        let point = getRandomInt(height * 0.1, height * 0.75)
        if (x === 1 && i !== 1) {
          point = lastPoints[1] - lastPoints[0] + lastPoints[1]

          lastPoints = []
        }

        if (x === 2 || x === 3) {
          lastPoints.push(point)
        }

        group.push(point)
      }

      coords.push(group)
      antiCoords.push(antiGroup)
      group = []
      antiGroup = []
    }
    return [coords, antiCoords]
  }

  for (let n = 0; n < number; n++) {
    let startInt = getRandomInt(0, height * 0.75)
    const [coords, antiCoords] = generateYCoords(bumps)
    let temp = `M0,${startInt}`
    let temp1 = `M0,${startInt}`

    coords.map((coord, index) => {
      let tempC = `C`

      coord.map((point, i) => {
        let comma = index == 2 && i == 2 ? '' : ','

        tempC += `${(index * 3 + i + 1) * x},${point}${comma}`
      })
      temp += tempC
    })
    temp += 'L1440,0L0,0Z'
    waves.push(temp)
  }
  return [waves]
}

export default function WaveBackground() {
  const [number, setNumber] = React.useState(5)
  const [opacity, setOpacity] = React.useState(0.35)
  const [speed, setSpeed] = React.useState(3)
  const waves2 = generateWaves(1, 7, 3, 500, 100)
  console.log(waves2)

  return (
    <>
      <Helmet />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <WaveBuilder />
      </div>
    </>
  )
}
