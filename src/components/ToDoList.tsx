import React, { ChangeEvent, useEffect, useState } from "react";
import { fetchToDoList } from "../services/fetchToDoList";
import styled from "styled-components";
import TableComponent from "./TableComponent";
import {
  ToDoListType,
  ToDoListStatus,
  ModalInfo,
  ModalType,
  Option,
  SortDirection,
} from "./type.d";
import Modal from "./Modal";
import moment from "moment";
import { Title } from "./utils/style";
import { sortData } from "./utils/sort";

const ToDoList = () => {
  const [toDoLists, setToDoLists] = useState<ToDoListType[]>([]);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    id: 0,
    isOpen: false,
    title: "",
    description: "",
    status: {
      label: "",
      value: 0,
    },
    type: ModalType.CREATE,
  });

  const handleOnClickAddNewList = () => {
    setModalInfo({
      ...modalInfo,
      isOpen: true,
      title: "",
      description: "",
      type: ModalType.CREATE,
    });
  };

  const handleOnChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setModalInfo({ ...modalInfo, description: value });
  };

  const handleOnChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setModalInfo({ ...modalInfo, title: value });
  };

  const handleOnChangeStatusSelection = (value: Option) => {
    setModalInfo({ ...modalInfo, status: value });
  };

  const handleClickCancelButton = () => {
    setModalInfo({ ...modalInfo, isOpen: false, title: "", description: "" });
  };

  const handleClickSaveButton = (type: ModalType) => {
    if (type === ModalType.CREATE) {
      const newToDoList = {
        id: toDoLists.length + 1,
        title: modalInfo.title,
        description: modalInfo.description,
        status: 0,
        createdAt: moment().format("YYYY-MM-DD hh:mm"),
      };
      setToDoLists(toDoLists.concat(newToDoList));
    } else {
      let tempToDoLists = [...toDoLists];

      const index = getToDoListIndex(modalInfo.id);

      tempToDoLists[index] = {
        id: modalInfo.id,
        title: modalInfo.title,
        description: modalInfo.description,
        createdAt: tempToDoLists[index].createdAt,
        status: modalInfo.status.value,
      };
      setToDoLists(tempToDoLists);
    }
    handleClickCancelButton();
  };

  const handleClickDeleteButton = (id: number) => {
    const index = getToDoListIndex(id);
    let tempToDoLists = [...toDoLists];
    tempToDoLists.splice(index, 1);
    setToDoLists([...tempToDoLists]);
  };

  const getToDoListIndex = (id: number) => {
    return toDoLists.findIndex((toDoList: ToDoListType) => toDoList.id === id);
  };

  const handleOnClickCell = (id: number) => {
    const index = getToDoListIndex(id);
    setModalInfo({
      isOpen: true,
      id: toDoLists[index].id,
      title: toDoLists[index].title,
      description: toDoLists[index].description,
      status:
        toDoLists[index].status === 0
          ? {
              label: ToDoListStatus.UNFINISHED,
              value: 0,
            }
          : {
              label: ToDoListStatus.FINISHED,
              value: 1,
            },
      type: ModalType.UPDATE,
    });
  };

  const generateData = (toDoLists: ToDoListType[], type: string) => {
    if (type === ToDoListStatus.FINISHED) {
      const finishedData = toDoLists.filter(
        (toDoList: ToDoListType) => toDoList.status === 1
      );
      return sortData(finishedData, SortDirection.DESC, "createdAt");
    } else {
      const unfinishedData = toDoLists.filter(
        (toDoList: ToDoListType) => toDoList.status === 0
      );
      return sortData(unfinishedData, SortDirection.ASC, "createdAt");
    }
  };

  const componentDidMount = async () => {
    const result = await fetchToDoList();
    if (!result) return;
    setToDoLists(result);
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <ToDoListContainer>
      <Modal
        modalInfo={modalInfo}
        handleOnChangeDescription={handleOnChangeDescription}
        handleOnChangeTitle={handleOnChangeTitle}
        handleClickCancelButton={handleClickCancelButton}
        handleClickSaveButton={handleClickSaveButton}
        handleOnChangeStatusSelection={handleOnChangeStatusSelection}
      />
      <div>
        <Title>Unfinished ToDo List(s)</Title>
        <AddNewList onClick={handleOnClickAddNewList}>
          Add New List +
        </AddNewList>
        <TableComponent
          data={generateData(toDoLists, ToDoListStatus.UNFINISHED)}
          isFinished={false}
          handleOnClickCell={handleOnClickCell}
          handleOnClickDelete={handleClickDeleteButton}
        />
      </div>
      <div>
        <Title>Finisihed ToDo List(s)</Title>
        <TableComponent
          data={generateData(toDoLists, ToDoListStatus.FINISHED)}
          isFinished={true}
          handleOnClickCell={handleOnClickCell}
        />
      </div>
    </ToDoListContainer>
  );
};

export default ToDoList;

const ToDoListContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  padding: 3rem;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const AddNewList = styled.div`
  width: 15rem;
  height: 3rem;

  margin: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow-wrap: break-word;

  padding: 1rem;
  background-color: orange;
  border-radius: 10px;

  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.75rem;

  cursor: pointer;
`;
