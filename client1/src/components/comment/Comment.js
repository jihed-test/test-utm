import { useEffect, useState } from "react";

import "./Styles/Comment.scss";
import DeleteModal from "./DeleteModal";
import CommentHeader from "./CommentHeader";
import CommentFooter from "./CommentFooter";

import { commentPostedTime } from "../utils";

const Comment = ({
  value,
   addComments,onChangeHandler,
  commentData,
  editComment,
  commentDelete,
  setDeleteModalState,
}) => {
  const [time, setTime] = useState("");
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.comment);
  const [deleting, setDeleting] = useState(false);

  // get time from comment posted
  const createdAt = new Date(commentData.createdAt);
  const today = new Date();
  const differenceInTime = today.getTime() - createdAt.getTime();

  useEffect(() => {
    setTime(commentPostedTime(differenceInTime));
  }, [differenceInTime]);



  const updateComment = () => {
    editComment(content, "comment");
    setEditing(false);
  };

  
  const deleteComment = () => {

    commentDelete();
    setDeleting(false);
  };
  return (
    <div
      className={`comment-container `}
    >
      <div className="comment">
        
        <div className="comment--body">
          <CommentHeader
            commentData={commentData}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
            time={time}
          />
          {!editing ? (
            <div className="comment-content">{commentData.comment}</div>
          ) : (
            <textarea
              className="content-edit-box"
              value={value} 
        onChange={onChangeHandler}
            />
          )}
          {editing && (
            <button className="update-btn" onClick={updateComment}>
              update
            </button>
          )}
        </div>
        <CommentFooter
          commentData={commentData}
          setDeleting={setDeleting}
          setDeleteModalState={setDeleteModalState}
          setEditing={setEditing}
        />{" "}
      </div>

     
      {deleting && (
        <DeleteModal
          setDeleting={setDeleting}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      )}
    </div>
  );
};

export default Comment;
