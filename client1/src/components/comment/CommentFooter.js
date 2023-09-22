import CommentBtn from "./CommentBtn";

const CommentFooter = ({
  commentData,
  setDeleting,
  setDeleteModalState,
  setEditing,
}) => {
  return (
    <div className="comment--footer">
     

      <CommentBtn
        commentData={commentData}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
};

export default CommentFooter;
