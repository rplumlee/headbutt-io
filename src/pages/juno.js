import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import {
  useViewportScroll,
  motion,
  useTransform,
  useMotionValue,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import BackgroundImage from 'gatsby-background-image'
import Img from 'gatsby-image'
import { BsPlay } from 'react-icons/bs'
import { AiFillAndroid } from 'react-icons/ai'
import { FaApple } from 'react-icons/fa'

import '../styles/juno.scss'

class Juno extends React.Component {
  render() {
    const siteTitle = 'Juno Demo - Reid Plumlee'
    return (
      <StaticQuery
        query={graphql`
          query HomeHeroQuery {
            cosmicjsSettings(slug: { eq: "general" }) {
              metadata {
                assessment_image {
                  local {
                    childImageSharp {
                      fluid(quality: 95, maxWidth: 5000) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
                junodevices {
                  local {
                    childImageSharp {
                      fluid(quality: 95) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                juno1 {
                  local {
                    childImageSharp {
                      fluid(quality: 95) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                juno2 {
                  local {
                    childImageSharp {
                      fluid(quality: 95) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                junobottom {
                  local {
                    childImageSharp {
                      fluid(quality: 95) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        `}
        render={(data) => {
          return (
            <>
              <Helmet title={siteTitle} />
              <Navbar />
              <Hero data={data} />
              <Devices data={data} />
              <Partners />
              <Demo data={data} />
            </>
          )
        }}
      />
    )
  }
}
export default Juno

const Navbar = function () {
  return (
    <div id="navbar">
      <img src="/junolive.png" />
      <div id="nav-menu">
        <a href="/login" className="login">
          Login
        </a>
        <a href="/signup" className="signup">
          Sign Up
        </a>
      </div>
    </div>
  )
}

function Hero({ data }) {
  const homgePageHero =
    data.cosmicjsSettings.metadata.assessment_image.local.childImageSharp.fluid
  return (
    <>
      <BackgroundImage
        Tag="div"
        className="hero"
        fluid={homgePageHero}
        style={{ height: '60.8vw' }}
      >
        <h1>
          Your Live &<br />
          On-Demand
          <br />
          Events Platform
        </h1>
        <p>
          JUNO is an online events platform built to engage with your audience
          365 days a year.
        </p>
        <button href="/getstarted">
          <BsPlay />
          Get Started
        </button>
        <div className="hero--apps">
          <AiFillAndroid />
          <FaApple />
          <p>Get the app today</p>
        </div>
      </BackgroundImage>
    </>
  )
}

function Devices({ data }) {
  const homePageDevices =
    data.cosmicjsSettings.metadata.junodevices.local.childImageSharp.fluid
  const juno1 = data.cosmicjsSettings.metadata.juno1.local.childImageSharp.fluid
  const juno2 = data.cosmicjsSettings.metadata.juno2.local.childImageSharp.fluid

  const { scrollY } = useViewportScroll()
  const y1 = useTransform(scrollY, [1000, 2600], [0, 80])
  const y2 = useTransform(scrollY, [1000, 2600], [0, -40])

  return (
    <>
      <div className="devices">
        <div className="slant"></div>
        <h3>
          Connect your people.
          <br />
          No matter the medium.
        </h3>
        <p>
          Juno equips you to step in without the barriers of <br />
          location
        </p>
        <div className="devices--img-container">
          <Img fluid={homePageDevices} />
        </div>
      </div>
      <div className="motivators">
        <p>Our platform is designed around 4 human motivators</p>
        <h3>Here's how it works</h3>
        <motion.div className="motivators--img-1" style={{ y: y1, x: 0 }}>
          <Img fluid={juno1} />
        </motion.div>
        <motion.div className="motivators--img-2" style={{ y: y2, x: 0 }}>
          <Img fluid={juno2} />
        </motion.div>
        <div className="motivators--table">
          <div className="motivators--table_number">1</div>
          <h4 className="motivators--table_title">Connect your Crowds</h4>
          <div className="motivators--table_body">
            Onboard users around interests, strengths and desired improvement
            areas and allow machine learning triggers to recommend peer
            connections, mainstage, and breakout learning opportunities.{' '}
          </div>
          <div className="motivators--table_number">2</div>
          <h4 className="motivators--table_title">Gamify the Experience</h4>
          <div className="motivators--table_body">
            Deliver powerful gamification tools supporting real-time and ongoing
            user competition. Weighted algorithms are also designed to increase
            check-ins and deeper discovery through rewards and recognition.
          </div>
          <div className="motivators--table_number">3</div>
          <h4 className="motivators--table_title">
            Engage with Business Growth
          </h4>
          <div className="motivators--table_body">
            Support users and partners by facilitating business connections
            through live exhibit experiences, digital think-tank sessions,
            suggested collaboration partnerships, and skills-based visibility
            tools.
          </div>
          <div className="motivators--table_number">4</div>
          <h4 className="motivators--table_title">Continuous Interaction</h4>
          <div className="motivators--table_body">
            Create EQ and IQ learning pathways to engage users on all levels.
            From certification and badging to goal setting and performance
            commitments, offer a diverse set of actions for users to personally
            develop
          </div>
        </div>
      </div>
      <div className="demo-button">
        <a href="/demo" className="button">
          Schedule a demo today
        </a>
      </div>
    </>
  )
}

function Partners({ data }) {
  return (
    <div id="partners">
      <h2>Our Partners</h2>
      <p>
        <strong>Trusted by world-leading organizations</strong>
      </p>
      <div className="partners--logos">
        <div>
          <img src="/image11.png" />
        </div>
        <div>
          <img src="/image15.png" />
        </div>
        <div>
          <img src="/image18.png" />
        </div>
        <div>
          <img src="/image14.png" />
        </div>
        <div>
          <img src="/image12.png" />
        </div>
        <div>
          <img src="/image17.png" />
        </div>
        <div>
          <img src="/image16.png" />
        </div>
        <div>
          <img src="/image13.png" />
        </div>
      </div>
    </div>
  )
}

function Demo({ data }) {
  const junoBottom =
    data.cosmicjsSettings.metadata.junobottom.local.childImageSharp.fluid

  return (
    <>
      <BackgroundImage
        Tag="div"
        className="hero hero-bottom"
        fluid={junoBottom}
        style={{ height: '60.8vw', minHeight: '500px' }}
      >
        <div className="hero-bottom--content">
          <h2>Show Me Juno</h2>
          <p>
            <strong>
              Are you ready to bring energy, creativity, and connectivity to
              your organization? JUNO will launch your vision and mission into a
              virtual experience, second to none.
            </strong>
          </p>
          <a className="button" href="/schedule">
            Schedule a demo today
          </a>
        </div>
        <div className="hero-bottom--video">
          <iframe
            src="https://player.vimeo.com/video/30280349?title=0&byline=0&portrait=0"
            width="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </BackgroundImage>
    </>
  )
}
