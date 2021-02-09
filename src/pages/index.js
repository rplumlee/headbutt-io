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
    const siteTitle = get(
      this,
      'props.data.cosmicjsSettings.metadata.site_title'
    )
    const posts = get(this, 'props.data.allCosmicjsPosts.edges')
    const author = get(this, 'props.data.cosmicjsSettings.metadata')
    const location = get(this, 'props.location')

    return (
      <Layout location={location}>
        <Helmet title={siteTitle} />
        <Tilt
          tiltMaxAngleX={6}
          tiltMaxAngleY={6}
          className="parallax-effect card checkered-bg"
          perspective={1000}
          scale={1.05}
          style={{ background: '#222', margin: '0 auto' }}
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
          >
            <motion.svg viewBox="0 0 1300 600" style={{ y: 40 }}>
              <path
                opacity=".5"
                fill="url(#grad1)"
                d="M0,123C434,406,868,98,1302,444,C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300L1300,300C866,300,432,300,-2,300,C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300L1398,300L0,300Z"
              />
              <path
                opacity=".9"
                fill="url(#grad1)"
                d="M0,332C434,117,868,302,1302,370,C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300L1300,300C866,300,432,300,-2,300,C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300L1398,300L0,300Z"
              />
              <path
                opacity=".5"
                fill="url(#grad1)"
                d="M0,234C434,312,868,62,1302,209,C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300L1300,300C866,300,432,300,-2,300,C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300L1398,300L0,300Z"
              />
              <path
                opacity=".7"
                fill="url(#grad1)"
                d="M0,235C434,333,868,252,1302,243,C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300C1300, 300,1300, 300,1300, 300L1300,300C866,300,432,300,-2,300,C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300C0, 300,0, 300,0, 300L1398,300L0,300Z"
              />
            </motion.svg>
            <motion.div className="inner-element">
              {' '}
              <div>
                <h5 style={{ color: '#fff' }}>MakeWaves SVG Wave Generator</h5>{' '}
                <p style={{ color: '#fff' }}>{'<MakeWaves />'}</p>
              </div>
            </motion.div>
          </Link>
        </Tilt>

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
