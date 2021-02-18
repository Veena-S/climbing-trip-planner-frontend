import React, { useState } from "react";
import "./styles.css";
import "react-dates/initialize";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";

const FORM_FIELD_NAMES = {
  TRIP_NAME: "fTripName",
  CREATED_BY: "fCreatedBy",
};
const { TRIP_NAME, CREATED_BY } = FORM_FIELD_NAMES;

export default function CreateNewTrip() {
  const [formFields, setFormFields] = useState({
    TRIP_NAME: null,
    CREATED_BY: null,
  });

  const handleFieldChange = (e) => {
    const newFormFields = { ...formFields };
    newFormFields.TRIP_NAME = e.target.value;
    setFormFields = newFormFields;
  };

  // =================REACT-DATES==============================
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [focusedInput, setFocusedInput] = useState(null);

  const handleOnDateChange = ({ startDate, endDate }) => {
    setDates({ startDate, endDate });
  };

  const { startDate, endDate } = dates;

  if (startDate && endDate) {
    console.log(startDate);
    var formattedStartDate = startDate.format("dddd Do MMMM YYYY");
    var formattedEndDate = endDate.format("dddd Do MMMM YYYY");
  }
  // =========================================================
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p>Trip name</p>
          <input
            type="text"
            onChange={(e) => {
              handleFieldChange(e, TRIP_NAME);
            }}
            placeholder="Insert name of trip"
          >
            {formFields.TRIP_NAME}
          </input>
        </div>
        <div className="col">
          <p>Created By:</p>
          <input
            type="text"
            onChange={(e) => {
              handleFieldChange(e, CREATED_BY);
            }}
            placeholder="Insert email address"
          >
            {formFields.CREATED_BY}
          </input>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            {startDate && endDate && (
              <div>
                <h4>from: {formattedStartDate}</h4>
                <h4>to: {formattedEndDate}</h4>
              </div>
            )}
            <DateRangePicker
              startDate={startDate} // momentPropTypes.momentObj or null,
              startDateId="start-date" // PropTypes.string.isRequired,
              endDate={endDate} // momentPropTypes.momentObj or null,
              endDateId="end-date" // PropTypes.string.isRequired,
              onDatesChange={handleOnDateChange} // PropTypes.func.isRequired,
              focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col"></div>
      </div>
    </div>
  );
}
