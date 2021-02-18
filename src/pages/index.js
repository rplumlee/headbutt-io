import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Waves from '../components/Waves'
import DarkToggle from '../components/DarkToggle'
import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'
import { GoTools } from 'react-icons/go'
import { BsViewList } from 'react-icons/bs'

import '../styles.scss'

function DarkToggleDemo() {
  const [nightMode, toggleNightMode] = React.useState(true)

  React.useEffect(() => {
    setInterval(() => {
      toggleNightMode((old) => !old)
    }, 5000)

    return () => clearInterval()
  }, [])

  return (
    <div
      style={{
        backgroundColor: nightMode ? '#333' : '#fff',
        height: '150px',
        width: '180px',
        borderRadius: 10,
        transition: '300ms',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        margin: '40px auto 0 auto',
      }}
    >
      <div style={{ transform: 'scale(3)' }}>
        <DarkToggle
          colorMode={nightMode ? 'dark' : 'light'}
          toggleColorMode={() => toggleNightMode(!nightMode)}
        />
      </div>
    </div>
  )
}

class BlogIndex extends React.Component {
  render() {
    const siteTitle = 'Headbutt.io - frontend tools built with React'
    const posts = get(this, 'props.data.allCosmicjsPosts.edges')
    const author = get(this, 'props.data.cosmicjsSettings.metadata')
    const location = get(this, 'props.location')

    return (
      <Layout location={location}>
        <Helmet title={siteTitle} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 800,
            maxWidth: '90%',
            paddingTop: 40,
            margin: '0 auto',
          }}
        >
          <h4 className="badge">
            <GoTools /> Tools
          </h4>
          <div className="tools-container">
            <Tilt
              tiltMaxAngleX={9}
              tiltMaxAngleY={9}
              className="parallax-effect card checkered-bg"
              perspective={400}
              scale={1.15}
              style={{ background: '#222', maxWidth: '90%' }}
            >
              <Link
                to="/makeWaves"
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
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
                <motion.div className="inner-element">
                  {' '}
                  <div className="logo-container-makewaves" style={{}}>
                    <svg
                      viewBox="0 0 1300 700"
                      style={{
                        width: 60,
                        transform: 'scaleY(3) rotate(180deg)',
                      }}
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
                </motion.div>
              </Link>
            </Tilt>

            <Tilt
              tiltMaxAngleX={9}
              tiltMaxAngleY={9}
              className="parallax-effect card checkered-bg"
              perspective={400}
              scale={1.15}
              style={{
                background:
                  'url(https://scotch-res.cloudinary.com/image/upload/w_1050,q_auto:good,f_auto/media/4741/PTLHvdFMQuW7VhAXQc0G_es6_what_to_use_and_what_not_to.png.jpg)',
                maxWidth: '90%',
                backgroundSize: '150%',
              }}
            >
              <Link
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
                <motion.div
                  className="inner-element"
                  style={{ height: '100%' }}
                >
                  {' '}
                  <div
                    className="logo-container-makewaves"
                    style={{ width: '100%', height: '100%', padding: 0 }}
                  >
                    <h2
                      style={{
                        color: '#222',
                        textAlign: 'left',
                        width: '100%',
                        margin: 0,
                        height: 'auto',
                      }}
                    >
                      Operator<br></br>Lookup
                    </h2>
                  </div>
                </motion.div>
              </Link>
            </Tilt>
          </div>
          <h4 className="badge">
            <BsViewList /> Blog
            <motion.svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                y: '-44%',
                x: '-35%',
                zIndex: -1,
              }}
            >
              <path
                fill="rgb(22, 22, 62)"
                d="M25.8,-32.2C37.1,-32.8,52.5,-31.9,60.3,-24.6C68.1,-17.4,68.3,-3.8,66.9,10C65.5,23.7,62.4,37.6,52.5,40.8C42.5,44.1,25.5,36.7,12.4,39.3C-0.8,41.9,-10.2,54.4,-15.6,52.9C-21,51.5,-22.4,36,-23.5,25.5C-24.7,15,-25.7,9.4,-34.2,0.3C-42.7,-8.8,-58.7,-21.5,-61.6,-33.5C-64.5,-45.5,-54.2,-56.9,-41.7,-55.7C-29.3,-54.5,-14.6,-40.7,-3.7,-35C7.2,-29.2,14.5,-31.5,25.8,-32.2Z"
                transform="translate(100 100) scale(1)"
              />
            </motion.svg>
          </h4>
          <div className="blog-post">
            <Link to="/useAsync">
              <h3>Creating a useAsync Hook Like React Query</h3>
              <p>
                React Query is great. So great that we should understand it
                better because it was designed by Tanner Linsley who is{' '}
                <i>really</i> good at this.
              </p>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    allCosmicjsPosts(sort: { fields: [created], order: DESC }, limit: 1000) {
      edges {
        node {
          metadata {
            description
          }
          slug
          title
          created(formatString: "DD MMMM, YYYY")
        }
      }
    }
    cosmicjsSettings(slug: { eq: "general" }) {
      metadata {
        site_title
        author_name
        author_bio
        author_avatar {
          imgix_url
        }
      }
    }
  }
`
