/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors } from '@material-ui/core';
// import BarChartIcon from '@material-ui/icons/BarChart';
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// import ChatIcon from '@material-ui/icons/ChatOutlined';
// import CodeIcon from '@material-ui/icons/Code';
// import DashboardIcon from '@material-ui/icons/DashboardOutlined';
// import ErrorIcon from '@material-ui/icons/ErrorOutline';
// import FolderIcon from '@material-ui/icons/FolderOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
// import ListAltIcon from '@material-ui/icons/ListAlt';
// import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
// import MailIcon from '@material-ui/icons/MailOutlined';
// import PresentToAllIcon from '@material-ui/icons/PresentToAll';
// import PeopleIcon from '@material-ui/icons/PeopleOutlined';
// import PersonIcon from '@material-ui/icons/PersonOutlined';
// import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
// import SettingsIcon from '@material-ui/icons/SettingsOutlined';
// import ViewModuleIcon from '@material-ui/icons/ViewModule';
import DockIcon from '@material-ui/icons/Dock';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SubjectIcon from '@material-ui/icons/Subject';

// import { Label } from 'components';

export default [
  {
    pages: [
      {
        title: '回到首页',
        href: '/home',
        icon: HomeIcon
      },
      {
        title: '投诉受理',
        href: '/complaint',
        icon: DockIcon,
        children: [
          {
            title: '假冒投诉受理',
            href: '/complaint/fake'
          },
          {
            title: '侵权投诉受理',
            href: '/complaint/infringement'
          }
        ]
      },
      {
        title: '主动检测',
        href: '/detect',
        icon: DirectionsRunIcon,
        children: [
          {
            title: '专利',
            href: '/detect/patent'
          },
          {
            title: '商标',
            href: '/detect/trademark'
          }
        ]
      },
      {
        title: '推送抓取',
        href: '/catch',
        icon: SubjectIcon
      },
      {
        title: '通知公告',
        href: '/notice',
        icon: NotificationImportantIcon,
        children: [
          {
            title: '新增公告',
            href: '/notice'
          }
        ]
      },
      {
        title: '在线留言',
        href: '/message',
        icon: QuestionAnswerIcon,
        children: [
          {
            title: '留言列表',
            href: '/message'
          },
          {
            title: '新增留言',
            href: '/message/create'
          }
        ]
      }
    ]
  }
];
