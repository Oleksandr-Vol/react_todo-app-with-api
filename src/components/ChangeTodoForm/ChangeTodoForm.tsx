import React, { useEffect, useRef } from 'react';
import { USER_ID } from '../../api/todos';
import { Todo } from '../../types/Todo';

type Props = {
  setSelectedId: (id: number) => void;
  selectedId: number;
  setSelectedTitle: (title: string) => void;
  selectedTitle: string;
  title: string;
  id: number;
  completed: boolean;
  onDelete: (todoId: number) => void;
  updateTodo: (todo: Todo) => Promise<void>;
  errorMessage: string;
};

export const ChangeTodoForm: React.FC<Props> = ({
  setSelectedId,
  selectedId,
  setSelectedTitle,
  selectedTitle,
  title,
  id,
  completed,
  onDelete,
  updateTodo,
  errorMessage,
}) => {
  const formField = useRef<HTMLInputElement>(null);

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
      userId: USER_ID,
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
  );
};
