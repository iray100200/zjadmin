import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import { zhCN } from '@material-ui/core/locale'

const theme = createMuiTheme({
  palette,
  typography,
  overrides
}, zhCN);

export default theme;
