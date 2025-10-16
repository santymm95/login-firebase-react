import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../assets/styles/calendar.css";

const CalendarComponent = ({ onClose }) => {
  const [date, setDate] = useState(new Date());

  return (
    <div
      className="calendar-modal animate-drop"
      onMouseEnter={() => {}} // Esto evita que se cierre al pasar de botón a calendario
      onMouseLeave={onClose} // Cuando sales del calendario se activa el cierre
    >
      <div className="calendar-content">
        <Calendar
          onChange={setDate}
          value={date}
          locale="es-ES"
          formatShortWeekday={(locale, date) =>
            ["D", "L", "M", "M", "J", "V", "S"][date.getDay()]
          }
          tileClassName="calendar-tile"
        />
        <div className="calendar-footer">
          <button className="calendar-close-btn" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
