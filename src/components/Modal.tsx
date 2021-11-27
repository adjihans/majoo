import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { ModalInfo, ModalType, Option, ToDoListStatus } from "./type.d";
import Select from "react-select";
import { Text } from "./utils/style";

interface ModalProps {
  modalInfo: ModalInfo;
  handleOnChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeDescription: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClickSaveButton: (type: ModalType) => void;
  handleClickCancelButton: () => void;
  handleOnChangeStatusSelection: (value: Option) => void;
}
const Modal = (props: ModalProps) => {
  const toDoListptions = [
    {
      label: ToDoListStatus.UNFINISHED,
      value: 0,
    },
    {
      label: ToDoListStatus.FINISHED,
      value: 1,
    },
  ];

  const {
    modalInfo = {
      isOpen: false,
      title: "",
      description: "",
      status: toDoListptions[0],
      type: ModalType.CREATE,
    },
    handleOnChangeDescription,
    handleOnChangeTitle,
    handleClickSaveButton,
    handleClickCancelButton,
    handleOnChangeStatusSelection,
  } = props;

  const renderStatusSelection = () => {
    if (modalInfo.type === ModalType.UPDATE) {
      return (
        <SelectionContainer>
          <Text>Status:</Text>
          <Select
            value={modalInfo.status}
            options={toDoListptions}
            onChange={(value: any) => handleOnChangeStatusSelection(value)}
            styles={selectStyle}
          />
        </SelectionContainer>
      );
    }
    return null;
  };

  return modalInfo.isOpen ? (
    <Overlay onClick={handleClickCancelButton}>
      <ModalContainer onClick={(event: any) => event.stopPropagation()}>
        <Form>
          <Text>Title:</Text>
          <Input
            value={modalInfo.title}
            onChange={handleOnChangeTitle}
            placeholder="Input your title here"
            type="text"
          />
          <Text>Description:</Text>
          <Input
            value={modalInfo.description}
            onChange={handleOnChangeDescription}
            placeholder="Input your description here"
            type="text"
          />
          {renderStatusSelection()}
        </Form>
        <ButtonsContainer>
          <Button onClick={() => handleClickSaveButton(modalInfo.type)}>
            Save
          </Button>
          <Button onClick={handleClickCancelButton}>Cancel</Button>
        </ButtonsContainer>
      </ModalContainer>
    </Overlay>
  ) : null;
};

export default Modal;

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const SelectionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex: start;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
`;

const ModalContainer = styled.div`
  width: 30rem;
  height: 10rem;
  margin: 15% auto;
  background-color: #fefefe;
  padding: 1.5rem;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const ButtonsContainer = styled.div`
  justify-content: center;
  display: flex;
`;

const Button = styled.div`
  width: 5rem;
  height: 2rem;
  margin: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  border: 2px solid black;
  box-sizing: border-box;
  border-radius: 30px;
  color: black;
`;

const selectStyle = {
  option: (provided: any) => ({
    ...provided,
    backgroundColor: "#fafafa",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "1.5rem",
    color: "#535353",
    overflowWrap: "break-word",
    cursor: "pointer",
  }),
  control: (provided: any) => ({
    ...provided,
    width: "10rem",
    border: 0,
    marginLeft: "1rem",
    boxShadow: "none",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "1.5rem",
    color: "#535353",
    overflowWrap: "break-word",
    cursor: "pointer",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "1.5rem",
    color: "#535353",
    overflowWrap: "break-word",
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({}),
};
