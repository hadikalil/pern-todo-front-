import React, { Fragment, useEffect, useState } from "react";
// useEffect is going to make a fetch request every time this component is rendered

import EditTodo from "./EditTodo"

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // delete todo functio
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
    setTodos(todos.filter(todo => todo.todo_id !== id))      
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const respnse = await fetch("http://localhost:5000/todos");
      const jsonData = await respnse.json();
      setTodos(jsonData);
      //console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table mt- text-center">
        <thead>
          <tr>
            <th>description</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {/*     <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      */}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td><EditTodo todo={todo} /></td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
