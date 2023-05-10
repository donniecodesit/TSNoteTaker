import React, { useState, useReducer, useEffect } from 'react';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { TodoReducer } from './reducers/TodoReducer';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import './App.css';

const App: React.FC = () => {
  const [todos, todosDispatch] = useReducer(TodoReducer, []);
  const [todosB, todosBDispatch] = useReducer(TodoReducer, []);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    const storageTodos = window.localStorage.getItem('__TODOS_LIST_ACTIVE');
    const storageTodosB = window.localStorage.getItem('__TODOS_LIST_COMPLETED');
    if (storageTodos) todosDispatch({ type: "set", payload: JSON.parse(storageTodos) });
    if (storageTodosB) todosBDispatch({ type: "set", payload: JSON.parse(storageTodosB) });
  }, [])

  useEffect(() => {
    window.localStorage.setItem('__TODOS_LIST_ACTIVE', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    window.localStorage.setItem('__TODOS_LIST_COMPLETED', JSON.stringify(todosB))
  }, [todosB])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    note && todosDispatch({ type: "add", payload: note })
    setNote("");
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add,
      active = todos,
      complete = todosB;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    todosDispatch({ type: "set", payload: active });
    todosBDispatch({ type: "set", payload: complete });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField note={note} setNote={setNote} handleAdd={handleAdd} />
        <TodoList todos={todos} dispatch={todosDispatch} todosB={todosB} todosBDispatch={todosBDispatch} />
      </div>
    </DragDropContext>
  );
}

export default App;
