import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useStudyHours } from "../Contexts/StudyTimeContext";
import { da } from "@faker-js/faker";

export default function MonthlyProgrammingStudyHours() {
  const { studyHourMonthly, studyMinMonthly } = useStudyHours();
  const today = new Date();
  const month = `${today.getMonth() + 1}月`;
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          {month}プログラミング学習時間
        </Typography>
        <Box
          display={"flex"}
          alignItems={"flex-end"}
          justifyContent={"center"}
          paddingTop={"25px"}
        >
          <Typography variant="body1" fontSize={"70px"} lineHeight="1">
            {studyHourMonthly}
          </Typography>
          <Typography fontSize={"35px"} lineHeight="1" marginRight={"10px"}>
            h
          </Typography>
          <Typography variant="body1" fontSize={"70px"} lineHeight="1">
            {studyMinMonthly}
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
