import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    height: 300,
    backgroundImage: `url(/images/covers/cover_2.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: '0 -100%',
    boxShadow: '0 0 1px rgba(0, 0, 0, 0.7)'
  }
}))

const Header = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            欢迎使用镇江市专利网站管理系统
          </Typography>
          <Typography
            component="h1"
            variant="h2"
          >
            投诉受理
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
