import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { addDays, subDays } from "date-fns";

// src
import { DateFormat } from "../types";

interface DateStripeActionsProps {
  weekStartDay: Date;
  setWeekStartDay: (_: Date) => void;

  dateFormat: DateFormat;
  setDateFormat: (_: DateFormat) => void;
}

const DateStripeActions = ({
  weekStartDay,
  setWeekStartDay,
  dateFormat,
  setDateFormat
}: DateStripeActionsProps) => {
  const selectPrevWeek = () => {
    setWeekStartDay(subDays(weekStartDay, 7));
  };

  const selectNextWeek = () => {
    setWeekStartDay(addDays(weekStartDay, 7));
  };

  const handleFormatChange = (event: SelectChangeEvent<DateFormat>) => {
    setDateFormat(event.target.value as DateFormat);
  };

  return (
    <div className="date-strip-actions">
      <Button
        startIcon={<ChevronLeft />}
        color="secondary"
        variant="contained"
        onClick={selectPrevWeek}
      >
        Prev Week
      </Button>

      <FormControl
        size="small"
        fullWidth
        sx={{ maxWidth: 300 }}
        color="primary"
      >
        <InputLabel id="label">Format</InputLabel>
        <Select
          labelId="label"
          id="select"
          value={dateFormat}
          label="Format"
          onChange={handleFormatChange}
        >
          <MenuItem value={DateFormat.descriptive}>Descriptive</MenuItem>
          <MenuItem value={DateFormat.compact}>Compact</MenuItem>
          <MenuItem value={DateFormat.normal}>Normal</MenuItem>
        </Select>
      </FormControl>

      <Button
        endIcon={<ChevronRight />}
        color="secondary"
        variant="contained"
        onClick={selectNextWeek}
      >
        Next Week
      </Button>
    </div>
  );
};

export default DateStripeActions;
