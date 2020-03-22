/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';
import Notice from './views/Notice'
import Message from './views/Message'
import Catch from './views/Catch'
import Home from './views/Home'
import Detect from './views/Detect'
import Trademark from './views/Trademark'

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/home" />
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/logout',
        exact: true,
        component: () => <Redirect to="/account/logout" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '/',
    component: DashboardLayout,
    routes: [
      {
        path: '/home',
        exact: true,
        component: Home
      },
      {
        path: '/notice',
        exact: true,
        component: Notice
      },
      {
        path: '/detect/patent',
        exact: true,
        component: Detect
      },
      {
        path: '/detect/trademark',
        exact: true,
        component: Trademark
      },
      {
        path: '/message',
        exact: true,
        component: Message
      },
      {
        path: '/message/create',
        exact: true,
        component: lazy(() => import('views/MessageCreate'))
      },
      {
        path: '/catch',
        exact: true,
        component: Catch
      },
      {
        path: '/complaint/:tab',
        exact: true,
        component: lazy(() => import('views/Complaint'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];

export default routes;
