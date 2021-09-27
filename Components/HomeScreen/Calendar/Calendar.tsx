import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";

const Calendar = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CalendarPicker date={new Date()} onChange={(e) => {}} />
    </LocalizationProvider>
  );
};

export default Calendar;
