import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useStudyHours } from "../Contexts/StudyTimeContext";

export default function MonthlyProgrammingStudyHours() {
  const { studyHourWow, studyMinWow, wowPositiveNegative } = useStudyHours();
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          前週比
        </Typography>
        <Box
          display={"flex"}
          alignItems={"flex-end"}
          justifyContent={"center"}
          paddingTop={"25px"}
        >
          <Typography variant="body1" fontSize={"70px"} lineHeight="1">
            {wowPositiveNegative}
          </Typography>
          <Typography variant="body1" fontSize={"70px"} lineHeight="1">
            {studyHourWow}
          </Typography>
          <Typography fontSize={"35px"} lineHeight="1" marginRight={"10px"}>
            h
          </Typography>
          <Typography variant="body1" fontSize={"70px"} lineHeight="1">
            {studyMinWow}
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
