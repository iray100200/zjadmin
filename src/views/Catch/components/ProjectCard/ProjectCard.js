import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import { makeStyles } from '@material-ui/styles'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Link,
  Typography,
  colors
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap'
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2)
    }
  },
  header: {
    maxWidth: '100%',
    width: 500,
    overflow: 'hidden',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      flexBasis: '100%'
    }
  },
  stats: {
    padding: theme.spacing(1),
    width: 200,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  actions: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  }
}))

const ProjectCard = props => {
  const { project, className, ...rest } = props
  const classes = useStyles()

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <img src={project.mmm_pic} width={80} height={80} style={{ minWidth: 80, marginRight: 20 }} />
          <div>
            <strong>{project.patent_title}</strong>
            <Typography style={{ marginTop: 8 }} variant="body2">
              {project.mmm_content}
            </Typography>
            <Typography style={{ marginTop: 4 }} variant="body2">
              {project.buy_source} <b>{project.buy_price && ('￥' + project.buy_price)}</b>
            </Typography>
          </div>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {project.patent_application_number}
          </Typography>
          <Typography variant="body2">
            <div title={project.patent_applicant} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              申请方：{project.patent_applicant}
            </div>
          </Typography>
          <Typography variant="body2">{moment(project.patent_application_date).format('YYYY-MM-DD')}</Typography>
          <Typography variant="body2">
            疑似侵权风险：{project.result}
          </Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{project.patent_public_number}</Typography>
          <Typography variant="body2">专利号</Typography>
          <Typography variant="body2">{moment(project.patent_public_date).format('YYYY-MM-DD')}</Typography>
        </div>
        <div className={classes.actions}>
          <a target="_blank" href={project.mmm_url}>
            <Button
              color="primary"
              size="small"
              variant="outlined"
            >
              查看
          </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
}

export default ProjectCard
