import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ImageViewer from 'components/ImageViewer'
import _ from 'lodash'

const useStyles = makeStyles({
  root: {
    textAlign: 'left',
    border: '1px solid #ececef',
    verticalAlign: 'top'
  }
})

export default (props) => {
  const styles = useStyles()
  const sources = [
    {
      label: '专利公开号',
      dataIndex: ['relatedPartyPatentInformation.publicNumber', 'patentInformationOfTheComplainant.publicNumber']
    }, {
      label: '产品名称',
      dataIndex: ['relatedPartyPatentInformation.title', 'patentInformationOfTheComplainant.title']
    }, {
      label: '产品描述',
      dataIndex: ['relatedPartyPatentInformation.summary', 'patentInformationOfTheComplainant.summary']
    }, {
      label: '图片信息',
      dataIndex: ['reportedImagePath', 'investigatorImagePath'],
      cell: (val) => {
        return <ImageViewer image={val} />
      }
    }, {
      label: '申请号',
      dataIndex: ['relatedPartyPatentInformation.applicationNumber', 'patentInformationOfTheComplainant.applicationNumber']
    }, {
      label: '申请日',
      dataIndex: ['relatedPartyPatentInformation.applicationDate', 'patentInformationOfTheComplainant.applicationDate']
    }, {
      label: '当前专利权人',
      dataIndex: ['relatedPartyPatentInformation.applicant', 'patentInformationOfTheComplainant.applicant']
    }, {
      label: '当前法律状态',
      dataIndex: ['relatedPartyPatentInformation.currentLegalStatus', 'patentInformationOfTheComplainant.currentLegalStatus']
    }, {
      label: 'A技术方案(标题)',
      dataIndex: ['relatedPartyPatentInformation.atsTitle', 'patentInformationOfTheComplainant.atsTitle']
    }, {
      label: '备注',
      dataIndex: ['relatedPartyPatentInformation.remark', 'patentInformationOfTheComplainant.remark']
    }
  ]
  const { data } = props
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Table className={styles.root}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.root} width={'20%'}></TableCell>
            <TableCell className={styles.root} width={'40%'}>举报方</TableCell>
            <TableCell className={styles.root} width={'40%'}>被举报方</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sources.map(obj => {
              const cell = obj.cell || (e => e)
              return <TableRow>
                <TableCell className={styles.root}>{obj.label}</TableCell>
                <TableCell className={styles.root}>{cell(_.get(data, obj.dataIndex[0]))}</TableCell>
                <TableCell className={styles.root}>{cell(_.get(data, obj.dataIndex[1]))}</TableCell>
              </TableRow>
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}