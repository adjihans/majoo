export interface ToDoListType {
  id: number;
  title: string;
  description: string;
  status: number;
  createdAt: string;
}

export enum ToDoListStatus {
  FINISHED = "finished",
  UNFINISHED = "unfinished",
}

export interface ModalInfo {
  isOpen: boolean;
  id: number;
  title: string;
  description: string;
  status: Option;
  type: ModalType;
}

export enum ModalType {
  CREATE = "create",
  UPDATE = "update",
}

export interface Option {
  label: string;
  value: number;
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}
