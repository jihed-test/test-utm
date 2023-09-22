import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Classnames from 'classnames'

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function Example ({name, label, value , icon, onChangeHandler, errors})  {
  return ( <div className=" mb-3">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
        <DatePicker  name ="name" value={value} className={Classnames(" form-control", {"is-invalid": errors})} showIcon selected={value} onChange={onChangeHandler} />
        
      </div>
      {
          errors && (
            <p className="text-danger">{errors}</p>
            )
        }
    </div>
  );
};