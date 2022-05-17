import React, { useState, useMemo } from "react";
import classNames from "classnames";
import { format, isSameDay, startOfWeek, addDays } from "date-fns";
import { makeStyles } from "@mui/styles";
import { Button, Theme, Typography } from "@mui/material";

// src
import DateStripeActions from "./DateStripeActions";
import { DateFormat } from "../types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: "left",
    minWidth: "600px",
    "& .date-strip-actions": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(1)
    },
    "& .dates-stripe": {
      display: "flex",
      gridGap: 10,
      justifyContent: "space-between",
      alignItems: "baseline",
      flexWrap: "wrap",
      margin: theme.spacing(1),

      "& .week-day": {
        boxShadow: "0 0 5px 2px rgba(0,0,0,0.1)",
        padding: theme.spacing(1),
        cursor: "pointer",
        borderRadius: "5px",
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 90,

        "&.today": {
          border: `1px solid`,
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.light
        },
        "&.selected": {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.grey[100]
        }
      }
    },
    "& .footer": {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1)
    }
  }
}));

const DatesStripe = () => {
  const classes = useStyles();

  const today = new Date();
  const [weekStartDay, setWeekStartDay] = useState(startOfWeek(today));
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [dateFormat, setDateFormat] = useState<DateFormat>(
    DateFormat.descriptive
  );

  const weekDates: Date[] = useMemo(() => {
    return [0, 1, 2, 3, 4, 5, 6].map((dayNumber) =>
      addDays(weekStartDay, dayNumber)
    );
  }, [weekStartDay]);

  const getFormat = () => {
    switch (dateFormat) {
      case "compact":
        return "MM/dd";
      case "descriptive":
        return "EEE, do MMM";
      case "normal":
      default:
        return "MM/dd/yyyy";
    }
  };

  const goToWeek = (date: Date) => {
    setWeekStartDay(startOfWeek(date));
  };

  return (
    <div className={classes.root}>
      <DateStripeActions
        weekStartDay={weekStartDay}
        setWeekStartDay={setWeekStartDay}
        dateFormat={dateFormat}
        setDateFormat={setDateFormat}
      />

      <div className="dates-stripe">
        {weekDates.map((date) => {
          return (
            <div
              onClick={() => setSelectedDate(date)}
              key={date.valueOf()}
              className={classNames({
                "week-day": true,
                today: isSameDay(today, date),
                selected: selectedDate && isSameDay(selectedDate, date)
              })}
            >
              {format(date, getFormat())}
            </div>
          );
        })}
      </div>

      <div className="footer">
        <Typography>
          Today:&nbsp;
          <Button onClick={() => goToWeek(today)}>
            {format(today, getFormat())}
          </Button>
        </Typography>
        {selectedDate && (
          <Typography>
            SelectedDay&nbsp;
            <Button onClick={() => goToWeek(selectedDate)}>
              {format(selectedDate, getFormat())}
            </Button>
          </Typography>
        )}
      </div>
    </div>
  );
};

export default DatesStripe;
