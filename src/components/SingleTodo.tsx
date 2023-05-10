import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../models/Todo';
import { TodoActions } from '../reducers/TodoReducer';
import { AiFillEdit, AiFillDelete, AiOutlineCheck, AiOutlineClose, AiFillSave, AiOutlineUndo } from "react-icons/ai";
import { Draggable } from 'react-beautiful-dnd';
import "./_styles.css";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  dispatch: React.Dispatch<TodoActions>;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, dispatch }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editNote, setEditNote] = useState<string>(todo.note);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  const handleDone = (id: number) => {
    dispatch({ type: "done", payload: id })
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "remove", payload: id })
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    dispatch({ type: "edit", payload: { id, editNote } })
    setEdit(false);
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          <form className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} onSubmit={(e) => handleEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            {
              edit
                ? (<input ref={inputRef} className="todos__single__text" value={editNote} onChange={(e) => setEditNote(e.target.value)} />)
                : (
                  todo.isDone
                    ? <s className="todos__single__text">{todo.note}</s>
                    : <span className="todos__single__text">{todo.note}</span>
                )
            }
            <div>
              {(!edit && !todo.isDone) && <span className="icon" onClick={() => { setEdit(true) }}><AiFillEdit /></span>}
              {edit && <span className="icon" onClick={(e) => handleEdit(e, todo.id)}><AiFillSave /></span>}
              {edit && <span className="icon" onClick={() => { setEdit(false); setEditNote(todo.note) }}><AiOutlineClose /></span>}
              {!edit && <span className="icon" onClick={() => handleDone(todo.id)}>{todo.isDone ? <AiOutlineUndo /> : <AiOutlineCheck />}</span>}
              {!edit && <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>}
            </div>
          </form>
        )
      }
    </Draggable>
  )
}

export default SingleTodo