import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import TotalProgrammingStudyHours from "./Cards/TotalProgrammingStudyHours ";
import MonthlyProgrammingStudyHours from "./Cards/MonthlyProgrammingStudyHours";
import ProgrammingDod from "./Cards/ProgrammingDod";
import ProgrammingWow from "./Cards/ProgrammingWow";
import ProgrammingMom from "./Cards/ProgrammingMom";
import { dailyGraph } from "./Daily-graph";
import StudyHoursYesterday from "./Cards/StudyHoursYesterday";
import BasicDatePicker from "./StudyHourInput";
import StudyHoursToday from "./Cards/StudyHoursToday";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const listItem = ["Home", "Report"];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Study Time
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {listItem.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? <HomeIcon /> : <BarChartIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Box
          display={"flex"}
          gap={"20px"}
          alignItems={"center"}
          marginBottom={"20px"}
        >
          {BasicDatePicker()}
          {StudyHoursToday()}
        </Box>
        <Box display={"flex"} gap={"20px"} marginBottom={"20px"}>
          <TotalProgrammingStudyHours />
          <MonthlyProgrammingStudyHours />
          <StudyHoursYesterday />
        </Box>
        <Box display={"flex"} gap={"20px"} paddingTop={"20px"}>
          <ProgrammingDod />
          <ProgrammingWow />
          <ProgrammingMom />
        </Box>
        <Box>{dailyGraph()}</Box>
      </Box>
    </Box>
  );
}
