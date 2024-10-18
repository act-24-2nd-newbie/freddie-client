interface Toast {
  id: string;
  message: string;
}

interface Option {
  label: string;
  value: number;
}

interface Task {
  id: number;
  isDone: boolean;
  contents: string;
  createdDate: number;
  modifiedDate: number;
}

interface TaskCreateRequest {
  memberId: string;
  contents: string;
}

interface TaskUpdateRequest {
  id: number;
  isDone?: boolean;
  contents?: string;
}

interface MemberCreateRequest {
  email: string;
  userName: string;
}
