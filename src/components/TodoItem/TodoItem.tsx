/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  onDelete: (todoId: number) => void;
  waitForResponseId: number[];
  updateTodo: (todo: Todo) => Promise<void>;
  errorMessage: string;
  setSelectedId: (id: number) => void;
  selectedId: number;
  setSelectedTitle: (title: string) => void;
  selectedTitle: string;
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, userId, title, completed },
  onDelete,
  waitForResponseId,
  updateTodo,
  errorMessage,
  setSelectedId,
  selectedId,
  setSelectedTitle,
  selectedTitle,
}) => {
  const formField = useRef<HTMLInputElement>(null);

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

  function resetSelected() {
    setSelectedId(0);
    setSelectedTitle('');
  }

  const saveChanges = () => {
    if (selectedTitle === title) {
      resetSelected();

      return;
    }

    if (!selectedTitle.trim()) {
      onDelete(selectedId);

      return;
    }

    updateTodo({
      id,
      userId,
      title: selectedTitle.trim(),
      completed,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    saveChanges();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      resetSelected();
    }
  };

  useEffect(() => {
    formField.current?.focus();
  }, [selectedId, errorMessage]);

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
        <form onSubmit={handleSubmit}>
          <input
            ref={formField}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={selectedTitle}
            onChange={event => setSelectedTitle(event.target.value)}
            onBlur={saveChanges}
            onKeyUp={handleKeyUp}
          />
        </form>
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
