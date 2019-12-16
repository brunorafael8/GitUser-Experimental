import React, { Suspense, useState, useTransition } from "react";
import graphql from "babel-plugin-relay/macro";
import {
  preloadQuery,
  RelayEnvironmentProvider,
  usePreloadedQuery
} from "react-relay/hooks";
import styled from "styled-components";
import RelayEnvironment from "./RelayEnvironment";

const UserNameQuery = graphql`
  query AppQuery($login: String!) {
    user(login: $login) {
      name
      login
      bio
    }
  }
`;

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

const UserWrapper = styled.section`
  margin-top: 20px;
  min-width: 200px;
  min-height: 200px;
`;

const UserContent = styled.div`
  background-color: white;
`;

const User = props => {
  const data = usePreloadedQuery(
    UserNameQuery,
    preloadQuery(RelayEnvironment, UserNameQuery, {
      login: props.user
    })
  );

  const { name, login, bio } = data.user;

  return (
    <UserContent>
      <label>{name}</label>
      <br />
      <label>{login}</label>
      <br />
      <p>{bio}</p>
      <br />
    </UserContent>
  );
};

const App = () => {
  const [user, setUser] = useState("");
  const [userSearched, setUserSearched] = useState("");
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000
  });
  console.log(isPending);
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Container>
        <Content>
          <Title>GITUSER</Title>
          <SearchInput
            onChange={e => setUser(e.target.value)}
            placeholder="Ex: brunorafael8"
          />
          <SearchButton
            onClick={() => {
              startTransition(() => {
                setUserSearched(user);
              });
            }}
          >
            {isPending ? "Searching..." : "Search"}
          </SearchButton>
          <UserWrapper>
            {userSearched && (
              <Suspense fallback={`Searching ${userSearched}...`}>
                <User user={userSearched} />
              </Suspense>
            )}
          </UserWrapper>
        </Content>
      </Container>
    </RelayEnvironmentProvider>
  );
};

export default App;
