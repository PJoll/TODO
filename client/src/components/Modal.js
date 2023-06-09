import React, { useState, useRef, useEffect } from "react";

const Modal = ({ socket, showModal, setShowModal }) => {
  const modalRef = useRef();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(!showModal);
    }
  };

  const addComment = (e) => {
    e.preventDefault();
    socket.emit("updateComment", {
      todoID: selectedItemId,
      comment,
      user: localStorage.getItem("_username"),
    });
    setComment("");
  };
  useEffect(() => {
    socket.on("commentsReceived", (todo) => setComments(todo.comments));
  }, [socket]);
  return (
    <div className="modal" onClick={closeModal} ref={modalRef}>
      <div className="modal__container">
        <h3>Comments</h3>
        <form className="comment__form" onSubmit={addComment}>
          <input
            className="comment__input"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button>Add Comment</button>
        </form>
        <div className="comments__container">
          {comments.length > 0 ? (
            comments.map((item, index) => (
              <div className="comment" key={index}>
                <p>
                  <strong>{item.name}</strong> {item.text}
                </p>
              </div>
            ))
          ) : (
            <p>No Comments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
