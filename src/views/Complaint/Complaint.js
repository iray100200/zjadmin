import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Tabs, Tab, Divider, colors } from '@material-ui/core'

import { Page } from 'components'
import { Header, Fake, Infringement } from './components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0
  },
  inner: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}))

const Profile = props => {
  const { match, history } = props
  const classes = useStyles()
  const { tab } = match.params

  const handleTabsChange = (event, value) => {
    history.push(value)
  }

  const tabs = [
    { value: 'fake', label: '假冒投诉受理' },
    { value: 'infringement', label: '侵权投诉受理' }
  ]

  if (!tab) {
    return <Redirect to={`/complaint/fake`} />
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/errors/error-404" />
  }

  return (
    <Page
      className={classes.root}
      title="投诉受理"
    >
      <Header />
      <div className={classes.inner}>
        <Tabs
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={tab}
          variant="scrollable"
        >
          {tabs.map(tab => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {tab === 'fake' && <Fake />}
          {tab === 'infringement' && <Infringement />}
        </div>
      </div>
    </Page>
  )
}

Profile.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default Profile
