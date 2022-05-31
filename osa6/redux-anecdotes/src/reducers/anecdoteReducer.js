import anecdoteService from "../services/anecdote";

export const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data;
      return state
        .map((anecdote) =>
          anecdote.id !== id
            ? anecdote
            : { ...anecdote, votes: anecdote.votes + 1 }
        )
        .sort((a, b) => (a.votes > b.votes ? -1 : 1));
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "SET_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll();
    dispatch({ type: "SET_ANECDOTES", data: notes });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({ type: "NEW_ANECDOTE", data: newAnecdote });
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.voteAnecdote(anecdote);
    dispatch({ type: "VOTE", data: anecdote.id });
  };
};

export default reducer;
