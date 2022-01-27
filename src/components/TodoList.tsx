import React from 'react';
import "./styles.css"
import {Todo} from "../model"
import SingleTodo from "./SingleTodo"

interface Props {
    todos:Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const TodoList: React.FC<Props> = (props) => {
  return <div className="todos">
      {props.todos.map((todo)=>(
          <SingleTodo todo={todo} key={todo.id} todos={props.todos} setTodos={props.setTodos}/>
      ))}
  </div>;
};

export default TodoList;
