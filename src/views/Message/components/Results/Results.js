import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Table,
  Link,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton'
import Chip from '@material-ui/core/Chip'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  }
}));

const Results = props => {
  const classes = useStyles()
  const { className, data, loading, onPageChange = e => e, ...rest } = props
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, page) => {
    setPage(page)
    onPageChange(page, rowsPerPage)
  }

  const handleChangeRowsPerPage = event => {
    const pageSize = event.target.value
    setRowsPerPage(pageSize)
    onPageChange(page, pageSize)
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >
        总数 {data.count} 条 / 第 {data.pageNo} 页
      </Typography>
      <Card>
        <CardHeader
          action={<Button color="primary"
            component={RouterLink}
            size="small"
            to={'/message/create'}>我要留言</Button>}
          title="我的全部留言"
        />
        <Divider />
        {
          loading ? <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            数据加载中...
          </div> : <div>
              <CardContent className={classes.content}>
                <PerfectScrollbar>
                  <div className={classes.inner}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell width={'25%'}><label style={{ marginLeft: 10 }}>标题</label></TableCell>
                          <TableCell width={'15%'}>留言时间</TableCell>
                          <TableCell width={'15%'}>回复人</TableCell>
                          <TableCell width={'15%'}>留言者</TableCell>
                          <TableCell width={'15%'}>状态</TableCell>
                          <TableCell width={'15%'}>操作</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.list && data.list.slice(0, rowsPerPage).map((customer, index) => (
                          <TableRow key={index}>
                            <TableCell padding="checkbox">
                              <div style={{ marginLeft: 24 }}>
                                {customer.title}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className={classes.nameCell}>
                                {moment(customer.releaseTime).format('YYYY-MM-DD HH:mm:ss')}
                              </div>
                            </TableCell>
                            <TableCell>{customer.respondent}</TableCell>
                            <TableCell>{customer.commenter}</TableCell>
                            <TableCell>
                              {customer.commentStatus === '0' ? <Chip color="secondary" label="未回复" /> : <Chip label="已回复" />}
                            </TableCell>
                            <TableCell>
                              <Button variant="outlined" type="primary">查看</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </PerfectScrollbar>
              </CardContent>
              <CardActions className={classes.actions}>
                <TablePagination
                  component="div"
                  count={data.count}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </CardActions>
            </div>
        }
      </Card>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired
}

Results.getInitialProps = () => {
  return
}

Results.defaultProps = {
  customers: []
}

export default Results;
