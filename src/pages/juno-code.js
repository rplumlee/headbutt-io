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
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import '../styles.scss'
import Layout from '../components/layout'

export default function JunoCode() {
  return (
    <Layout location={`/juno-code`}>
      <div style={{ padding: 50 }} className="juno-code">
        <SyntaxHighlighter style={materialDark} language={`jsx`}>
          {st}
        </SyntaxHighlighter>
        <br /> <br />
        <SyntaxHighlighter style={materialDark} language={`scss`}>
          {st2}
        </SyntaxHighlighter>
      </div>
    </Layout>
  )
}

const st = `//Juno.js

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

class JunoCode extends React.Component {
  render() {
    const siteTitle = 'Juno Demo - Reid Plumlee'
    return (
      <StaticQuery
        query={graphql'
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
        '}
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
`

const st2 = `//Juno.scss

body {
  --gradient: linear-gradient(180deg, #e9435e 0%, rgba(27, 1, 159, 0.5) 100%);
  --color-primary: #c7169c;
  --font-size-text: 16px;

  background: #fff;
  font-size: --font-size-text;
  line-height: 20px;
}
.button {
  background: var(--color-primary);
  text-transform: uppercase;
  border-radius: 6px;
  padding: 20px;
  color: #fff;
  letter-spacing: 1.5px;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-family: 'Averta-Semibold', sans-serif;
}
button {
  cursor: pointer;
}
h1 {
  font-size: 100px;
  line-height: 90px;
  font-weight: 600;
  text-align: center;
  font-family: 'SF Pro Display', sans-serif;
  text-shadow: 0px 30px 30px rgba(0, 0, 0, 0.5);
  margin: 0;
}
h2 {
  font-size: 48px;
  line-height: 60px;
  margin-top: 0;
  font-weight: 600;
  margin-bottom: 10px;
}
h3 {
  font-size: 36px;
  line-height: 43px;
  letter-spacing: -1px;
  font-family: 'Averta-Semibold', sans-serif;
  margin: 0 0 10px 0;
  font-weight: 600;
}
h4 {
  font-size: 32px;
  line-height: 38px;
  margin: 0;
  text-transform: none;
  letter-spacing: -1px;
}

p {
  font-size: 20px;
  color: #4d4848;
  line-height: 26px;

  strong {
    font-size: 24px;
    line-height: 32px;
    font-weight: 400;
    letter-spacing: -1px;
  }
}

@media (max-width: 800px) {
  h1 {
    font-size: 54px;
    line-height: 48px;
  }
  h2 {
    font-size: 40px;
    line-height: 50px;
  }
  h3 {
    font-size: 30px;
    line-height: 38px;
  }
  h4 {
    font-size: 24px;
    line-height: 32px;
  }
  p {
    font-size: 16px;
    line-height: 21px;

    strong {
      font-size: 20px;
      line-height: 26px;
    }
  }
}

@media (max-width: 600px) {
  h1 {
    font-size: 46px;
    line-height: 42px;
  }
}

#navbar {
  padding: 30px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5;

  @media (max-width: 800px) {
    padding: 20px;
  }

  #nav-menu {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a {
    color: #fff;
    text-decoration: none;
    box-shadow: none;
    padding: 20px;
    font-family: 'Averta-Semibold', sans-serif;
  }

  .signup {
    font-size: 12px;
    text-transform: uppercase;
    border: 1px solid #fff;
    letter-spacing: 1.5px;
  }

  img {
    margin: 0;
    height: 54px;
    width: auto;
    align-self: flex-end;
  }
}

.hero {
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px) {
    min-height: 600px;
  }

  p {
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    max-width: 450px;
    margin: 20px 0 0 0;
    color: #fff;

    @media (max-width: 800px) {
      max-width: 350px;
    }
  }

  button {
    width: 350px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #696c74;
    border-radius: 10px;
    font-weight: 600;
    margin: 40px 0 0 0;
    border: none;
    outline: none;
    background: #fff;

    svg {
      font-size: 20px;
      margin-right: 7px;
    }
  }

  .hero--apps {
    position: absolute;
    left: 50%;
    bottom: 25px;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    p {
      margin: 0 0 0 4px;
    }

    svg {
      margin-right: 5px;
      font-size: 24px;
    }

    @media (max-width: 800px) {
      width: 100%;
      justify-content: center;
    }
  }
}

.devices {
  padding: 100px 60px 50px 60px;
  position: relative;

  @media (max-width: 800px) {
    padding: 100px 20px 50px 20px;
  }
  .devices--img-container {
    width: 75%;
    margin-left: 25%;
    margin-top: -55px;

    @media (max-width: 1100px) {
      margin-top: 0;
    }
  }
  .slant {
    position: absolute;
    top: 0;
    bottom: -350px;
    left: 0;
    right: 0;
    z-index: -1;
    background: linear-gradient(
      180deg,
      #f8f8f8 35%,
      rgba(233, 233, 233, 0) 100%
    );
    clip-path: polygon(0% 55%, 100% 35%, 100% 100%, 0% 100%);
  }
}

.motivators {
  padding: 100px 60px 50px 60px;
  position: relative;
  @media (max-width: 800px) {
    padding: 100px 20px 50px 20px;
  }

  > p {
    margin-bottom: 10px;
  }

  .motivators--table {
    display: grid;
    grid-template: 25% 25% 25% 25% / 6% 22% 22%;
    margin-top: 65px;
  }
  .motivators--table_body,
  .motivators--table_title,
  .motivators--table_number {
    border-top: 2px solid #efefef;
    padding: 30px 0;
  }
  .motivators--table_number {
    font-size: 80px;
    line-height: 72px;
    color: #dcdcdc;
    font-weight: 800;
  }
  .motivators--table_title {
    font-weight: 700;
    padding-right: 30px;
  }

  .motivators--img-1 {
    position: absolute;
    left: 52%;
    top: 50px;
    width: 28%;
    z-index: 1;
  }
  .motivators--img-2 {
    position: absolute;
    left: 65%;
    top: 30vw;
    width: 28%;
    z-index: 0;
  }

  @media (max-width: 1100px) {
    .motivators--table {
      grid-template: 25% 25% 25% 25% / 6% 30% 30%;
    }
    .motivators--table_title {
      padding-left: 30px;
    }

    .motivators--img-1 {
      width: 24%;
      left: 65%;
      top: 150px;
    }
    .motivators--img-2 {
      width: 24%;
      left: 78%;
      top: 40vw;
    }
  }
  @media (max-width: 800px) {
    .motivators--table {
      grid-template: 25% 25% 25% 25% / 8% 50% 42%;
    }
    .motivators--table_number {
      font-size: 42px;
      line-height: 42px;
    }
    .motivators--table_title {
      padding-left: 20px;
      padding-right: 20px;
      font-size: 22px;
    }
    .motivators--table_body {
      font-size: 14px;
    }

    .motivators--img-1 {
      display: none;
    }
    .motivators--img-2 {
      display: none;
    }
  }
}

.demo-button {
  text-align: center;
  padding: 80px 0 150px 0;
}

#partners {
  padding: 90px 20px 0 20px;
  background: linear-gradient(
    180deg,
    #f8f8f8 -27.43%,
    rgba(233, 233, 233, 0) 100%
  );
  text-align: center;

  .partners--logos {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    padding: 100px 50px;
    margin: 0 auto;

    div {
      padding: 20px;
    }

    div:nth-of-type(1),
    div:nth-of-type(2),
    div:nth-of-type(3),
    div:nth-of-type(6),
    div:nth-of-type(7),
    div:nth-of-type(8) {
      width: 33%;
    }
    div:nth-of-type(4),
    div:nth-of-type(5) {
      width: 50%;
    }
    div:nth-of-type(4) {
      text-align: right;
      padding-right: 80px;
    }
    div:nth-of-type(5) {
      text-align: left;
      padding-left: 80px;
    }

    @media (max-width: 600px) {
      div:nth-of-type(2n + 1) {
        width: 50% !important;
        padding: 20px 20px 20px 0 !important;
      }
      div:nth-of-type(2n) {
        width: 50% !important;
        padding: 20px 0px 20px 20px !important;
      }
    }
  }
}

.hero-bottom {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15vw 60px;
  justify-content: center;

  @media (max-width: 800px) {
    padding: 15vw 20px;
  }

  .hero-bottom--content {
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    h2 {
      margin-bottom: 10px;
    }
    p {
      text-align: left;
      font-weight: 300;
      margin: 0;
    }
    a {
      box-shadow: none;
      display: inline-block;
      margin: 50px auto 0 0;
    }
  }

  .hero-bottom--video {
    width: 65%;
    padding-left: 30px;
  }

  iframe {
    height: 33vw;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    min-height: 800px !important;

    .hero-bottom--content {
      width: 100%;
    }

    p {
      max-width: none;
    }
    .hero-bottom--video {
      width: 100%;
      padding: 0;
      margin-top: 60px;

      iframe {
        height: 50vw;
      }
    }
  }
}
`
