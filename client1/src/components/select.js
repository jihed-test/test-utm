
import {Form} from 'react-bootstrap';
import Classnames from 'classnames'

function SelectBasicExample({name, myArray,label, value, type, icon, onChangeHandler, errors}) {
  return (
<div className=" mb-3">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
        <Form.Select type={type} value={value} name={name} className={Classnames("form-control", {"is-invalid": errors})} onChange={onChangeHandler} aria-label="Default select example">
        {myArray.map(opt => (
    <option value={opt}>{opt}</option>
  ))}
      
    </Form.Select>
        {
          errors && (<div  className="invalid-feedback">
          {errors}
        </div>)
        }
      </div>
    </div>


    
  );
}

export default SelectBasicExample;