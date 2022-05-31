import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { initializeAnecdotes, voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const search = useSelector((state) => state.search);
  const { timeout } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`you voted "${anecdote.content}"`, 5, timeout));
  };

  return (
    <>
      {anecdotes
        .filter((anecdote) => anecdote.content.toLowerCase().includes(search))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
