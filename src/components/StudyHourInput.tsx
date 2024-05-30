import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useStudyHours } from "./Contexts/StudyTimeContext";

export default function BasicDatePicker() {
  const { studyHourInput, setStudyHourInput } = useStudyHours();
  const [studyHours, setStudyHours] = useState<StudyHours[]>([]);

  type StudyHours = [date: Date, studyHour: number, id: number];

  const handleChangeHour = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStudyHourInput(e.target.value);
  };

  return (
    <Box
      border={"1px solid rgba(0, 0, 0, 0.12)"}
      borderRadius={"4px"}
      width={"fit-content"}
      padding={"5px 15px"}
      height={"110px"}
      marginBottom={"20px"}
    >
      <Typography fontSize={"20px"}>本日の学習時間は？</Typography>
      <form style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="日付" />
          </DemoContainer>
        </LocalizationProvider>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          display={"flex"}
          alignItems={"flex-end"}
        >
          <TextField
            id="standard-basic"
            label="時間を入力"
            variant="standard"
            value={studyHourInput}
            onChange={(e) => {
              handleChangeHour(e);
            }}
          />
          <Typography marginRight={"16px"}>時間</Typography>
          <TextField id="standard-basic" label="分を入力" variant="standard" />
          <Typography>分</Typography>
        </Box>

        <Stack spacing={2} direction="row">
          <Button variant="contained">追加</Button>
        </Stack>
      </form>
    </Box>
  );
}
