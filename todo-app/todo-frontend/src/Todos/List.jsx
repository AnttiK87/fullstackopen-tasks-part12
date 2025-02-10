import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

  return (
    <div style={{ marginTop: 40 }}>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo._id}
            todo={todo}
            onClickDelete={onClickDelete(todo)}
            onClickComplete={onClickComplete(todo)}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
