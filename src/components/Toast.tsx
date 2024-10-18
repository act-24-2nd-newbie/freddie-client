import { useToastStore } from '../stores/ToastStore.ts';
import Delete from '../assets/delete.svg?react';

interface ToastItemProps {
  toast: Toast;
}

const ToastItem = ({ toast }: ToastItemProps) => {
  const { id, message } = toast;
  const { removeToast } = useToastStore();

  const handleClick = () => {
    removeToast(id);
  };

  return (
    <div key={id} className="flex min-h-[56px] justify-between gap-5 rounded-md bg-black/[0.8] px-5 py-4">
      <div className="break-all text-white">{message}</div>
      <div className="flex items-center">
        <Delete className="h-6 w-6 fill-white hover:cursor-pointer" onClick={handleClick} />
      </div>
    </div>
  );
};

const Toast = () => {
  const { toasts } = useToastStore();

  return (
    <div className="absolute inset-x-0 bottom-10 mx-auto w-[600px]">
      <div className="flex flex-col-reverse gap-2">
        {toasts.reverse().map(toast => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  );
};

export default Toast;
