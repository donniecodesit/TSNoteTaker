import React from 'react';
import { Todo } from '../models/Todo';
import { TodoActions } from '../reducers/TodoReducer';
import { Droppable } from 'react-beautiful-dnd';
import SingleTodo from './SingleTodo';
import "./_styles.css";

interface Props {
  todos: Todo[];
  dispatch: React.Dispatch<TodoActions>;
  todosB: Todo[];
  todosBDispatch: React.Dispatch<TodoActions>;
}

const TodoList: React.FC<Props> = ({ todos, dispatch, todosB, todosBDispatch }) => {
  return <div className="container">
    <Droppable droppableId="TodosList">
      {
        (provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">
              Active Tasks
            </span>
            {
              todos.map((todo, index) => (
                <SingleTodo index={index} todo={todo} todos={todos} dispatch={dispatch} key={todo.id} />
              ))
            }
            {provided.placeholder}
          </div>
        )
      }
    </Droppable>
    <Droppable droppableId="TodosCompleted">
      {
        (provided, snapshot) => (
          <div className={`todos completed ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">
              Completed Tasks
            </span>
            {
              todosB.map((todo, index) => (
                <SingleTodo index={index} todo={todo} todos={todosB} dispatch={todosBDispatch} key={todo.id} />
              ))
            }
            {provided.placeholder}
          </div>
        )
      }
    </Droppable>

  </div>



  /*
  return <div className="todos">
    {
      todos.map(todo => (
        <SingleTodo todo={todo} key={todo.id} todos={todos} dispatch={dispatch} />
      ))
    }
  </div>
  */
}

export default TodoList