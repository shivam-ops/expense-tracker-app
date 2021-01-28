import React, { Component } from "react";
import AppNav from "./AppNav";

class Category extends Component {
  state = {
    isloading: true,
    Categories: [],
  };

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();
    this.setState({ Categories: body, isloading: false });
  }
  render() {
    const { Categories, isloading } = this.state;
    if (isloading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <AppNav />
        <h2>Categories</h2>
        {Categories.map((category) => (
          <div id={category.id}>{category.name}</div>
        ))}
      </div>
    );
  }
}

export default Category;
