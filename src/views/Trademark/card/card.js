import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Link,
  Typography,
  colors,
  CardMedia
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
    paddingRight: theme.spacing(2),
    width: 480,
    overflow: 'hidden',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      flexBasis: '100%'
    }
  },
  stats: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 0.5,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  stats2: {
    padding: theme.spacing(1),
    flexGrow: 0.4,
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
  const { project = {}, className, ...rest } = props
  const classes = useStyles()
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <CardMedia image={project.buyPic} style={{ minWidth: 80, marginRight: 20 }} />
          <div>
            <strong>
              {project.buyName}
            </strong>
            <Typography style={{ marginTop: 6 }} variant="body2">
              <span>
                {project.buyContent}
              </span>
            </Typography>
            <Typography style={{ marginTop: 4 }} variant="body2">
              {project.buySource} <b>{project.buyPrice && ('￥' + project.buyPrice)}</b>
            </Typography>
          </div>
        </div>
        <div className={classes.stats}>
          <Typography variant="body2">
            申请人：{project.trademarkApplicationCnname}
          </Typography>
          <Typography variant="body2">
            申请地址：{project.trademarkApplicationCnaddress}
          </Typography>
          <Typography variant="body2">
            代理公司：{project.trademarkAgency}
          </Typography>
          <Typography variant="body2">
            申请号码：{project.trademarkApplicationNumber}
          </Typography>
        </div>
        <div className={classes.stats2}>
          <Typography variant="body2">
            商标名称：{project.trademarkName}
          </Typography>
          <Typography variant="body2">
            商标类别：{project.buyTypeName}
          </Typography>
          <Typography variant="body2">
            国际分类号：{project.trademarkInternationalNum}
          </Typography>
          <Typography variant="body2">
            商标状态：{project.trademarkStatus}
          </Typography>

        </div>
        <div className={classes.actions}>
          <a target="_blank" href={project.buyUrl}>
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
