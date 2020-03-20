import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import fetch from 'isomorphic-unfetch'
import { Page, Paginate } from 'components'
import { Header, ProjectCard } from './components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}))

const ProjectManagementList = () => {
  const classes = useStyles()
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [type] = useState(1)
  const [data, setData] = useState([])

  const fetchProjects = async () => {
    const res = await fetch(`/f/v1/get-suspected-push?pageNum=${page + 1}&pageSize=10&similarity_type=${type}`)
    const result = await res.json()
    const data = result.body.retList
    setData(data)
    setTotal(result.body.totalPage)
  }
  const handlePageChange = (page) => {
    setPage(page.selected)
  }
  useEffect(() => {
    fetchProjects()
  }, [page])

  return (
    <Page
      className={classes.root}
      title="Project Management List"
    >
      <Header />
      
      <div className={classes.results}>
        <Typography
          color="textSecondary"
          gutterBottom
          variant="body2"
        >
          共发现{total}条记录
        </Typography>
        {data.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
      <div className={classes.paginate}>
        <Paginate onPageChange={handlePageChange} pageCount={Math.ceil(total / 10)} />
      </div>
    </Page>
  )
}

export default ProjectManagementList
