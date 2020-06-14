import React from 'react'
import Typography from '@material-ui/core/Typography'
import '../../assets/scss/home.scss'

export default () => {
  return <div className="home" style={{ padding: 24 }}>
    <Typography variant="h3">知识产权执法智能平台</Typography>
    <br />
    <Typography variant="h5"><a href={window.location.origin.replace(/9002/, 9001)}>返回网站首页</a></Typography>
  </div>
}