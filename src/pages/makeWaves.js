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

export default function MakeWaves() {
  const siteTitle = 'Headbutt.io - MakeWaves SVG Wave Generator'
  return (
    <>
      <Helmet title={siteTitle} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Layout location={location}>
          <WaveBuilder />
        </Layout>
      </div>
    </>
  )
}
