import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import "react-dates/initialize";
import { createNewTripAction, TripContext } from "../store.js";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

const FORM_FIELD_NAMES = {
  TRIP_NAME: "name",
  CREATED_BY: "creator",
};
const { TRIP_NAME, CREATED_BY } = FORM_FIELD_NAMES;

export default function CreateNewTrip() {
  const { store, dispatch } = useContext(TripContext);
  const { newTripData } = store.tripFormData;

  const [formFields, setFormFields] = useState({
    [TRIP_NAME]: "",
    [CREATED_BY]: "",
  });

  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [focusedInput, setFocusedInput] = useState(null);

  const handleFieldChange = (e, correspondingFormField) => {
    const newFormFields = { ...formFields };
    newFormFields[`${correspondingFormField}`] = e.target.value;
    setFormFields(newFormFields);
  };

  // =================REACT-DATES==============================

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
  const handleButtonClick = () => {
    console.log(`add logic to switch screen`);
    dispatch(
      createNewTripAction({
        name: formFields[TRIP_NAME],
        creator: formFields[CREATED_BY],
        startDate: dates.startDate,
        endDate: dates.endDate,
      })
    );
    console.log(`newTripData is:`);
    console.log(newTripData);
  };

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
            value={formFields.TRIP_NAME}
          />
        </div>
        <div className="col">
          <p>Created By:</p>
          <input
            type="text"
            onChange={(e) => {
              handleFieldChange(e, CREATED_BY);
            }}
            placeholder="Insert email address"
            value={formFields.CREATED_BY}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="react-date-container">
            {startDate && endDate && (
              <div>
                <p>Start: {formattedStartDate}</p>
                <p>End: {formattedEndDate}</p>
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
              // optionals:
              required={true}
              showClearDates={true}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Button onClick={handleButtonClick}>Select routes</Button>
        </div>
      </div>
    </div>
  );
}
