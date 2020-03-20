import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardHeader,
  CardContent,
  TextField
} from '@material-ui/core'

import { RichEditor } from 'components'

const useStyles = makeStyles(theme => ({
  root: {},
  alert: {
    marginBottom: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  fieldHint: {
    margin: theme.spacing(1, 0)
  },
  tags: {
    marginTop: theme.spacing(1),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  flexGrow: {
    flexGrow: 1
  },
  dateField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}))

const AboutProject = props => {
  const { className, onChange = e => e, ...rest } = props

  const classes = useStyles()

  const initialValues = {
    title: '',
    content: ''
  }

  const [values, setValues] = useState({ ...initialValues })

  const handleFieldChange = (event, field, value) => {
    if (event) {
      event.persist && event.persist()
    }
    setValues(values => {
      const newValues =  {
        ...values,
        [field]: value
      }
      onChange(newValues)
      return newValues
    })
  }

  console.log('notice', values)
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="新建留言" />
      <CardContent>
        <form>
          <div className={classes.formGroup}>
            <TextField
              style={{ marginBottom: 0 }}
              fullWidth
              label="在此输入标题"
              name="name"
              onChange={event =>
                handleFieldChange(event, 'title', event.target.value)
              }
              variant="outlined"
            />
          </div>
          <RichEditor
            placeholder="在此输入内容"
            onChange={value =>
              handleFieldChange(null, 'content', value)
            } />
        </form>
      </CardContent>
    </Card>
  )
}

AboutProject.propTypes = {
  className: PropTypes.string
}

export default AboutProject
