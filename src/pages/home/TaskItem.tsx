import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Remove from '../../assets/remove.svg?react';
import TextField from '../../components/TextField.tsx';
import useClickOutside from '../../hooks/useClickOutside.ts';

interface TaskFieldProps {
  task: Task;
  isEditing: boolean;
  onChange?: (value: TaskUpdateRequest) => void;
  onClick?: (value: number | null) => void;
  onDelete?: (value: number) => void;
}

const TaskItem = ({ task, isEditing, onChange, onClick, onDelete }: TaskFieldProps) => {
  const { id, contents, isDone, createdDate, modifiedDate } = task;
  const [checked, setChecked] = useState(isDone);
  const textFieldRef = useRef<HTMLDivElement>(null);
  const { clickOutsideListener } = useClickOutside();

  const created = moment(createdDate).format('MM/DD HH:mm');
  const modified = moment(modifiedDate).format('MM/DD HH:mm');
  const dateContents = `Created: ${created} ${modifiedDate !== createdDate ? `(Modified: ${modified})` : ''}`;

  useEffect(() => {
    if (isEditing) {
      return clickOutsideListener(textFieldRef, () => {
        onClick?.(null);
      });
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange?.({ id, isDone: e.target.checked });
  };

  const handleClick = () => {
    if (!checked) {
      onClick?.(id);
    }
  };

  const handleDelete = () => {
    onDelete?.(id);
  };

  const handleSubmit = (value: string) => {
    if (!value.trim() || value === contents) return;
    onChange?.({ id, contents: value });
    onClick?.(null);
  };

  return (
    <>
      {isEditing ? (
        <div ref={textFieldRef}>
          <TextField hasBorder={true} value={contents} onSubmit={handleSubmit} />
        </div>
      ) : (
        <div className="py- flex gap-3 bg-white px-4">
          <div className="flex h-[60px] items-center">
            <div
              className={`${checked ? 'hover:bg-primary/[0.1]' : 'hover:bg-black/[0.1]'} flex h-[28px] w-[28px] items-center justify-center rounded-full`}
            >
              <input type="checkbox" className="h-4 w-4" checked={checked} onChange={handleChange} />
            </div>
          </div>
          <div
            className="flex w-full items-center justify-between text-[16px] font-medium hover:cursor-text"
            onClick={handleClick}
          >
            <p className={`${checked ? 'line-through opacity-60' : ''}`}>{contents}</p>
            <p className="text-xs font-normal opacity-60">{dateContents}</p>
          </div>
          <div className="flex items-center hover:cursor-pointer" onClick={handleDelete}>
            <Remove className="fill-[#D15050] hover:fill-[#922E38]" />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
