import React from "react";
import Header from "./pages/header";
import ChatBox from "./component/chatBox";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <ChatBox />
      </main>
    </div>
  );
}

export default App;
