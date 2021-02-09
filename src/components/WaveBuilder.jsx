import React from 'react'
import { Link } from 'gatsby'
import { motion, useAnimation } from 'framer-motion'
import Slider from '@material-ui/core/Slider'
import Fab from '@material-ui/core/Fab'
import { GiPerspectiveDiceSixFacesThree } from 'react-icons/gi'
import { BiAddToQueue } from 'react-icons/bi'
import { IoIosSave } from 'react-icons/io'
import { IoIosTrash } from 'react-icons/io'
import { GiConvergenceTarget } from 'react-icons/gi'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import FilledInput from '@material-ui/core/FilledInput'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import SyntaxHighlighter from 'react-syntax-highlighter'
import Layout from '../components/layout'
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
  let x = Math.ceil(width / (bumps * 3))

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
  const [orientation, setOrientation] = React.useState('middle-1')
  const [intensity, setIntensity] = React.useState(3)
  const [width, setWidth] = React.useState(1300)
  const [height, setHeight] = React.useState(600)
  const [isolatedIndex, setIsolatedIndex] = React.useState(-1)
  const [waves, setWaves] = React.useState([
    {
      id: 1,
      saved: false,
      d: generateWaves(intensity, bumps, orientation, width, height),
      opacity: 0.7,
    },
  ])
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  function randomizeWave() {
    setWaves((oldWaves) => {
      return oldWaves.map((wave, index) => {
        return selectedIndex == index
          ? {
              ...wave,
              d: generateWaves(intensity, bumps, orientation, width, height),
            }
          : wave
      })
    })
  }

  function deleteWave(id) {
    const newWaves = waves.filter((wave, index) => {
      if (wave.id == id && index == selectedIndex) {
        setSelectedIndex(waves.length - 2)
      }
      if (wave.id == id && index == isolatedIndex) {
        setIsolatedIndex(-1)
      }
      return wave.id != id
    })
    setWaves(newWaves)

    setSelectedIndex(0)
  }

  function updateOpacity(v) {
    setWaves((oldWaves) => {
      return oldWaves.map((wave, index) => {
        return index == selectedIndex
          ? {
              ...wave,
              opacity: v,
            }
          : wave
      })
    })
    setOpacity(v)
  }

  function addWave() {
    setWaves((oldWaves) => [
      ...oldWaves,
      {
        id: waves[waves.length - 1].id + 1,
        d: generateWaves(intensity, bumps, orientation, width, height),
        opacity: opacity,
      },
    ])
    setSelectedIndex(waves.length)
  }

  React.useEffect(() => {
    randomizeWave()
  }, [number, intensity, bumps, orientation])

  let svg = `<svg viewBox="0 0 ${width} ${height}">`

  waves.length > 0
    ? waves.map((wave) => {
        svg += `
  <path opacity="${wave.opacity}" d="${wave.d}" />`
      })
    : ''
  svg += `
</svg>`

  return (
    <Layout>
      <div style={{ maxWidth: '100%' }}>
        <ThemeProvider theme={theme}>
          <div style={{ width: '100%' }}>
            <div
              style={{ background: '#222', position: 'relative', zIndex: 1 }}
            >
              <div className="checkered-bg">
                <svg
                  viewBox={`0 0 ${width} ${height}`}
                  id="waves"
                  style={{
                    width: '100%',
                    minWidth: '100%',
                    zIndex: 2,
                    position: 'relative',
                    display: 'flex',
                  }}
                >
                  <defs>
                    <linearGradient
                      id="rainbow"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="50%"
                    >
                      <motion.stop
                        stopColor="#FF7744"
                        animate={{
                          stopColor: ['#FF7744', '#4d3e96'],
                        }}
                        transition={{
                          repeat: Infinity,
                          ease: 'linear',
                          duration: 8,
                        }}
                        offset="25%"
                      />
                      <motion.stop
                        stopColor="#BF5FFF"
                        animate={{
                          stopColor: [
                            '#BF5FFF',
                            '#FFC6A8',
                            '#FF7744',
                            '#5f41f2',
                          ],
                        }}
                        transition={{
                          repeat: Infinity,
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
                          repeat: Infinity,
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
                          repeat: Infinity,
                          ease: 'linear',
                          duration: 8,
                        }}
                        offset="100%"
                      />
                    </linearGradient>
                  </defs>

                  <motion.path
                    fill="url(#rainbow)"
                    className={
                      isolatedIndex != -1 && isolatedIndex != 0
                        ? 'notIsolated'
                        : ''
                    }
                    d={waves[0].d}
                    animate={{ d: waves[0].d, transition: { duration: 0.5 } }}
                    style={{ opacity: waves[0].opacity }}
                  />

                  {waves.length > 1 ? (
                    <motion.path
                      fill="url(#rainbow)"
                      className={
                        isolatedIndex != -1 && isolatedIndex != 1
                          ? 'notIsolated'
                          : ''
                      }
                      animate={{ d: waves[1].d, transition: { duration: 0.5 } }}
                      d={waves[0].d}
                      style={{ opacity: waves[1].opacity }}
                    />
                  ) : (
                    ''
                  )}
                  {waves.length > 2 ? (
                    <motion.path
                      fill="url(#rainbow)"
                      className={
                        isolatedIndex != -1 && isolatedIndex != 2
                          ? 'notIsolated'
                          : ''
                      }
                      d={waves[0].d}
                      animate={{ d: waves[2].d, transition: { duration: 0.5 } }}
                      style={{ opacity: waves[2].opacity }}
                    />
                  ) : (
                    ''
                  )}
                  {waves.length > 3 ? (
                    <motion.path
                      fill="url(#rainbow)"
                      className={
                        isolatedIndex != -1 && isolatedIndex != 3
                          ? 'notIsolated'
                          : ''
                      }
                      d={waves[0].d}
                      animate={{ d: waves[3].d, transition: { duration: 0.5 } }}
                      style={{ opacity: waves[3].opacity }}
                    />
                  ) : (
                    ''
                  )}
                  {waves.length > 4 ? (
                    <motion.path
                      fill="url(#rainbow)"
                      className={
                        isolatedIndex != -1 && isolatedIndex != 4
                          ? 'notIsolated'
                          : ''
                      }
                      animate={{ d: waves[4].d, transition: { duration: 0.5 } }}
                      d={waves[0].d}
                      style={{ opacity: waves[4].opacity }}
                    />
                  ) : (
                    ''
                  )}
                  {waves.length > 5 ? (
                    <motion.path
                      fill="url(#rainbow)"
                      className={
                        isolatedIndex != -1 && isolatedIndex != 5
                          ? 'notIsolated'
                          : ''
                      }
                      animate={{ d: waves[5].d, transition: { duration: 0.5 } }}
                      d={waves[0].d}
                      style={{ opacity: waves[5].opacity }}
                    />
                  ) : (
                    ''
                  )}
                </svg>
              </div>
            </div>
            <div className="wavebuilder-controls">
              {' '}
              <div className="wavestyle">
                <RadioGroup
                  aria-label="wave style"
                  name="orientation"
                  value={orientation}
                  onChange={(e) => {
                    setOrientation(e.target.value)
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
                  style={{ width: '100%', fill: 'transparent' }}
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
                  style={{ width: '100%', fill: 'transparent' }}
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
                  value={waves[selectedIndex].opacity}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={0.1}
                  orientation="vertical"
                  min={0.05}
                  max={1}
                  color="secondary"
                  onChange={(e, v) => updateOpacity(v)}
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
                    <div
                      key={`waveicon-${index}`}
                      className={
                        selectedIndex == index ? 'active waveicon' : ' waveicon'
                      }
                    >
                      <svg
                        viewBox={`0 0 ${width} ${height}`}
                        style={{ width: '100%' }}
                        onClick={(e) => {
                          setSelectedIndex(index)
                          setIsolatedIndex(-1)
                        }}
                      >
                        <motion.path
                          fill="url(#rainbow)"
                          d={wave.d}
                          animate={{
                            d: wave.d,
                            transition: { duration: 0.5 },
                          }}
                          style={{
                            opacity: wave.opacity,
                          }}
                        />
                      </svg>
                      {waves.length > 1 ? (
                        <div className="save-button">
                          <IconButton
                            color="secondary"
                            aria-label="delete"
                            onClick={(e) => {
                              setIsolatedIndex(
                                index == isolatedIndex ? -1 : index
                              )
                            }}
                            className={
                              isolatedIndex == index
                                ? 'alternate active'
                                : 'alternate'
                            }
                          >
                            <GiConvergenceTarget style={{ fontSize: 40 }} />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            aria-label="delete"
                            onClick={(e) => deleteWave(wave.id)}
                          >
                            <IoIosTrash style={{ fontSize: 40 }} />
                          </IconButton>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  )
                })}
                {waves.length < 6 ? (
                  <div className="">
                    <IconButton
                      color="secondary"
                      aria-label="edit"
                      onClick={(e) => addWave()}
                      className="add-button"
                    >
                      <BiAddToQueue style={{ fontSize: 40 }} />
                    </IconButton>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div
                style={{ width: 100, marginLeft: 20 }}
                className="wave-dimensions-controls"
              >
                <FormControl>
                  <Input
                    id="standard-adornment-weight"
                    value={width}
                    color={`secondary`}
                    disabled
                    onBlur={(e) => {
                      e.target.value != width ? setWidth(e.target.value) : ''
                    }}
                    endAdornment={
                      <InputAdornment position="end">px</InputAdornment>
                    }
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      'aria-label': 'width',
                    }}
                    size="small"
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Width
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <Input
                    id="standard-adornment-weight"
                    value={height}
                    color={`secondary`}
                    size="small"
                    onChange={(e) => {
                      e.target.value != height ? setHeight(e.target.value) : ''
                    }}
                    endAdornment={
                      <InputAdornment position="end">px</InputAdornment>
                    }
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      'aria-label': 'height',
                    }}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Height
                  </FormHelperText>
                </FormControl>
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
                  onClick={(e) => randomizeWave()}
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
      </div>
    </Layout>
  )
}
