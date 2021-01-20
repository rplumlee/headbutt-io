import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import cosmicjsLogo from '../../static/cosmicjs.svg'
import gatsbyLogo from '../../static/gatsby.png'
import { rhythm, scale } from '../utils/typography'
import { motion, useAnimation } from 'framer-motion'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

const clip_path_variants = {
  open: (i) => ({
    pathLength: 1,
    transition: {
      duration: 0.7 + i,
      delay: 1 - i,
    },
  }),
  closed: (i) => ({
    pathLength: 0,
  }),
}

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

      const animation1 = useAnimation()

      let rootPath = `/`
      let postsPath = `/posts`
      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
        rootPath = __PATH_PREFIX__ + `/`
        postsPath = __PATH_PREFIX__ + `/posts`
      }

      header = (
        <div style={{ overflow: 'hidden' }}>
          <h1
            style={{
              ...scale(1.3),
              textAlign: 'center',
              height: rhythm(2.5),
              color: '#fff',
              transform: 'scale(2)',
              maxWidth: '100vw',
              overflow: 'hidden',
              marginBottom: 100,
            }}
          >
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit',
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
                enable-background="new 0 0 436.887 47.59"
              >
                <g strokeWidth="1">
                  <motion.path
                    fill="none"
                    stroke="#000000"
                    stroke-miterlimit="10"
                    d="M28.688,45.357V29.684H14.156v15.674H1.5V3.346
		h12.656v15.557h14.531V3.346h12.656v42.012H28.688z"
                    variants={clip_path_variants}
                    initial={'open'}
                    animate={'open'}
                    custom={0.3}
                  />
                  <motion.path
                    fill="none"
                    stroke="#000000"
                    stroke-miterlimit="10"
                    d="M52.635,45.357V3.346h26.162v9.902H65.291v6.123
		h12.686v9.902H65.291v6.182h14.473v9.902H52.635z"
                    variants={clip_path_variants}
                    initial={'open'}
                    animate={'open'}
                    custom={0.1}
                  />
                  <motion.path
                    fill="none"
                    stroke="#000000"
                    stroke-miterlimit="10"
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
                    stroke="#000000"
                    stroke-miterlimit="10"
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
                    stroke="#000000"
                    stroke-miterlimit="10"
                    d="M221.156,32.467c0,4.121-1.446,7.3-4.336,9.536
		c-2.891,2.237-7.021,3.354-12.393,3.354h-19.16V3.346h17.842c11.152,0,16.729,3.389,16.729,10.166c0,1.465-0.352,2.808-1.055,4.028
		c-0.703,1.221-1.772,2.29-3.208,3.208c-1.436,0.918-3.013,1.543-4.731,1.875v0.117c1.992,0.234,3.779,0.825,5.361,1.772
		c1.582,0.948,2.802,2.129,3.662,3.545C220.727,29.474,221.156,30.943,221.156,32.467z M206.391,15.709
		c0-2.597-2.041-3.896-6.123-3.896h-2.344v7.939h3.662c1.406,0,2.559-0.376,3.457-1.128C205.941,17.873,206.391,16.9,206.391,15.709
		z M207.709,32.408c0-1.211-0.439-2.207-1.318-2.988c-0.879-0.781-2.041-1.172-3.486-1.172h-4.98v8.584h4.219
		c1.718,0,3.076-0.396,4.072-1.187S207.709,33.775,207.709,32.408z"
                    variants={clip_path_variants}
                    initial={'closed'}
                    animate={'open'}
                    custom={0.2}
                  />
                  <motion.path
                    fill="none"
                    stroke="#000000"
                    stroke-miterlimit="10"
                    d="M266.344,26.168c0,6.738-1.538,11.744-4.614,15.015
		c-3.076,3.271-7.817,4.907-14.224,4.907c-5.977,0-10.513-1.636-13.608-4.907c-3.096-3.271-4.644-8.198-4.644-14.78V3.346h12.715
		v23.525c0,2.695,0.503,4.771,1.509,6.226c1.006,1.455,2.446,2.183,4.321,2.183c1.895,0,3.335-0.684,4.321-2.051
		c0.986-1.367,1.479-3.388,1.479-6.064V3.346h12.744V26.168z"
                    variants={clip_path_variants}
                    initial={'closed'}
                    animate={'open'}
                    custom={0.5}
                  />
                  <motion.path
                    fill="none"
                    stroke="#000000"
                    stroke-miterlimit="10"
                    d="M298.377,13.248v32.109h-12.715V13.248h-11.748
		V3.346h36.357v9.902H298.377z"
                    variants={clip_path_variants}
                    initial={'closed'}
                    animate={'open'}
                    custom={0.7}
                  />
                  <motion.path
                    fill="none"
                    stroke="#000000"
                    stroke-miterlimit="10"
                    d="M339.551,13.248v32.109h-12.715V13.248h-11.748
		V3.346h36.357v9.902H339.551z"
                    variants={clip_path_variants}
                    initial={'closed'}
                    animate={'open'}
                    custom={0}
                  />
                  <motion.path
                    fill="none"
                    stroke="#000000"
                    stroke-miterlimit="10"
                    d="M371.906,40.143c0,1.777-0.625,3.213-1.875,4.307
		s-2.979,1.641-5.186,1.641c-2.012,0-3.657-0.571-4.937-1.714s-1.919-2.553-1.919-4.233c0-1.718,0.63-3.11,1.89-4.175
		c1.26-1.064,2.954-1.597,5.083-1.597c2.07,0,3.745,0.532,5.024,1.597C371.267,37.033,371.906,38.424,371.906,40.143z"
                    variants={clip_path_variants}
                    initial={'closed'}
                    animate={'open'}
                    custom={1}
                  />
                  <motion.path
                    fill="none"
                    stroke="#000000"
                    stroke-miterlimit="10"
                    d="M393.744,7.271c0,1.758-0.64,3.184-1.919,4.277
		c-1.279,1.094-2.964,1.641-5.054,1.641c-2.031,0-3.696-0.566-4.995-1.699c-1.299-1.132-1.948-2.539-1.948-4.219
		c0-1.718,0.63-3.11,1.89-4.175c1.26-1.064,2.944-1.597,5.054-1.597c2.09,0,3.774,0.532,5.054,1.597
		C393.104,4.162,393.744,5.553,393.744,7.271z M380.531,45.357v-30h12.48v30H380.531z"
                    variants={clip_path_variants}
                    initial={'closed'}
                    animate={'open'}
                    custom={0.5}
                  />
                  <motion.path
                    fill="none"
                    stroke="#000000"
                    stroke-miterlimit="10"
                    d="M435.387,29.83c0,5.059-1.528,9.034-4.585,11.924
		c-3.057,2.891-7.329,4.336-12.817,4.336c-5.449,0-9.692-1.411-12.729-4.233c-3.037-2.822-4.556-6.713-4.556-11.675
		c0-3.183,0.713-5.947,2.139-8.291s3.457-4.141,6.094-5.391c2.637-1.25,5.674-1.875,9.111-1.875c3.555,0,6.636,0.655,9.243,1.963
		c2.607,1.309,4.609,3.125,6.006,5.449C434.688,24.362,435.387,26.959,435.387,29.83z M422.73,29.889
		c0-4.082-1.563-6.123-4.688-6.123s-4.688,2.139-4.688,6.416c0,4.512,1.582,6.768,4.746,6.768
		C421.188,36.949,422.73,34.596,422.73,29.889z"
                    variants={clip_path_variants}
                    initial={'closed'}
                    animate={'open'}
                    custom={0}
                  />
                </g>
              </svg>
            </Link>
          </h1>
        </div>
      )

      return (
        <div>
          {header}
          <div
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: rhythm(24),
              padding: `0 ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(3 / 4)}`,
              minHeight: 'calc(100vh - 42px)',
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
          <div className="navv">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                fill="#fff"
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      )
    }}
  />
)
