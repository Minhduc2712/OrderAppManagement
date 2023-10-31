import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import foodCategoryImg01 from "../../assets/images/bread.png";
import foodCategoryImg02 from "../../assets/images/pizza.png";
import foodCategoryImg03 from "../../assets/images/hamburger.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function PopularFood() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: "100%",
        borderradius: "4",
        p: 3,
      }}
    >
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="error"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{ bgcolor: "error.main", display: "flex" }}
          centered
        >
          <Tab
            icon={
              <img
                src={foodCategoryImg01}
                alt=""
                style={{ width: "50px", height: "40px" }}
                onClick={() => setValue(1)}
              />
            }
            label="Bread"
            {...a11yProps(1)}
          />
          <Tab
            icon={
              <img
                src={foodCategoryImg02}
                alt=""
                style={{ width: "24px", height: "24px" }}
              />
            }
            label="Pizza"
            {...a11yProps(2)}
          />
          <Tab
            icon={
              <img
                src={foodCategoryImg03}
                alt=""
                style={{ width: "24px", height: "24px" }}
              />
            }
            label="Burger"
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={1} index={1} dir={theme.direction}>
          âsssss
        </TabPanel>
        <TabPanel value={2} index={2} dir={theme.direction}>
          {value}
        </TabPanel>
        <TabPanel value={3} index={3} dir={theme.direction}>
          {value}
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
