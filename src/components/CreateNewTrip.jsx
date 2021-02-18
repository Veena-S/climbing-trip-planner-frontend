import React, { useState } from "react";

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
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col"></div>
      </div>
    </div>
  );
}
