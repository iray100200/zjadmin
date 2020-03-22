import React, { useState, useEffect, useCallback } from 'react'
import { Grid, Card, CardContent, Button, FormControl, MenuItem, Select, Tabs, Tab, Avatar } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { fade, makeStyles } from '@material-ui/core/styles';
import Paginate from '../paginate';
import fetch from 'isomorphic-unfetch';
import querystring from 'querystring';
import ItemCard from '../card';
import Autocomplete from '@material-ui/lab/Autocomplete'
import clsx from 'clsx'

const apps = [
  '/images/icon_yj_', '/images/icon_xty_', '/images/icon_zyj_',
  '/images/icon_whj_', '/images/icon_xyy_', '/images/icon_temperature_'
]

const apps_name = ['眼镜', '血糖仪', '制氧机', '雾化器', '血压计', '电子温度计']

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  content: {
    marginTop: -theme.spacing(2)
  },
  results: {
    marginTop: theme.spacing(2)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  },
  search: {
    width: 600,
    marginLeft: 0,
    display: 'flex',
    alignItems: 'center',
    height: 55,
    overflow: 'hidden'
  },
  apps: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 54,
    background: '#0080fa',
    color: '#fff',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    '&:hover': {
      backgroundColor: '#0060da'
    }
  }
}))

const useStateWithCallback = (initilValue, callBack) => {
  const [state, setState] = useState(initilValue);
  useEffect(() => callBack(state), [state]);
  return [state, setState];
}

export default (props) => {
  const [trademarkType, setTrademarkType] = useState([])
  const [searchType, setSearchType] = useState("buyTypeName")
  const [searched, setSearched] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [total, setTotal] = useState('')
  const [data, setData] = useState([])
  const [pageNum, setPageNum] = useState(null)
  const [trademarkStatus, setTrademarkStatus] = useState("已注册")
  const handlePageChange = (page) => {
    fetchData(page.selected)
  }
  useEffect(() => {
    if (keyword) {
      fetchData()
    }
  }, [trademarkStatus, trademarkType])
  const fetchData = async (page) => {
    page = page || 0
    setPageNum(page)
    const params = querystring.stringify({
      pageNo: page + 1,
      pageSize: 10,
      [searchType]: keyword,
      trademarkStatus,
      trademarkType: trademarkType.map(i => apps_name[i]).join(',')
    })
    const res = await fetch(`/f/v1/suspectedTrademark?${params}`, {
      method: 'get'
    })
    const result = await res.json()
    const { list, count: total } = result.body
    setTotal(total)
    setData(list)
    setSearched(true)
  }
  const handleSearch = async () => {
    fetchData()
  }
  function debounce(func, wait) {
    var timeout;
    return function (evt) {
      const value = evt.target.value
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func.call(this, value);
      }, wait)
    }
  }
  const handleKeywordChange = debounce((value) => {
    setKeyword(value)
  }, 500)
  const handleStatusChange = (evt, value) => {
    setTrademarkStatus(value)
  }
  const handleSearchTypeChange = evt => {
    setSearchType(evt.target.value)
  }
  const classes = useStyles()
  const handleTypeChange = index => () => {
    if (trademarkType.indexOf(index) > -1) {
      setTrademarkType([...trademarkType.filter(o => o !== index)])
    } else {
      trademarkType.push(index)
      setTrademarkType([...trademarkType])
    }
  }
  return (
    <Card style={{ boxShadow: 'none' }}>
      <CardContent className={classes.content}>
        <Tabs value={trademarkStatus} onChange={handleStatusChange}>
          <Tab value="已注册" label="已注册" />
          <Tab value="待审中" label="待审中" />
          <Tab value="已驳回" label="已驳回" />
          <Tab value="已审批" label="已审批" />
          <Tab value="已销亡" label="已销亡" />
          <Tab value="未获取" label="未获取" />
        </Tabs>
        <Grid>
          <Grid item style={{ display: 'flex', padding: 0, paddingTop: 32 }} xs={12}>
            <FormControl style={{ width: 180, marginRight: 12 }} variant="outlined">
              <Select onChange={handleSearchTypeChange} value={searchType} fullWidth>
                <MenuItem value={"buyTypeName"}>产品名称</MenuItem>
                <MenuItem value={"trademarkAgency"}>代理机构</MenuItem>
                <MenuItem value={"trademarkApplicationCnname"}>申请人</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.search}>
              <TextField
                className="Mui-search"
                variant="outlined"
                fullWidth
                autoFocus
                placeholder="输入关键字搜索"
                onChange={handleKeywordChange}
              />
              <Button onClick={handleSearch} className={classes.button}>搜索</Button>
            </div>
          </Grid>
          <Grid className={classes.apps} container spacing={6}>
            {apps.map((value, index) => {
              const state = trademarkType.indexOf(index) > -1 ? 'on' : 'off'
              return (
                <Grid key={value} item>
                  <div className={classes.app}>
                    <Avatar onClick={handleTypeChange(index)} variant="rounded" src={value + state + '.png'} />
                    <span>
                      {apps_name[index]}
                    </span>
                  </div>
                </Grid>
              )
            })}
          </Grid>
          {
            data && data.length ? <Grid item xs={12}>
              <div className={classes.results}>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  共发现{total}条记录
              </Typography>
                {
                  data.map(project => (
                    <ItemCard
                      key={project.id}
                      project={project}
                    />
                  ))
                }
              </div>
              <div className={classes.paginate}>
                <Paginate forcePage={pageNum} onPageChange={handlePageChange} pageCount={Math.ceil(total / 10)} />
              </div>
            </Grid> : searched && <div style={{ padding: 40, textAlign: 'center' }}>
              <Typography variant="h4">抱歉，没有发现数据</Typography>
            </div>
          }
        </Grid>
      </CardContent>
    </Card>
  )
}