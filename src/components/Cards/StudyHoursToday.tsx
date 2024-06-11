import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useStudyHours } from "../Contexts/StudyTimeContext";
import dayjs from "dayjs";

export default function StudyHoursToday() {
  const { studyHourToday, studyMinToday } = useStudyHours();
  let today = new Date();
  let todayDate = `（${today.getMonth() + 1}月${today.getDate()}日）`;
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          本日の学習時間 {todayDate}
        </Typography>
        <Box
          display={"flex"}
          alignItems={"flex-end"}
          justifyContent={"center"}
          paddingTop={"25px"}
        >
          <Typography variant="body1" fontSize={"70px"} lineHeight="1">
            {studyHourToday}
          </Typography>
          <Typography fontSize={"35px"} lineHeight="1" marginRight={"10px"}>
            h
          </Typography>
          <Typography variant="body1" fontSize={"70px"} lineHeight="1">
            {studyMinToday}
          </Typography>
          <Typography fontSize={"35px"} lineHeight="1">
            min.
          </Typography>
        </Box>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ width: 400 }}>
        {card}
      </Card>
    </Box>
  );
}
