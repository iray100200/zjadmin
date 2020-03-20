import React from 'react'
import Typography from '@material-ui/core/Typography'
import '../../assets/scss/home.scss'

export default () => {
  return <div className="home" style={{ padding: 24 }}>
    <Typography variant="h3">欢迎使用镇江市专利网站管理系统</Typography>
    <br />
    <Typography variant="h5"><a href="/">返回网站首页</a></Typography>
  </div>
}