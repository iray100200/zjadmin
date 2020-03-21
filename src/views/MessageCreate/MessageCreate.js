import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Notification from 'components/Notification'
import { Redirect } from 'react-router-dom'

import { Page } from 'components';
import {
  Header,
  AboutProject
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  aboutAuthor: {
    marginTop: theme.spacing(3)
  },
  aboutProject: {
    marginTop: theme.spacing(3)
  },
  projectCover: {
    marginTop: theme.spacing(3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  preferences: {
    marginTop: theme.spacing(3)
  },
  actions: {
    marginTop: theme.spacing(3)
  }
}));

const ProjectCreate = () => {
  const values = {}
  const classes = useStyles()
  const handleSubmit = async () => {
    const { title, content } = values
    try {
      const post = await fetch(`/f/v1/comment?title=${title}&content=${content}`, {
        method: 'post'
      })
      const result = await post.json()
      if (result.code === 0) {
        Notification.notice({
          variant: 'success',
          message: '发布成功'
        })
        setTimeout(() => <Redirect to="message" /> , 2000)
      } else {
        Notification.notice({
          variant: 'error',
          message: '发布失败，请重试'
        })
      }
    } catch (e) {
      Notification.notice({
        variant: 'error',
        message: '发布失败，请重试'
      })
    }
  }
  return (
    <Page
      className={classes.root}
      title="Project Create"
    >
      <Header />
      <AboutProject onChange={newValues => Object.assign(values, newValues)} className={classes.aboutProject} />
      <div className={classes.actions}>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
        >
          发布提交
        </Button>
      </div>
    </Page>
  );
};

export default ProjectCreate;
