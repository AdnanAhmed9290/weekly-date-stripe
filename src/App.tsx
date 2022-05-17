import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// src
import DatesStripe from "./components/DatesStripe";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Weekly Calender</h1>

      <DatesStripe dateFormat="compact" />
    </div>
  );
}
