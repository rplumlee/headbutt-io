import React from 'react'
import { Link } from 'gatsby'
import { motion, useAnimation } from 'framer-motion'
import Slider from '@material-ui/core/Slider'
import Fab from '@material-ui/core/Fab'
import { GiPerspectiveDiceSixFacesThree } from 'react-icons/gi'
import { BiAddToQueue } from 'react-icons/bi'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import {
  materialDark,
  dracula,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}
function generateWaveString(coord, index, x, rtl, width, bumps) {
  let string = ''
  let pointString = `C`

  coord.map((point, i) => {
    let comma = index == 2 && i == 2 ? '' : ','
    let xx = rtl ? (index * 3 + i + 1) * x : width - (index * 3 + i + 1) * x

    pointString += `${xx},${point}${comma}`
  })
  string += pointString

  return string
}
function generateYCoords(bumps, orientation, height, orient) {
  let topCoords = []
  let bottomCoords = []
  let lastPoints = []
  let lastAntiPoints = []

  for (let i = 1; i <= bumps; i++) {
    let howFar = i / bumps
    let group = []
    let antiGroup = []

    for (let x = 1; x <= 3; x++) {
      let point
      let antiPoint
      if (orientation != 'middle-2') {
        point = getRandomInt(height * 0.1, height * 0.75)
        antiPoint = orient
      } else {
        point = getRandomInt(height * 0.55, height * 0.95)
        antiPoint = getRandomInt(0, height * 0.45)
      }
      if (x === 1 && i !== 1) {
        point = lastPoints[1] - lastPoints[0] + lastPoints[1]
        antiPoint = lastAntiPoints[1] - lastAntiPoints[0] + lastAntiPoints[1]
        lastPoints = []
        lastAntiPoints = []
      }
      if (x === 2 || x === 3) {
        lastPoints.push(point)
        lastAntiPoints.push(antiPoint)
      }

      group.push(point)
      antiGroup.push(antiPoint)
    }

    topCoords.push(group)
    bottomCoords.push(antiGroup)
    group = []
    antiGroup = []
  }
  return [topCoords, bottomCoords]
}
function generateWaves(
  intensity,
  bumps = 3,
  orientation,
  width = 1600,
  height = 800,
  left,
  right
) {
  let orient = 0
  let x = width / (bumps * 3)

  switch (orientation) {
    case 'top':
      orient = 0
      break
    case 'middle-1' || 'middle-2':
      orient = height / 2
      break
    case 'bottom':
      orient = height
      break
  }

  const [topCoords, bottomCoords] = generateYCoords(
    bumps,
    orientation,
    height,
    orient
  )

  let startInt =
    orientation != 'middle-2'
      ? getRandomInt(0, height * 0.75)
      : getRandomInt(height / 2, height * 0.95)

  let string = `M0,${startInt}`

  topCoords.map((coord, index) => {
    string += generateWaveString(coord, index, x, true, width, bumps)
  })
  for (let f = 0; f < 6 - bumps; f++) {
    string += `C${width}, ${orient},${width}, ${orient},${width}, ${orient}`
  }

  let startInt2 =
    orientation != 'middle-2' ? orient : getRandomInt(height * 0.05, height / 2)

  string += `L${width},${startInt2}`

  bottomCoords.map((coord, index) => {
    string += generateWaveString(coord, index, x, false, width, bumps)
  })

  for (let f = 0; f < 6 - bumps; f++) {
    string += `C${0}, ${orient},${0}, ${orient},${0}, ${orient}`
  }

  string += `L${1440 - (15 - bumps) * 3},${orient}L0,${orient}Z`

  return string
}

