import React from "react";
import CalendarComponent from "../../../../components/Common/Calendar";
import Events from "./Events";

const Calendar = () => {
  return (
    <>
      <CalendarComponent view={{ week: true, day: true }} events={Events} />
    </>
  );
};

export default Calendar;
