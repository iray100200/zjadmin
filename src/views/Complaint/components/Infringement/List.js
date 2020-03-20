import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment'
import Modal from '../Modal'
import Chip from '@material-ui/core/Chip'
import Compare from '../Compare'
import Process from '../Process'
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
  const { onRefresh = e => e } = props
  const classes = useStyles()
  const { className, data, onPageChange = e => e, ...rest } = props
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

  const handleOk = () => {
    modal.current.close()
    onRefresh()
  }
  const modal = useRef(null)
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
          title="投诉列表"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell width={140}><label style={{ marginLeft: 10 }}>被举报产品名称</label></TableCell>
                    <TableCell width={140}>被举报专利号</TableCell>
                    <TableCell width={130}>举报时间</TableCell>
                    <TableCell width={100}>举报人</TableCell>
                    <TableCell width={120}>举报人电话</TableCell>
                    <TableCell width={100}>受理状态</TableCell>
                    <TableCell width={180}>受理意见</TableCell>
                    <TableCell width={100}>对比详情</TableCell>
                    <TableCell width={120}>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.list && data.list.slice(0, rowsPerPage).map(customer => (
                    <TableRow>
                      <TableCell padding="checkbox">
                        <div style={{ marginLeft: 24 }}>
                          {customer.reportedProductName}
                        </div>
                      </TableCell>
                      <TableCell>
                        {customer.reportedPatentNumber}
                      </TableCell>
                      <TableCell>
                        {moment(customer.createDate).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell>{customer.informer}</TableCell>
                      <TableCell>{customer.informerContact}</TableCell>
                      <TableCell>
                        {customer.acceptanceStatus == '1' ? <Chip color="secondary" label="未受理" /> : <Chip label="已受理" />}
                      </TableCell>
                      <TableCell>
                        {customer.acceptanceDescription}
                      </TableCell>
                      <TableCell>
                        <Modal title="专利信息对比" label="对比">
                          <div style={{ width: 760 }}>
                            <Compare caption={customer.reportedProductName} data={customer} />
                          </div>
                        </Modal>
                      </TableCell>
                      <TableCell>
                        <Modal ref={modal} label="受理" title="投诉受理" variant="outlined" color="secondary">
                          <Process onOk={handleOk} value={customer.acceptanceDescription} id={customer.id} />
                        </Modal>
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
