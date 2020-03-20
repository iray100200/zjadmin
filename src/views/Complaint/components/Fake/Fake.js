import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import querystring from 'query-string'
import fetch from 'isomorphic-unfetch'
import List from './List'

const useStyles = makeStyles(theme => ({
  root: {},
  posts: {
    marginTop: theme.spacing(2)
  },
  post: {
    marginBottom: theme.spacing(2)
  }
}))

const Timeline = props => {
  const { className, ...rest } = props

  const classes = useStyles()
  const [data, setData] = useState({
    list: [],
    count: 0,
    pageNo: 1
  })

  const fetchPosts = async () => {
    const search = querystring.stringify({
      pageNum: 1,
      pageSize: 10,
      complaintType: 1
    })
    const res = await fetch(`/f/v1/rights-protection-createDate-complaintType?${search}`)
    const result = await res.json()
    setData(result.body)
  }
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.posts}>
        {
          data && data.list.length > 0 ? <List onRefresh={fetchPosts} data={data} /> :
            <Card>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200 }}>
                  <span style={{ padding: 8 }}>
                    <NotInterestedIcon style={{ fontSize: 36 }} />
                  </span>
                  <Typography variant="h3">
                    没有数据
                </Typography>
                </div>
              </CardContent>
            </Card>
        }
      </div>
    </div>
  )
}

Timeline.propTypes = {
  className: PropTypes.string
}

export default Timeline
