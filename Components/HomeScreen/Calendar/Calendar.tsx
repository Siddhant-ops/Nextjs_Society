import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import CalendarPicker from "@material-ui/lab/CalendarPicker";

const Calendar = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CalendarPicker date={new Date()} onChange={(e) => {}} />
    </LocalizationProvider>
  );
};

export default Calendar;
