/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { ChangeTodoForm } from '../ChangeTodoForm';

type Props = {
  todo: Todo;
  onDelete: (todoId: number) => void;
  waitForResponseId: number[];
  updateTodo: (todo: Todo) => Promise<void>;
  errorMessage: string;
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, userId, title, completed },
  onDelete,
  waitForResponseId,
  updateTodo,
  errorMessage,
}) => {
  const [selectedId, setSelectedId] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState('');

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo({
      id,
      userId,
      title,
      completed: event.target.checked,
    });
  };

  const handleFormSwitch = () => {
    setSelectedId(id);
    setSelectedTitle(title);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
      onDoubleClick={handleFormSwitch}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleStatusChange}
        />
      </label>

      {selectedId === id ? (
        <ChangeTodoForm
          setSelectedId={setSelectedId}
          selectedId={selectedId}
          setSelectedTitle={setSelectedTitle}
          selectedTitle={selectedTitle}
          title={title}
          id={id}
          completed={completed}
          onDelete={onDelete}
          updateTodo={updateTodo}
          errorMessage={errorMessage}
        />
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal', 'overlay', {
          'is-active': waitForResponseId.includes(id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
