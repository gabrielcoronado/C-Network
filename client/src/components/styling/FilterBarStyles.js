import styled from "styled-components";

export const FilterWrapper = styled.div`
  margin: 0 40px;
  width: 80vw;
  display: flex;
  margin: 0 auto;
  overflow: overlay;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: auto;
  border-radius: 20px;
  margin-bottom: 20px;
  font-size: 15px;
`;

export const Genres = styled.div`
  padding: 10px;
  display: flex;
`;

export const Button = styled.span`
  padding: 5px 9px;
  border-radius: 30px;
  align-self: center;
  white-space: nowrap;
  font-size: 15px;
  color: grey;

  margin: 5px;
  border: 0.5px solid grey;
  list-style-type: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
`;
