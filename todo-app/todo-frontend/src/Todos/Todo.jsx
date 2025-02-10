import PropTypes from "prop-types";

const Todo = ({ todo, onClickDelete, onClickComplete }) => {
  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={() => onClickDelete(todo)}> Delete </button>
      </span>
    </>
  );

  const notDoneInfo = (
    <>
      <span>This todo is not done</span>
      <span>
        <button onClick={() => onClickDelete(todo)}> Delete </button>
        <button onClick={() => onClickComplete(todo)}> Set as done </button>
      </span>
    </>
  );

  return (
    <>
      <div
        key={todo.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "70%",
          margin: "auto",
        }}
      >
        <span>{todo.text}</span>
        {todo.done ? doneInfo : notDoneInfo}
      </div>
      <hr key={todo.id} />
    </>
  );
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickComplete: PropTypes.func.isRequired,
};

export default Todo;
