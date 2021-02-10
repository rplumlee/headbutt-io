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
            <svg viewBox="0 0 1300 700" className="bgg">
              <path
                opacity=".5"
                fill="url(#rainbow)"
                d="M0,123C434,406,868,98,1302,444,C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300L1300,300C866,300,432,300,-2,300,C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300L1398,300L0,300Z"
              />
              <path
                opacity=".9"
                fill="url(#rainbow)"
                d="M0,332C434,117,868,302,1302,370,C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300L1300,300C866,300,432,300,-2,300,C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300L1398,300L0,300Z"
              />
              <path
                opacity=".5"
                fill="url(#rainbow)"
                d="M0,234C434,312,868,62,1302,209,C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300L1300,300C866,300,432,300,-2,300,C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300L1398,300L0,300Z"
              />
              <path
                opacity=".7"
                fill="url(#rainbow)"
                d="M0,235C434,333,868,252,1302,243,C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300L1300,300C866,300,432,300,-2,300,C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300L1398,300L0,300Z"
              />
            </svg>
            <GoTools /> Tools
          </h4>
          <div className="tools-container">
            <Tilt
              tiltMaxAngleX={6}
              tiltMaxAngleY={6}
              className="parallax-effect card checkered-bg"
              perspective={1000}
              scale={1.05}
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
                  justifyContent: 'space-between',
                }}
                className="makewaves-card"
              >
                <motion.svg
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
                </motion.svg>
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
          </div>
          <h4 className="badge">
            <BsViewList /> Blog
          </h4>
          {/* <Tilt
          tiltMaxAngleX={6}
          tiltMaxAngleY={6}
          className="parallax-effect card"
          perspective={1000}
          scale={1.05}
          style={{
            background: '#333',
          }}
        >
          <Link
            to="/waveBackground"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <DarkToggleDemo />
            <motion.div
              className="inner-element"
              style={{ background: '#333' }}
            >
              {' '}
              <div>
                <h5 style={{ color: '#fff' }}>SVG Dark Mode Toggle</h5>{' '}
                <p style={{ color: '#fff' }}>{'<DarkToggle />'}</p>
              </div>
            </motion.div>
          </Link>
        </Tilt> */}
          {/* <div className="post-list">
          {posts.map(({ node }) => {
            const title = get(node, 'title') || node.slug
            return (
              <div key={node.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: 'none' }} to={`posts/${node.slug}`}>
                    {title}
                  </Link>
                </h3>
                <small>{node.created}</small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.metadata.description,
                  }}
                />
              </div>
            )
          })}
        </div> */}
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
