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
          className="parallax-effect card"
          perspective={1000}
          scale={1.05}
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
            <Waves />
            <motion.div className="inner-element">
              {' '}
              <div>
                <h5>Waves Background Animation</h5> <p>{'<Waves />'}</p>
              </div>
            </motion.div>
          </Link>
        </Tilt>

        <Tilt
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
        </Tilt>
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
