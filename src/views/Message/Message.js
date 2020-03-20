import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import { Page } from 'components';
import { Header, Results } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}))

const CustomerManagementList = () => {
  const classes = useStyles()
  const [pageObject, setPage] = useState({
    pageNum: 0,
    pageSize: 10
  })
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const { pageNum, pageSize } = pageObject

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch(`/f/v1/comments?pageNum=${pageNum + 1}&pageSize=${pageSize}`)
    const result = await res.json()
    setData(_.get(result, 'body', {}))
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [pageObject])

  const handlePageChange = (pageNum, pageSize) => {
    setPage({
      pageNum,
      pageSize
    })
  }

  return (
    <Page
      className={classes.root}
    >
      <Header />
      {data && (
        <Results
          loading={loading}
          onPageChange={handlePageChange}
          className={classes.results}
          data={data}
        />
      )}
    </Page>
  )
}

export default CustomerManagementList;
