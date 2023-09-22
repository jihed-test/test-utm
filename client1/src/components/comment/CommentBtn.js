import React, { useEffect, useState } from "react";

const CommentBtn = ({commentData, setDeleting, setDeleteModalState, setEditing}) => {
  // adding reply


  let counter = false;
 

  // delete comment
  const showDeleteModal = () => {
    setDeleting(true);
    setDeleteModalState(true);
  };

  // edit comment
  const showEditComment = () => {
    setEditing(true);
  };

  return (
    <div className="comment--btn">
      <button
        className={`delete-btn `}
        onClick={showDeleteModal}
      >
       Delete
      </button>
      <button
        className={`edit-btn `}
        onClick={showEditComment}
      >
        Edit
      </button>
    </div>
  );
};

export default CommentBtn;
