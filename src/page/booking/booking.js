import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FuctureBooking from "./futureBookings";
import Completed from "./Completed";
import { Link } from "react-router-dom";

import axios from "../../axios";
import useNotification from "../../components/core/snakeBar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [, sendNotification] = useNotification();

  const [value, setValue] = React.useState(0);
  const [AllBookingData, setAllBookingData] = React.useState([]);
  const [AllBookingDataC, setAllBookingDataC] = React.useState([]);
  const [AllBookingDataIC, setAllBookingDataIC] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    axios
      .get(`booking`)
      .then((res) => {
        console.log(res.data, "data");
        setAllBookingData(res.data);
        // setAllBookingDataIC(
        //   res.data.filter((item) => {
        //     item.isComplete === 0
        //   })
        // );
        setAllBookingDataIC(
          res.data ? res.data.filter((x) => x.isComplete == 0) : []
        );
        setAllBookingDataC(
          res.data ? res.data.filter((x) => x.isComplete != 0) : []
        );

        // );
        sendNotification({ msg: "success", variant: "success" });
      })
      .catch((error) => {
        console.log("There was an error!", error.response);
        sendNotification({ msg: "success", variant: "success" });
      });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
        }}
      >
        <div></div>
        <Link
          to="/add-booking"
          style={{
            width: "100px",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            backgroundColor: "#0078D8",
            color: "#fff",
            borderRadius: "12px",
            padding: "10px",
          }}
        >
          ADD
        </Link>
      </div>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Future Bookings" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(1)} />\
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {AllBookingData && AllBookingData.length > 0 && (
          <FuctureBooking data={AllBookingDataIC} />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {AllBookingData && AllBookingData.length > 0 && (
          <Completed data={AllBookingDataC} />
        )}

        {/* <Completed /> */}
      </TabPanel>
    </Box>
  );
}
