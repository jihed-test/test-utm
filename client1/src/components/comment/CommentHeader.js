import CommentBtn from "./CommentBtn";

const CommentHeader = ({commentData, setDeleting, setDeleteModalState, setEditing, time}) => {
  return (
    <div className="comment--header">
      <div className={`profile-pic ${commentData.user}`}></div>
      <div className="username">{commentData.user}</div>
      <div className="comment-posted-time">{`${time} ago`}</div>
      <CommentBtn
        commentData={commentData}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
};

export default CommentHeader;
