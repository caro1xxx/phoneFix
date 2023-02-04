import React from "react";
import "./App.css";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import State from "./components/State";
import "antd/dist/reset.css";
const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 10px;
`;
const Span2 = styled.div`
  grid-column: span 2 / auto;
`;
const Span3 = styled.div`
  grid-column: span 2 / auto;
`;
const Span5 = styled.div`
  grid-column: span 6 / auto;
`;
function App() {
  return (
    <div className="App">
      <Wrap>
        <Span2>
          <NavBar></NavBar>
        </Span2>
        <Span5>
          <Main></Main>
        </Span5>
        <Span3>
          <State></State>
        </Span3>
      </Wrap>
    </div>
  );
}

export default App;
