import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import querystring from 'query-string'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Notification from 'components/Notification'

const useStyles = makeStyles(theme => ({
  container: {
    padding: 0,
    marginTop: -theme.spacing(1)
  },
  textField: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing(1),
    float: 'right'
  }
}))

export default (props) => {
  const { onOk = () => {} } = props
  const classes = useStyles()
  const [info, setInfo] = useState(props.value)
  const postData = async () => {
    if (!info) {
      Notification.notice({
        variant: 'error',
        message: '请先输入受理意见'
      })
      return
    }
    const search = querystring.stringify({
      id: props.id,
      acceptance_description: info
    })
    const res = await fetch(`/f/v1/reply-to-complaint?${search}`)
    const result = await res.json()
    if (result.code === 0) {
      Notification.notice({
        variant: 'success',
        message: '受理成功'
      })
      onOk()
    }
  }
  const handleSubmit = () => {
    postData()
  }
  const handleChange = (evt) => {
    setInfo(evt.target.value)
  }
  return (
    <div className={classes.container} style={{ width: 600 }}>
      <TextField
        id="outlined-multiline-static"
        label="填写受理意见"
        multiline
        rows="4"
        value={info}
        defaultValue=""
        onChange={handleChange}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        placeholder="在此输入"
      />
      <Button onClick={handleSubmit} className={classes.button} variant="outlined" color="primary">提交受理意见</Button>
    </div>
  )
}