export default function WaveBuilder() {
  const [animating, setAnimating] = React.useState(false)
  const [number, setNumber] = React.useState(1)
  const [opacity, setOpacity] = React.useState(0.8)
  const [bumps, setBumps] = React.useState(3)
  const [orientation, setOrientation] = React.useState('top')
  const [intensity, setIntensity] = React.useState(3)
  const [width, setWidth] = React.useState(1600)
  const [height, setHeight] = React.useState(600)
  const [waves, setWaves] = React.useState([
    {
      id: 1,
      saved: false,
      d: generateWaves(intensity, bumps, orientation, width, height),
    },
  ])

  function randomizeWaves() {
    const newWaves = waves.map((wave) =>
      wave.saved
        ? wave
        : {
            ...wave,
            d: generateWaves(intensity, bumps, orientation, width, height),
          }
    )
    return newWaves
  }

  function addWave() {
    const newWaves = [
      ...waves,
      {
        id: waves[waves.length - 1].id + 1,
        d: generateWaves(intensity, bumps, orientation, width, height),
        saved: false,
      },
    ]
    return newWaves
  }

  React.useEffect(() => {
    setWaves(randomizeWaves())
  }, [number, intensity, bumps, orientation])

  let svg = `<svg viewBox="0 0 ${width} ${height}">`
  waves.map((wave) => {
    svg += `
  <path d="${wave.d}" />`
  })
  svg += `
</svg>`

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: '100%' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          id="waves"
          style={{ width: '100%' }}
        >
          <defs>
            <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="50%">
              <motion.stop
                stopColor="#FF7744"
                animate={{
                  stopColor: ['#FF7744', '#4d3e96'],
                }}
                transition={{
                  yoyo: Infinity,
                  ease: 'linear',
                  duration: 8,
                }}
                offset="25%"
              />
              <motion.stop
                stopColor="#BF5FFF"
                animate={{
                  stopColor: ['#BF5FFF', '#FFC6A8', '#FF7744', '#5f41f2'],
                }}
                transition={{
                  yoyo: Infinity,
                  ease: 'linear',
                  duration: 8,
                }}
                offset="50%"
              />
              <motion.stop
                stopColor="#5f41f2"
                animate={{
                  stopColor: ['#5f41f2', '#BF5FFF'],
                }}
                transition={{
                  yoyo: Infinity,
                  ease: 'linear',
                  duration: 8,
                }}
                offset="75%"
              />
              <motion.stop
                stopColor="#D4504C"
                animate={{
                  stopColor: ['#D4504C', '#5f41f2', '#f7d319'],
                }}
                transition={{
                  yoyo: Infinity,
                  ease: 'linear',
                  duration: 8,
                }}
                offset="100%"
              />
            </linearGradient>
          </defs>

          <motion.path
            fill="url(#rainbow)"
            d={waves[0].d}
            animate={{ d: waves[0].d, transition: { duration: 0.5 } }}
            style={{ opacity: opacity }}
          />

          {waves.length > 1 ? (
            <motion.path
              fill="url(#rainbow)"
              animate={{ d: waves[1].d, transition: { duration: 1.8 } }}
              d={waves[0].d}
              style={{ opacity: opacity }}
            />
          ) : (
            ''
          )}
          {waves.length > 2 ? (
            <motion.path
              fill="url(#rainbow)"
              d={waves[0].d}
              animate={{ d: waves[2].d, transition: { duration: 2.1 } }}
              style={{ opacity: opacity }}
            />
          ) : (
            ''
          )}
          {waves.length > 3 ? (
            <motion.path
              fill="url(#rainbow)"
              d={waves[0].d}
              animate={{ d: waves[3].d, transition: { duration: 2.4 } }}
              style={{ opacity: opacity }}
            />
          ) : (
            ''
          )}
          {waves.length > 4 ? (
            <motion.path
              fill="url(#rainbow)"
              animate={{ d: waves[4].d, transition: { duration: 2.7 } }}
              d={waves[0].d}
              style={{ opacity: opacity }}
            />
          ) : (
            ''
          )}
        </svg>

        <div className="wavebuilder-controls">
          {' '}
          <div>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={orientation}
              onChange={(e) => {
                setOrientation(e.target.value)
                console.log(e.target.value)
              }}
            >
              <FormControlLabel
                value="top"
                control={<Radio />}
                label={
                  <svg viewBox="0 0 1440 500">
                    <path
                      fill="url(#rainbow)"
                      d="M0,252C240,312,480,110,720,63,C960,16,1200,64,1440,243,C1440, 0,1440, 0,1440, 0C1440, 0,1440, 0,1440, 0C1440, 0,1440, 0,1440, 0C1440, 0,1440, 0,1440, 0L1440,0C1200,0,960,0,720,0,C480,0,240,0,0,0,C0, 0,0, 0,0, 0C0, 0,0, 0,0, 0C0, 0,0, 0,0, 0C0, 0,0, 0,0, 0L1401,0L0,0Z"
                    />
                  </svg>
                }
              />

              <FormControlLabel
                value="middle-1"
                control={<Radio />}
                label={
                  <svg viewBox="0 0 1440 500">
                    <path
                      fill="url(#rainbow)"
                      d="M0,243C160,117,320,79,480,356,C640,633,800,158,960,115,C1120,72,1280,184,1440,216C1440, 250,1440, 250,1440, 250C1440, 250,1440, 250,1440, 250C1440, 250,1440, 250,1440, 250L1440,250C1280,250,1120,250,960,250,C800,250,640,250,480,250,C320,250,160,250,0,250C0, 250,0, 250,0, 250C0, 250,0, 250,0, 250C0, 250,0, 250,0, 250L1404,250L0,250Z"
                    />
                  </svg>
                }
              />
              <FormControlLabel
                value="middle-2"
                control={<Radio />}
                label={
                  <svg viewBox="0 0 1440 500">
                    <path
                      fill="url(#rainbow)"
                      d="M0,448C240,287,480,280,720,338,C960,396,1200,389,1440,339,C1440, 0,1440, 0,1440, 0C1440, 0,1440, 0,1440, 0C1440, 0,1440, 0,1440, 0C1440, 0,1440, 0,1440, 0L1440,199C1200,63,960,18,720,180,C480,342,240,145,0,40,C0, 0,0, 0,0, 0C0, 0,0, 0,0, 0C0, 0,0, 0,0, 0C0, 0,0, 0,0, 0L1401,0L0,0Z"
                    />
                  </svg>
                }
              />
              <FormControlLabel
                value="bottom"
                control={<Radio />}
                label={
                  <svg viewBox="0 0 1440 500">
                    <path
                      fill="url(#rainbow)"
                      d="M0,291C240,308,480,109,720,325,C960,541,1200,228,1440,238,C1440, 500,1440, 500,1440, 500C1440, 500,1440, 500,1440, 500C1440, 500,1440, 500,1440, 500C1440, 500,1440, 500,1440, 500L1440,500C1200,500,960,500,720,500,C480,500,240,500,0,500,C0, 500,0, 500,0, 500C0, 500,0, 500,0, 500C0, 500,0, 500,0, 500C0, 500,0, 500,0, 500L1401,500L0,500Z"
                    />
                  </svg>
                }
              />
            </RadioGroup>
          </div>
          <div className="slider-container">
            <svg
              viewBox="0 0 1440 500"
              style={{ width: 30, fill: 'transparent' }}
            >
              <path
                stroke="#aaa"
                strokeWidth="100px"
                d="M0,356C96,151,192,251,288,128,C384,5,480,81,576,330,C672,579,768,125,864,290C960,455,1056,96,1152,228,C1248,360,1344,273,1440,195"
              />
            </svg>
            <Slider
              defaultValue={3}
              aria-labelledby="discrete-slider"
              step={1}
              orientation="vertical"
              min={1}
              max={5}
              color="secondary"
              onChange={(e, v) => setBumps(v)}
            />{' '}
            <svg
              viewBox="0 0 1440 500"
              style={{ width: 30, fill: 'transparent' }}
            >
              <path
                stroke="#aaa"
                strokeWidth="100px"
                d="M0,117C480,226,960,74,1440,130"
              />
            </svg>
          </div>
          <div className="slider-container opacity">
            <svg viewBox="0 0 8 8">
              <circle fill="#ccc" cx="4" cy="4" r="4" />
            </svg>
            <Slider
              defaultValue={0.8}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={0.1}
              orientation="vertical"
              min={0.05}
              max={1}
              color="secondary"
              onChange={(e, v) => setOpacity(v)}
            />
            <svg viewBox="0 0 12 12">
              <circle
                opacity=".5"
                fill="transparent"
                stroke="#ccc"
                strokeWidth="2px"
                cx="6"
                cy="6"
                r="5"
              />
            </svg>
          </div>
          <div className={`wave-icons-container`}>
            <h5>Waves</h5>
            {waves.map((wave, index) => {
              return (
                <div key={`waveicon-${index}`}>
                  <svg
                    viewBox={`0 0 ${width} ${height}`}
                    style={{ width: '100%' }}
                  >
                    <motion.path
                      fill="url(#rainbow)"
                      d={wave.d}
                      animate={{ d: wave.d, transition: { duration: 0.5 } }}
                    />
                  </svg>
                </div>
              )
            })}
            {waves.length < 6 ? (
              <div style={{ padding: '10px', textAlign: 'center' }}>
                <IconButton aria-label="edit">
                  <BiAddToQueue
                    style={{ fontSize: 40 }}
                    onClick={(e) => setWaves(addWave())}
                  />
                </IconButton>
              </div>
            ) : (
              ''
            )}
          </div>
          {/* <div>
            <Checkbox
              checked={animating ? true : false}
              onChange={(e) => setAnimating((old) => !old)}
              name="checkedA"
              style={{ paddingTop: 0, paddingBottom: 5, paddingLeft: 0 }}
            />
            <h5>Animate</h5>
          </div> */}
          <Fab color="secondary" aria-label="edit">
            <GiPerspectiveDiceSixFacesThree
              style={{ fontSize: 40 }}
              onClick={(e) => setWaves(randomizeWaves())}
            />
          </Fab>
        </div>
      </div>
      <div style={{ width: 800, margin: '0 auto', maxWidth: '90%' }}>
        <SyntaxHighlighter language="xml" style={dracula} wrapLines={true}>
          {svg}
        </SyntaxHighlighter>
      </div>
    </ThemeProvider>
  )
}
