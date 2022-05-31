import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const createNew = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content !== "") {
      event.target.anecdote.value = "";
      props.createAnecdote(content);
      props.setNotification("Added new anecdote!", 5, props.notification.timeout);
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
