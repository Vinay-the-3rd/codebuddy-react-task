import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab } from "@mui/material";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { style } from "./Form.css";

const Home = () => {
  // Define state to manage the active tab
  const [value, setValue] = useState("1");

  // Event handler to change the active tab
  const handleChange = (event, newValue) => {
    // Prevent changing to a tab that is ahead of the current tab
    if (value < newValue) {
      return;
    }
    // Update the active tab value
    setValue(newValue);
  };
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <div className="form1box">
        <TabContext value={value}>
          <Box sx={style.tabContainer}>
            <TabList
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={style.tabListStyle}
            >
              <Tab label="Form 1" value="1" />
              <Tab label="Form 2" value="2" />
              <Tab label="Form 3" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Form1 tab={setValue} />
          </TabPanel>
          <TabPanel value="2">
            <Form2 tab={setValue} />
          </TabPanel>
          <TabPanel value="3">
            <Form3 tab={setValue} />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default Home;
