import React from 'react'
import Search from './search'

const Detect = () => {
  return (
    <Search />
  )
}

Detect.getInitialProps = async ({ req }) => {
  return { headers: req.headers }
}

export default Detect