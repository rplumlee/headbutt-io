import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { motion } from 'framer-motion'
import { BsPlay } from 'react-icons/bs'
import { FaApple } from 'react-icons/fa'
import { AiFillAndroid } from 'react-icons/ai'

import Button from '@material-ui/core/Button'

export default function Devices({ children, location }) {
  return (
    <StaticQuery
      query={graphql`
        query HomeDevicesQuery {
          cosmicjsSettings(slug: { eq: "general" }) {
            metadata {
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
            }
          }
        }
      `}
      render={(data) => {
        const homePageDevices =
          data.cosmicjsSettings.metadata.junodevices.local.childImageSharp.fluid
        const juno1 =
          data.cosmicjsSettings.metadata.juno1.local.childImageSharp.fluid
        const juno2 =
          data.cosmicjsSettings.metadata.juno2.local.childImageSharp.fluid
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
              <div className="img-container">
                <Img fluid={homePageDevices} />
              </div>
            </div>
            <div className="motivators">
              <p>Our platform is designed around 4 human motivators</p>
              <h3>Here's how it works</h3>
              <div className="motivators--table">
                <div className="motivators--table_number">1</div>
                <div className="motivators--table_title">
                  Connect your Crowds
                </div>
                <div className="motivators--table_body">
                  Onboard users around interests, strengths and desired
                  improvement areas and allow machine learning triggers to
                  recommend peer connections, mainstage, and breakout learning
                  opportunities.{' '}
                </div>
                <div className="motivators--table_number">2</div>
                <div className="motivators--table_title">
                  Gamify the Experience
                </div>
                <div className="motivators--table_body">
                  Deliver powerful gamification tools supporting real-time and
                  ongoing user competition. Weighted algorithms are also
                  designed to increase check-ins and deeper discovery through
                  rewards and recognition.
                </div>
                <div className="motivators--table_number">3</div>
                <div className="motivators--table_title">
                  Engage with Business Growth
                </div>
                <div className="motivators--table_body">
                  Support users and partners by facilitating business
                  connections through live exhibit experiences, digital
                  think-tank sessions, suggested collaboration partnerships, and
                  skills-based visibility tools.
                </div>
                <div className="motivators--table_number">4</div>
                <div className="motivators--table_title">
                  Continuous Interaction
                </div>
                <div className="motivators--table_body">
                  Create EQ and IQ learning pathways to engage users on all
                  levels. From certification and badging to goal setting and
                  performance commitments, offer a diverse set of actions for
                  users to personally develop
                </div>
              </div>
              <motion.div className="motivators--img-1">
                <Img fluid={juno1} />
              </motion.div>
              <motion.div className="motivators--img-2">
                <Img fluid={juno2} />
              </motion.div>
            </div>
            <div className="demo-button">
              <a href="/demo" className="button">
                Schedule a demo today
              </a>
            </div>
          </>
        )
      }}
    />
  )
}
