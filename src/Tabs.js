import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 10,
    margin: theme.spacing(5, 5, 5, 5),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 3px 5px 2px #C2C1C1',
  },
  app: {
    backgroundColor: '#0055A5',
    fontSize: 22,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tab: {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
  }
}));

const StyledTab = withStyles({
    root: {
        fontSize: 21,
        textTransform: 'none',
        padding: '16px',
    },
  })(Tab);

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.app}>
        <Tabs value={value} onChange={handleChange} aria-label="AR Tagging Tabs">
          <StyledTab label="Steering Wheel" {...a11yProps(0)} />
          <StyledTab label="Gauge Cluster" {...a11yProps(1)} />
          <StyledTab label="Infotainment Center" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Steering Wheel
      </TabPanel>
      <TabPanel value={value} index={1}>
        Gauge Cluster
      </TabPanel>
      <TabPanel value={value} index={2}>
        Infotainment Center
      </TabPanel>
    </div>
  );
}