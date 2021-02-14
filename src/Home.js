import React, { Component } from "react";
import AppNav from "./AppNav";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <AppNav />
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignitems: "center",
            height: "100vh",
          }}
        >
          Welcome to Easy Expese App!
        </h2>
      </div>
    );
  }
}

export default Home;
