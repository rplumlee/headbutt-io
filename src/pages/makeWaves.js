import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import WaveBuilder from '../components/WaveBuilder'
import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'

import Slider from '@material-ui/core/Slider'
import '../styles.scss'

class MakeWaves extends React.Component {
  render() {
    const siteTitle = 'Headbutt.io - MakeWaves SVG Wave Generator'
    const location = get(this, 'props.location')
    return (
      <>
        <Helmet title={siteTitle} />
        <Layout location={location}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: 900,
              maxWidth: '100%',
              margin: '0 auto',
            }}
          >
            <WaveBuilder />
          </div>{' '}
        </Layout>
      </>
    )
  }
}
export default MakeWaves
