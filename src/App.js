import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #e90052;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 10%;
  height: 40%;
`;

const Title = styled.h1`
  color: #38003c;
  font-weight: bold;
  padding: 5px;
  font-size: 40px;
  border-bottom-color: #38003c;
  border-bottom-width: 3px;
  margin-top: 40px;
  letter-spacing: 6px;
`;

const SearchInput = styled.input`
  width: 100%;
  margin-top: 100px;
  border-radius: 5px;
  border: 1px;
  padding: 15px;
  border-color: #38003c;
  background-color: white;
`;

const SearchButton = styled.button`
  background-color: #38003c;
  border-radius: 5px;
  border: 0;
  width: 100%;
  margin-top: 15px;
  padding: 15px;
  color: #fff;
`;

const App = () => {
  return (
    <Container>
      <Content>
        <Title>GITUSER</Title>
        <SearchInput placeholder="Ex: brunorafael8" />
        <SearchButton>Search</SearchButton>
      </Content>
    </Container>
  );
};

export default App;
