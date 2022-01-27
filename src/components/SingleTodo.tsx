import React, {useState, useRef,useEffect} from 'react';
import {Todo} from "../model"
import {AiFillEdit,AiFillDelete} from "react-icons/ai"
import {MdDone} from "react-icons/md"
import "./styles.css"


interface Props {
    todo: Todo,
    todos:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = (props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(props.todo.todo)

    const handleDone = (id:number) => props.setTodos(props.todos.map((todo)=>todo.id === id ? {...todo,isDone:!todo.isDone} : todo))
    const handleEditClick = () => {if (!edit && !props.todo.isDone){setEdit(!edit)}}
    const handleDelete = (id:number) => props.setTodos(props.todos.filter((todo)=>todo.id != id))
    const handleEdit = (e: React.FormEvent,id:number) => {
        e.preventDefault();
        props.setTodos(props.todos.map((todo)=>(todo.id===id ? {...todo,todo:editTodo}:todo)))
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(()=>{inputRef.current?.focus()},[edit])

  
    return <form className="todos_single" onSubmit={(e)=>handleEdit(e,props.todo.id)}>
        {edit ? (<input ref={inputRef} value={editTodo} onChange={(e)=>setEditTodo(e.target.value)} className='todos_single--text' />) :
        props.todo.isDone ? (<s className="todos_single--text">{props.todo.todo}</s>) :(<span className="todos_single--text">{props.todo.todo}</span>)}
        <div>
            <span className='icon' onClick={()=>handleEditClick()}><AiFillEdit /></span>
            <span className='icon' onClick={()=>handleDelete(props.todo.id)}><AiFillDelete /></span>
            <span className='icon' onClick={()=>handleDone(props.todo.id)}><MdDone/></span>
        </div>

  </form>;
};

export default SingleTodo;
