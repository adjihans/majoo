import React from "react";
import styled from "styled-components";
import { ToDoListType } from "./type";
import { Title, Text } from "./utils/style";

interface TableComponentProps {
  data: ToDoListType[];
  isFinished: boolean;
  handleOnClickCell: (id: number) => void;
  handleOnClickDelete?: (id: number) => void;
}

const TableComponent = (props: TableComponentProps) => {
  const {
    data,
    isFinished,
    handleOnClickCell,
    handleOnClickDelete = () => console.log("tes"),
  } = props;

  return (
    <>
      {data.map((toDoList: ToDoListType) => {
        return (
          <CellContainer
            key={toDoList.id}
            isFinished={isFinished}
            onClick={() => handleOnClickCell(toDoList.id)}
          >
            {toDoList.status === 0 && (
              <HeaderContainer>
                <div
                  onClick={(event: any) => {
                    event.stopPropagation();
                    handleOnClickDelete(toDoList.id);
                  }}
                >
                  x
                </div>
              </HeaderContainer>
            )}
            <Title>{toDoList.title}</Title>
            <Text>{toDoList.description}</Text>
            <Text>{toDoList.createdAt}</Text>
          </CellContainer>
        );
      })}
    </>
  );
};

export default TableComponent;

const HeaderContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const CellContainer = styled.div<{ isFinished: boolean }>`
  width: 15rem;
  min-height: 6rem;

  margin: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  padding: 1rem;
  background-color: ${({ isFinished }) => (isFinished ? "green" : "orange")};
  border-radius: 10px;
`;
