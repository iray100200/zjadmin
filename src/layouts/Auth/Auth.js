import React, { Fragment, Suspense, useEffect, useState } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';

import { Topbar } from './components';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
}));

const fetchAccount = () => {
  return fetch('/api/account')
}

const Auth = props => {
  const { route } = props;
  const [userName, setUserName] = useState('')
  const classes = useStyles();
  fetchAccount().then(res => {
    setUserName(res.userName)
  })
  return (
    <Fragment>
      <Topbar name={userName} />
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes)}
        </Suspense>
      </main>
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object
};

export default Auth;
