import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { TempTodo } from '../TempTodo';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  onDelete: (todoId: number) => void;
  waitForResponseId: number[];
  updateTodo: (todo: Todo) => Promise<void>;
  errorMessage: string;
  setSelectedId: (id: number) => void;
  selectedId: number;
  setSelectedTitle: (title: string) => void;
  selectedTitle: string;
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  onDelete,
  waitForResponseId,
  updateTodo,
  errorMessage,
  setSelectedId,
  selectedId,
  setSelectedTitle,
  selectedTitle,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onDelete={onDelete}
        waitForResponseId={waitForResponseId}
        updateTodo={updateTodo}
        errorMessage={errorMessage}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        setSelectedTitle={setSelectedTitle}
        selectedTitle={selectedTitle}
      />
    ))}

    {tempTodo && <TempTodo title={tempTodo.title} />}
  </section>
);
