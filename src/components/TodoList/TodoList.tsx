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
};
export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  onDelete,
  waitForResponseId,
  updateTodo,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onDelete={onDelete}
        onToggle={updateTodo}
        onRename={updateTodo}
        processingIds={waitForResponseId}
      />
    ))}
    {tempTodo && <TempTodo title={tempTodo.title} />}
  </section>
);
