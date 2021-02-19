import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import Slider from '@material-ui/core/Slider'
import Fab from '@material-ui/core/Fab'
import { GiPerspectiveDiceSixFacesThree } from 'react-icons/gi'
import { BiAddToQueue } from 'react-icons/bi'
import { IoIosSave } from 'react-icons/io'
import { AiFillDelete } from 'react-icons/ai'
import { MdPhotoSizeSelectLarge } from 'react-icons/md'
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
import ColorPicker from 'material-ui-color-picker'
import Layout from '../components/layout'
import { generateWaves } from '../utils/generateWave'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import {
  materialDark,
  dracula,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

function wavesReducer(state, action) {
  switch (action.type) {
    case 'updateWave':
      return state.map((wave, index) => {
        return action.selectedIndex != index
          ? wave
          : { ...wave, [action.name]: action.payload }
      })
    case 'updateWaveWithRandomize':
      return state.map((wave, index) => {
        return action.selectedIndex != index
          ? wave
          : {
              ...wave,
              [action.name]: action.payload,
              d: generateWaves(
                action.name == 'bumps' ? action.payload : wave.bumps,
                action.name == 'orientation'
                  ? action.payload
                  : wave.orientation,
                action.width,
                action.height
              ),
            }
      })

    case 'randomize':
      return state.map((wave, index) => {
        return action.selectedIndex != index
          ? wave
          : {
              ...wave,
              d: generateWaves(
                wave.bumps,
                wave.orientation,
                action.width,
                action.height
              ),
            }
      })
    case 'addWave':
      return [
        ...state,
        {
          id: state[state.length - 1].id + 1,
          d: generateWaves(
            state[action.selectedIndex].bumps,
            state[action.selectedIndex].orientation,
            action.width,
            action.height
          ),
          opacity: state[action.selectedIndex].opacity,
          fill: 'url(#rainbow)',
          bumps: state[action.selectedIndex].bumps,
          orientation: state[action.selectedIndex].orientation,
        },
      ]
    case 'deleteWave':
      return state.filter((wave, index) => {
        return wave.id != action.payload
      })

    default:
      throw new Error()
  }
}

export default function WaveBuilder() {
  const [waves, dispatchWaves] = React.useReducer(wavesReducer, [
    {
      id: 1,
      d: generateWaves(2, 'middle-1', width, height),
      opacity: 0.7,
      fill: 'url(#rainbow)',
      bumps: 2,
      orientation: 'middle-1',
    },
  ])
  const [width, setWidth] = React.useState(1600)
  const [height, setHeight] = React.useState(900)
  const [isolatedIndex, setIsolatedIndex] = React.useState(-1)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const controls = useAnimation()

  // controls.start({ rotate: 15, scale: 1.1 })
  // setTimeout(() => {
  //   controls.start({ rotate: 0, scale: 1.0 })
  // }, 200)

  //
  //  SVG string for the output
  ///////////////////////////////////

  let svg = `<svg view-box="0 0 ${width} ${height}">`

  waves.length > 0
    ? waves.map((wave) => {
        svg += `
  <path fill="${
    wave.fill == 'url(#rainbow)' ? '#40e0d0' : wave.fill
  }" opacity="${wave.opacity}" d="${wave.d}" />`
      })
    : ''
  svg += `
</svg>`
  if (typeof window === `undefined`) {
    return <></>
  }

  return (
    <div style={{ maxWidth: '100%', width: '100%' }}>
      <div style={{ width: '100%' }}>
        <div className="logo-container-makewaves">
          <svg
            viewBox="0 0 1300 700"
            style={{ width: 60, transform: 'scaleY(3) rotate(180deg)' }}
          >
            <path
              fill="url(#rainbow)"
              opacity="1"
              d="M0,96C145,350,290,516,435,495,C580,474,725,121,870,325,C1015,529,1160,504,1305,170C1300, 350,1300, 350,1300, 350C1300, 350,1300, 350,1300, 350C1300, 350,1300, 350,1300, 350L1300,350C1155,350,1010,350,865,350,C720,350,575,350,430,350,C285,350,140,350,-5,350C0, 350,0, 350,0, 350C0, 350,0, 350,0, 350C0, 350,0, 350,0, 350L1404,350L0,350Z"
            />
          </svg>
          <h2 style={{ marginRight: 8, marginLeft: 3 }}>ake</h2>{' '}
          <svg viewBox="0 0 1300 700" style={{ width: 60 }}>
            <path
              fill="url(#rainbow)"
              opacity="1"
              d="M0,96C145,350,290,516,435,495,C580,474,725,121,870,325,C1015,529,1160,504,1305,170C1300, 350,1300, 350,1300, 350C1300, 350,1300, 350,1300, 350C1300, 350,1300, 350,1300, 350L1300,350C1155,350,1010,350,865,350,C720,350,575,350,430,350,C285,350,140,350,-5,350C0, 350,0, 350,0, 350C0, 350,0, 350,0, 350C0, 350,0, 350,0, 350L1404,350L0,350Z"
            />
          </svg>
          <h2 style={{ marginLeft: 4 }}>aves</h2>
        </div>
        <p
          style={{
            textAlign: 'center',
            color: '#ddd',
            fontSize: 13,
            marginTop: -20,
            paddingBottom: 20,
            zIndex: 5,
            position: 'relative',
          }}
        >
          SVG wave generation and composition
        </p>
        <div style={{ background: '#222', position: 'relative', zIndex: 1 }}>
          <div
            className="checkered-bg"
            style={{
              minHeight: `${
                window.innerWidth > 830
                  ? (830 * height) / width
                  : (window.innerWidth * height) / width
              }px`,
            }}
          >
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
              <motion.path
                fill="url(#rainbow)"
                className={
                  isolatedIndex != -1 && isolatedIndex != 0 ? 'notIsolated' : ''
                }
                d={waves[0].d}
                animate={{
                  d: waves[0].d,
                  fill: waves[0].fill,
                }}
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
                  animate={{
                    d: waves[1].d,
                    fill: waves[1].fill,
                  }}
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
                  animate={{ d: waves[2].d, fill: waves[2].fill }}
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
                  animate={{ d: waves[3].d, fill: waves[3].fill }}
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
                  animate={{ d: waves[4].d, fill: waves[4].fill }}
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
                  animate={{ d: waves[5].d, fill: waves[5].fill }}
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
              value={waves[selectedIndex].orientation}
              onChange={(e) => {
                dispatchWaves({
                  payload: e.target.value,
                  type: 'updateWaveWithRandomize',
                  selectedIndex: selectedIndex,
                  height: height,
                  width: width,
                  name: 'orientation',
                })
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
              value={waves[selectedIndex].bumps}
              aria-labelledby="discrete-slider"
              step={1}
              orientation="vertical"
              min={1}
              max={5}
              color="secondary"
              onChange={(e, v) =>
                v != waves[selectedIndex].bumps
                  ? dispatchWaves({
                      payload: v,
                      type: 'updateWaveWithRandomize',
                      selectedIndex: selectedIndex,
                      height: height,
                      width: width,
                      name: 'bumps',
                    })
                  : null
              }
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
              min={0.1}
              max={1}
              color="secondary"
              onChange={(e, v) =>
                v != waves[selectedIndex].opacity
                  ? dispatchWaves({
                      payload: v,
                      type: 'updateWave',
                      selectedIndex: selectedIndex,
                      height: height,
                      width: width,
                      name: 'opacity',
                    })
                  : null
              }
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
          <div>
            <div
              style={{
                width: 100,
                marginLeft: 20,

                flexDirection: 'row',
                marginBottom: 30,
                overflow: 'visible',
              }}
              className="color-picker-r"
            >
              <ColorPicker
                name="color"
                color="secondary"
                value={waves[selectedIndex].fill}
                placeholder={waves[selectedIndex].fill}
                onChange={(color) =>
                  dispatchWaves({
                    payload: color,
                    type: 'updateWave',
                    selectedIndex: selectedIndex,
                    height: height,
                    width: width,
                    name: 'fill',
                  })
                }
                onKeyDown={(e) => {
                  e.preventDefault()
                  return false
                }}
              />
              <FormHelperText
                id="standard-weight-helper-text"
                style={{ whiteSpace: 'nowrap' }}
              >
                Wave Color
              </FormHelperText>
            </div>

            <div
              style={{
                width: 100,
                marginLeft: 20,
                display: 'flex',
                flexDirection: 'row',
              }}
              className="wave-dimensions-controls"
            >
              <FormControl style={{ width: '50%' }}>
                <Input
                  id="standard-adornment-weight"
                  value={width / 100}
                  color={`secondary`}
                  disabled
                  onChange={(e) => {
                    e.target.value != width / 100
                      ? setWidth(e.target.value * 100)
                      : ''
                  }}
                  aria-describedby="standard-weight-helper-text"
                  inputProps={{
                    'aria-label': 'width',
                  }}
                  size="small"
                />
                <FormHelperText
                  id="standard-weight-helper-text"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Aspect Ratio
                </FormHelperText>
              </FormControl>
              :
              <FormControl style={{ width: '50%' }}>
                <Input
                  id="standard-adornment-weight"
                  value={height / 100}
                  color={`secondary`}
                  size="small"
                  onChange={(e) => {
                    e.target.value != height / 100
                      ? setHeight(e.target.value * 100)
                      : ''
                  }}
                  aria-describedby="standard-weight-helper-text"
                  inputProps={{
                    'aria-label': 'height',
                  }}
                />
              </FormControl>
            </div>
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
                      fill={wave.fill}
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
                          setIsolatedIndex(index == isolatedIndex ? -1 : index)
                        }}
                        className={
                          isolatedIndex == index
                            ? 'alternate active'
                            : 'alternate'
                        }
                      >
                        <MdPhotoSizeSelectLarge />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="delete"
                        onClick={(e) => {
                          dispatchWaves({
                            payload: wave.id,
                            type: 'deleteWave',
                            selectedIndex: selectedIndex,
                            height: height,
                            width: width,
                          })
                          setSelectedIndex(0)
                          setIsolatedIndex(-1)
                        }}
                      >
                        <AiFillDelete />
                      </IconButton>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )
            })}
            {waves.length < 6 ? (
              <div className="add-container">
                <IconButton
                  color="secondary"
                  aria-label="edit"
                  onClick={(e) =>
                    dispatchWaves({
                      type: 'addWave',
                      selectedIndex: selectedIndex,
                      height: height,
                      width: width,
                    })
                  }
                  className="add-button"
                >
                  <BiAddToQueue style={{ fontSize: 40 }} />
                </IconButton>
              </div>
            ) : (
              ''
            )}
          </div>
          <Fab
            color="secondary"
            aria-label="edit"
            onClick={(e) =>
              dispatchWaves({
                type: 'randomize',
                selectedIndex: selectedIndex,
                height: height,
                width: width,
              })
            }
          >
            <motion.span
              initial={{ rotate: 0, scale: 1.0 }}
              animate={controls}
              style={{ height: 40, width: 40, display: 'block' }}
            >
              <GiPerspectiveDiceSixFacesThree style={{ fontSize: 40 }} />
            </motion.span>
          </Fab>
        </div>
      </div>
      <div style={{ width: 800, margin: '0 auto', maxWidth: '90%' }}>
        <SyntaxHighlighter language="xml" style={dracula} wrapLines={true}>
          {svg}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
