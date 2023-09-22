import { useState } from "react";

import "./Styles/AddComment.scss";
const AddComment = ({ value, buttonValue, addComments,onChangeHandler }) => {
  const [comment, setComment] = useState("");

  
  return (
    <div className="add-comment">
      <div className="profile-pic"></div>
      <textarea
        className="comment-input"
        placeholder="Add a comment"
        value={value} 
        // value={ comment}
        onChange={onChangeHandler}
        // onChange={(e) => {
        //   setComment(
        //     e.target.value
        //   );
        // }}
      />
      <div className="send-btn-container">
        <div className="profile-pic"></div>
        <button type="submit" className="add-btn" >
          {buttonValue}
        </button>
      </div>
    </div>
  );
};

export default AddComment;
