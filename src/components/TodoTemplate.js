// todo template
import React, { useState, useRef, useContext } from "react";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";
import TodoHeader from "./TodoHeader";
import styles from "./TodoTemplate.module.css";
import { ThemeColor } from "./TodoTheme";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function TodoTemplate({ color }) {
  const themeColor = useContext(ThemeColor);

  console.log("TodoTemplate: " + themeColor);
  console.log("TodoTemplate color: " + color);
  const [newTodo, setNewTodo] = useState("");

  const [todos, setTodos] = useState([
    {
      id: 1,
      content: "React 공부하기",
      completed: true,
      star: false,
    },
    {
      id: 2,
      content: "가족들이랑 카레 만들기",
      completed: false,
      star: true,
    },
    {
      id: 3,
      content: "장보기",
      completed: false,
      star: false,
    },
  ]);

  const nextId = useRef(4);

  const onChange = (e) => {
    setNewTodo(e.target.value);
  };

  const onCreate = (e) => {
    // console.log('create');
    if (!newTodo || newTodo == "") return;
    const todo = {
      id: nextId.current,
      content: newTodo,
    };
    setTodos([...todos, todo]);
    // setTodos(todos.concat(todo));

    setNewTodo("");
    nextId.current += 1;
  };

  const onRemove = (id) => {
    console.log("remove - close icon");
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onCheckClick = (id) => {
    console.log("checked icon");
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const onStarClick = (id) => {
    console.log("star icon");
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, star: !todo.star } : todo
      )
    );
  };

  return (
    <table className={styles.templTable}>
      <thead>
        <tr>
          <th>
            <TodoHeader color={color}></TodoHeader>
          </th>
        </tr>
        <tr>
          <th>
            <TodoCreate
              newTodo={newTodo}
              onCreate={onCreate}
              onChange={onChange}
              color={color}
            ></TodoCreate>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {/* <p className={styles.templLine}></p> */}
            <p
              className={cx("templLine", {
                [color]: true,
              })}
            ></p>
          </td>
        </tr>
        <tr>
          <td>
            <div className={styles.templList}>
              <TodoList
                items={todos}
                onRemove={onRemove}
                onCheckClick={onCheckClick}
                onStarClick={onStarClick}
              ></TodoList>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            {/* <p className={classNames(styles.templLine, styles[themeColor])}></p> */}
            <p
              className={cx("templLine", {
                [color]: true,
              })}
            ></p>
          </td>
        </tr>
        <tr>
          <td>
            <p className={styles.copyRight}>
              copyright 2021. Chaerin Yu. All rights reserved.{" "}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TodoTemplate;
