import { useEffect, useMemo, useState } from 'react';

import { createTask, deleteAllTasks, deleteTask, updateTask } from '../../services/TaskService.ts';
import { getTasksByMemberId } from '../../services/MemberService.ts';

import Header from '../../components/Header.tsx';
import TextField from '../../components/TextField.tsx';
import TaskItem from './TaskItem.tsx';
import DropDown from '../../components/DropDown.tsx';
import Empty from '../../assets/empty.svg?react';
import { Greetings } from '../../contants/Greeting.ts';
import { useToastStore } from '../../stores/ToastStore.ts';
import { OrderOptions } from '../../contants/Options.ts';

const HomePage = () => {
  const { addToast } = useToastStore();

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [order, setOrder] = useState(OrderOptions[0]);

  const memberId = sessionStorage.getItem('memberId');
  const userName = sessionStorage.getItem('userName');

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    const index = Math.trunc(hour > 22 ? 0 : (hour + 1) / 6);
    return Greetings[index];
  }, []);

  const sortedTasks = tasks.sort((a, b) => order.value * (a.createdDate - b.createdDate));

  const fetchTask = async () => {
    const data: Task[] = await getTasksByMemberId(memberId!);
    setTasks(data);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleSubmit = async (value: string) => {
    await createTask({ memberId: memberId!, contents: value });
    setTask('');
    addToast('Task has been registered');
    fetchTask();
  };

  const handleChange = async (value: TaskUpdateRequest) => {
    await updateTask(value);
    if (value.isDone) {
      addToast('Task has been completed');
    } else if (value.contents) {
      addToast('Task has been modified');
    }
    fetchTask();
  };

  const handleTaskClick = (id: number | null) => {
    setIndex(id);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    addToast('Task has been deleted');
    fetchTask();
  };

  const handleClearClick = async () => {
    if (tasks.length === 0) return;
    await deleteAllTasks();
    addToast('All tasks have been deleted');
    fetchTask();
  };

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="mx-auto flex w-[1280px] flex-col gap-4 py-[24px] ps-[60px] leading-9">
        <p className="text-[24px] text-content">{`${greeting}, ${userName}`}</p>
        <div className="text-[24px] text-content">
          <p>You've got</p>
          <p className="text-[48px] font-bold leading-[72px]">
            {tasks.filter(task => !task.isDone).length} / {tasks.length}
          </p>
          <p>task(s) today!</p>
        </div>
        <div className="w-[1156px]">
          <TextField value={task} onSubmit={handleSubmit} onChange={setTask} placeholder="Enter your task" />
        </div>
      </div>
      <div className="h-list overflow-auto bg-[#f4f4f4]">
        <div className="mx-auto flex w-[1280px] flex-col gap-4">
          <div className="flex items-center justify-between pl-[52px] pr-[64px] pt-[24px]">
            <DropDown options={OrderOptions} selected={order} onChange={setOrder} />
            <div className={`${tasks.length === 0 ? 'btn-clear-none' : 'btn-clear'}`} onClick={handleClearClick}>
              Clear All
            </div>
          </div>
          <div className="flex flex-col gap-2 pl-[52px]">
            {sortedTasks.length > 0 ? (
              sortedTasks.map(task => (
                <div key={task.id} className="w-[1160px]">
                  <TaskItem
                    task={task}
                    isEditing={index === task.id}
                    onChange={handleChange}
                    onClick={handleTaskClick}
                    onDelete={handleDelete}
                  />
                </div>
              ))
            ) : (
              <div className="flex h-empty flex-col items-center justify-center gap-4">
                <Empty />
                <p className="text-[#00000066]">There is no task registered.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
