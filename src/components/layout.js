import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import Profile from './Profile'
import cosmicjsLogo from '../../static/cosmicjs.svg'
import gatsbyLogo from '../../static/gatsby.png'
import { rhythm, scale } from '../utils/typography'
import { motion, useAnimation } from 'framer-motion'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import Waves from './Waves'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    secondary: {
      main: '#8a2be2',
    },
  },
})

const clip_path_variants = {
  open: (i) => ({
    pathLength: 1,
    transition: {
      duration: 0.7 + i,
      delay: 1 - i,
    },
    opacity: [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
    ],
  }),
  closed: (i) => ({
    pathLength: 0,
    opacity: 0,
  }),
}

const bg_variants = {
  start: {
    d:
      'M 0 0 L 0 500 Q 150 550 200 450 Q 300 200 450 350 C 600 400 600 100 800 250 L 800 0',
  },
  finish: {
    d:
      'M 0 0 L 0 500 Q 100 400 200 450 Q 400 600 550 450 C 650 300 600 100 800 150 L 800 0',
  },
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
const waves = [
  'M0,160L30,149.3C60,139,120,117,180,128C240,139,300,181,360,176C420,171,480,117,540,106.7C600,96,660,128,720,154.7C780,181,840,203,900,197.3C960,192,1020,160,1080,138.7C1140,117,1200,107,1260,96C1320,85,1380,75,1410,69.3L1440,64L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z',
  'M0,160L30,181.3C60,203,120,245,180,261.3C240,277,300,267,360,234.7C420,203,480,149,540,149.3C600,149,660,203,720,224C780,245,840,235,900,224C960,213,1020,203,1080,165.3C1140,128,1200,64,1260,48C1320,32,1380,64,1410,80L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z',
  'M0,256L30,261.3C60,267,120,277,180,277.3C240,277,300,267,360,250.7C420,235,480,213,540,218.7C600,224,660,256,720,245.3C780,235,840,181,900,154.7C960,128,1020,128,1080,149.3C1140,171,1200,213,1260,202.7C1320,192,1380,128,1410,96L1440,64L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z',
  'M0,224L30,234.7C60,245,120,267,180,256C240,245,300,203,360,176C420,149,480,139,540,138.7C600,139,660,149,720,165.3C780,181,840,203,900,176C960,149,1020,75,1080,69.3C1140,64,1200,128,1260,154.7C1320,181,1380,171,1410,165.3L1440,160L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z',
  'M0,224L30,218.7C60,213,120,203,180,213.3C240,224,300,256,360,229.3C420,203,480,117,540,106.7C600,96,660,160,720,186.7C780,213,840,203,900,218.7C960,235,1020,277,1080,250.7C1140,224,1200,128,1260,74.7C1320,21,1380,11,1410,5.3L1440,0L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z',
  'M0,192L30,197.3C60,203,120,213,180,224C240,235,300,245,360,234.7C420,224,480,192,540,202.7C600,213,660,267,720,277.3C780,288,840,256,900,240C960,224,1020,224,1080,208C1140,192,1200,160,1260,154.7C1320,149,1380,171,1410,181.3L1440,192L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z',
]

export default ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        cosmicjsSettings(slug: { eq: "general" }) {
          metadata {
            site_heading
            homepage_hero {
              local {
                childImageSharp {
                  fluid(quality: 90, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const siteTitle = data.cosmicjsSettings.metadata.site_heading
      const homgePageHero =
        data.cosmicjsSettings.metadata.homepage_hero.local.childImageSharp.fluid
      let header

      const [profile, setProfile] = React.useState(false)

      const animation1 = useAnimation()
      const animation2 = useAnimation()

      let rootPath = `/`
      let postsPath = `/posts`
      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
        rootPath = __PATH_PREFIX__ + `/`
        postsPath = __PATH_PREFIX__ + `/posts`
      }
      let roote = false

      if (location.pathname === rootPath) {
        roote = true
      }

      header = (
        <>
          <div
            className={profile ? `profile-container open` : 'profile-container'}
          >
            <Profile profile={profile} />
          </div>
          <div className={profile ? `background open` : 'background'}></div>
          <h1
            style={{
              ...scale(1.3),
              textAlign: 'center',

              color: '#333',

              maxWidth: '100%',
              overflow: 'hidden',
              zIndex: 6,
              position: 'relative',
            }}
            className="logo"
          >
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit',
                paddingTop: 5,
              }}
              to={'/'}
            >
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="436.887px"
                height="47.59px"
                viewBox="0 0 436.887 47.59"
                enableBackground="new 0 0 436.887 47.59"
                style={{ maxWidth: 'calc(50vw - 30px)' }}
              >
                {' '}
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
                        repeatType: 'reverse',
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
                        repeat: Infinity,
                        ease: 'linear',
                        duration: 8,
                        repeatType: 'reverse',
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
                        repeatType: 'reverse',
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
                        repeatType: 'reverse',
                      }}
                      offset="100%"
                    />
                  </linearGradient>
                </defs>
                <g strokeWidth="2">
                  <motion.path
                    fill="none"
                    stroke="#eee"
                    strokeMiterlimit="10"
                    d="M28.688,45.357V29.684H14.156v15.674H1.5V3.346
		h12.656v15.557h14.531V3.346h12.656v42.012H28.688z"
                    variants={clip_path_variants}
                    initial={'open'}
                    animate={'open'}
                    custom={0.3}
                  />
                  <motion.path
                    fill="none"
                    stroke="#eee"
                    strokeMiterlimit="10"
                    d="M52.635,45.357V3.346h26.162v9.902H65.291v6.123
		h12.686v9.902H65.291v6.182h14.473v9.902H52.635z"
                    variants={clip_path_variants}
                    initial={'open'}
                    animate={'open'}
                    custom={0.1}
                  />
                  <motion.path
                    fill="none"
                    stroke="#eee"
                    strokeMiterlimit="10"
                    d="M115.078,45.357l-1.846-7.734h-12.539l-1.992,7.734
		H85.02L99.492,3.346h15.703l13.623,42.012H115.078z M107.109,12.486h-0.293c-0.04,0.469-0.176,1.241-0.41,2.314
		c-0.234,1.074-1.417,5.684-3.545,13.828h8.027l-2.93-11.426C107.549,15.523,107.266,13.951,107.109,12.486z"
                    variants={clip_path_variants}
                    initial={'open'}
                    animate={'open'}
                    custom={0.7}
                  />
                  <motion.path
                    fill="none"
                    stroke="#eee"
                    strokeMiterlimit="10"
                    d="M176.35,23.824c0,4.258-0.894,8.023-2.681,11.294
		c-1.787,3.271-4.341,5.796-7.661,7.573c-3.321,1.777-7.148,2.666-11.484,2.666H136.74V3.346h17.402
		C168.947,3.346,176.35,10.172,176.35,23.824z M162.902,23.941c0-2.051-0.415-3.896-1.245-5.537c-0.831-1.641-2.017-2.91-3.56-3.809
		c-1.543-0.898-3.359-1.348-5.449-1.348h-3.252v22.207h3.545c3.027,0,5.444-1.04,7.251-3.12
		C161.999,30.255,162.902,27.457,162.902,23.941z"
                    variants={clip_path_variants}
                    initial={'open'}
                    animate={'open'}
                    custom={0}
                  />
                  <motion.path
                    fill="none"
                    stroke="#eee"
                    strokeMiterlimit="10"
                    d="M221.156,32.467c0,4.121-1.446,7.3-4.336,9.536
		c-2.891,2.237-7.021,3.354-12.393,3.354h-19.16V3.346h17.842c11.152,0,16.729,3.389,16.729,10.166c0,1.465-0.352,2.808-1.055,4.028
		c-0.703,1.221-1.772,2.29-3.208,3.208c-1.436,0.918-3.013,1.543-4.731,1.875v0.117c1.992,0.234,3.779,0.825,5.361,1.772
		c1.582,0.948,2.802,2.129,3.662,3.545C220.727,29.474,221.156,30.943,221.156,32.467z M206.391,15.709
		c0-2.597-2.041-3.896-6.123-3.896h-2.344v7.939h3.662c1.406,0,2.559-0.376,3.457-1.128C205.941,17.873,206.391,16.9,206.391,15.709
		z M207.709,32.408c0-1.211-0.439-2.207-1.318-2.988c-0.879-0.781-2.041-1.172-3.486-1.172h-4.98v8.584h4.219
		c1.718,0,3.076-0.396,4.072-1.187S207.709,33.775,207.709,32.408z"
                    variants={clip_path_variants}
                    initial={'open'}
                    animate={'open'}
                    custom={0.2}
                  />
                  <motion.path
                    fill="none"
                    stroke="#eee"
                    strokeMiterlimit="10"
                    d="M266.344,26.168c0,6.738-1.538,11.744-4.614,15.015
		c-3.076,3.271-7.817,4.907-14.224,4.907c-5.977,0-10.513-1.636-13.608-4.907c-3.096-3.271-4.644-8.198-4.644-14.78V3.346h12.715
		v23.525c0,2.695,0.503,4.771,1.509,6.226c1.006,1.455,2.446,2.183,4.321,2.183c1.895,0,3.335-0.684,4.321-2.051
		c0.986-1.367,1.479-3.388,1.479-6.064V3.346h12.744V26.168z"
                    variants={clip_path_variants}
                    initial={'open'}
                    animate={'open'}
                    custom={0.5}
                  />
                  <motion.path
                    fill="none"
                    stroke="#eee"
                    strokeMiterlimit="10"
                    d="M298.377,13.248v32.109h-12.715V13.248h-11.748
		V3.346h36.357v9.902H298.377z"
                    variants={clip_path_variants}
                    initial={'open'}
                    animate={'open'}
                    custom={0.7}
                  />
                  <motion.path
                    fill="none"
                    stroke="#eee"
                    strokeMiterlimit="10"
                    d="M339.551,13.248v32.109h-12.715V13.248h-11.748
		V3.346h36.357v9.902H339.551z"
                    variants={clip_path_variants}
                    initial={'open'}
                    animate={'open'}
                    custom={0}
                  />
                  <motion.path
                    fill="url(#rainbow)"
                    stroke="url(#rainbow)"
                    strokeWidth="3px"
                    strokeMiterlimit="10"
                    d="M371.906,40.143c0,1.777-0.625,3.213-1.875,4.307
		s-2.979,1.641-5.186,1.641c-2.012,0-3.657-0.571-4.937-1.714s-1.919-2.553-1.919-4.233c0-1.718,0.63-3.11,1.89-4.175
		c1.26-1.064,2.954-1.597,5.083-1.597c2.07,0,3.745,0.532,5.024,1.597C371.267,37.033,371.906,38.424,371.906,40.143z"
                    variants={clip_path_variants}
                    initial={'open'}
                    animate={'open'}
                    custom={1}
                  />
                  <motion.path
                    fill="none"
                    stroke="#eee"
                    strokeMiterlimit="10"
                    d="M380.531,45.357v-30h12.48v30H380.531z"
                    variants={clip_path_variants}
                    initial={roote ? 'closed' : 'open'}
                    animate={'open'}
                    custom={0.5}
                  />
                  <motion.path
                    fill="none"
                    stroke="#eee"
                    strokeMiterlimit="10"
                    d="M435.387,29.83c0,5.059-1.528,9.034-4.585,11.924
		c-3.057,2.891-7.329,4.336-12.817,4.336c-5.449,0-9.692-1.411-12.729-4.233c-3.037-2.822-4.556-6.713-4.556-11.675
		c0-3.183,0.713-5.947,2.139-8.291s3.457-4.141,6.094-5.391c2.637-1.25,5.674-1.875,9.111-1.875c3.555,0,6.636,0.655,9.243,1.963
		c2.607,1.309,4.609,3.125,6.006,5.449C434.688,24.362,435.387,26.959,435.387,29.83z M422.73,29.889
		c0-4.082-1.563-6.123-4.688-6.123s-4.688,2.139-4.688,6.416c0,4.512,1.582,6.768,4.746,6.768
		C421.188,36.949,422.73,34.596,422.73,29.889z"
                    variants={clip_path_variants}
                    initial={roote ? 'closed' : 'open'}
                    animate={'open'}
                    custom={0}
                  />
                </g>
              </svg>
            </Link>
          </h1>
        </>
      )

      return (
        <ThemeProvider theme={theme}>
          <div
            style={{
              overflow: 'hidden',
              position: 'relative',
              maxWidth: '100%',
            }}
          >
            <svg
              viewBox="0 0 1600 900"
              className="header-wave"
              style={{
                width: '100vw',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
              }}
            >
              <path
                fill="#111"
                opacity=".4"
                d="M0,389C534,506,1068,205,1602,521,C1600, 0,1600, 0,1600, 0C1600, 0,1600, 0,1600, 0C1600, 0,1600, 0,1600, 0C1600, 0,1600, 0,1600, 0C1600, 0,1600, 0,1600, 0L1600,0C1066,0,532,0,-2,0,C0, 0,0, 0,0, 0C0, 0,0, 0,0, 0C0, 0,0, 0,0, 0C0, 0,0, 0,0, 0C0, 0,0, 0,0, 0L1398,0L0,0Z"
              />
            </svg>
            <div style={{ position: 'relative', zIndex: 1 }}>
              {header}
              <div
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  padding: `0`,

                  display: 'flex',
                  maxWidth: '100%',
                }}
              >
                {children}
              </div>
              <footer
                style={{
                  textAlign: 'center',
                  padding: `0 20px 80px 0`,
                }}
              ></footer>

              <div className="navv" style={{ display: 'none' }}>
                <a>
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </a>
                <a
                  onClick={() => setProfile(!profile)}
                  className={profile ? 'active' : ''}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </ThemeProvider>
      )
    }}
  />
)
