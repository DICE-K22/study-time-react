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
import dayjs, { Dayjs } from "dayjs";

export default function BasicDatePicker() {
  const { studyDayInput, setStudyDayInput } = useStudyHours();
  const { studyHourInput, setStudyHourInput } = useStudyHours();
  const { studyMinInput, setStudyMinInput } = useStudyHours();
  const { studyHours, setStudyHours } = useStudyHours();
  const { studyMins, setStudyMins } = useStudyHours();
  const [errorHour, setErrorHour] = useState<string | null>(null);
  const [errorMin, setErrorMin] = useState<string | null>(null);
  const [errorDate, setErrorDate] = useState<string | null>(null);

  type StudyHours = {
    date: Date;
    studyHour: string;
    studyMin: string;
    id: number;
  };

  const handleChangeDay = (date: Dayjs | null) => {
    setStudyDayInput(date ? date.toDate() : null);
  };

  const handleChangeHour = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStudyHourInput(e.target.value);
  };

  const handleChangeMin = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStudyMinInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studyDayInput) {
      setErrorDate("日付を選択してください");
      return;
    }

    if (!studyHourInput) {
      setErrorHour("学習時間を入力してください");
      return;
    }

    if (!studyMinInput) {
      setErrorMin("学習分を入力してください");
      return;
    }

    const newStudyHours: StudyHours = {
      date: studyDayInput,
      studyHour: studyHourInput,
      studyMin: studyMinInput,
      id: studyHours.length,
    };

    const newStudyHoursData = [...studyHours, newStudyHours];
    setStudyHours(newStudyHoursData);
    setStudyHourInput("");
    setStudyMinInput("");
    setStudyDayInput(null);
    setErrorHour(null);
    setErrorMin(null);
    setErrorDate(null);
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
      <Typography fontSize={"20px"}>本日の学習時間は？{}</Typography>
      <form
        style={{ display: "flex", alignItems: "center", gap: "16px" }}
        onSubmit={handleSubmit}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="日付"
              value={studyDayInput ? dayjs(studyDayInput) : null}
              onChange={handleChangeDay}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Box display={"flex"} alignItems={"flex-end"}>
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
          <TextField
            id="standard-basic"
            label="分を入力"
            variant="standard"
            value={studyMinInput}
            onChange={(e) => {
              handleChangeMin(e);
            }}
          />
          <Typography>分</Typography>
        </Box>

        <Stack spacing={2} direction="row">
          <Button variant="contained" type="submit">
            追加
          </Button>
        </Stack>
      </form>
      {errorDate && (
        <Typography color="error" variant="body2" padding={"10px"}>
          {errorDate}
        </Typography>
      )}
      {errorHour && (
        <Typography color="error" variant="body2" padding={"10px"}>
          {errorHour}
        </Typography>
      )}
      {errorMin && (
        <Typography color="error" variant="body2" padding={"10px"}>
          {errorMin}
        </Typography>
      )}
    </Box>
  );
}
