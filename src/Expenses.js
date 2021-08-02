import React, { Component } from "react";
import AppNav from "./AppNav";
import DatePicker from "react-datepicker";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { Table, Container, Input, Form, Button, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";

class Expenses extends Component {
  emptyItem = {
    id: "103",
    expenseDate: new Date(),
    description: "",
    location: "",
    categories: [1, "Travel"],
  };

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      isLoading: true,
      expenses: [],
      categories: [],
      item: this.emptyItem,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    await fetch(`/api/expenses`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    console.log(this.state);
    this.props.history.push("/expenses");
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
    console.log(this.state.item);
  }

  handleDateChange(date) {
    let item = { ...this.state.item };
    item.expenseDate = date;

    this.setState({ item });
  }

  async remove(id) {
    await fetch(`api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedExpenses = [...this.state.expenses].filter((i) => i.id !== id);
      this.setState({ expenses: updatedExpenses });
    });
  }

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();

    this.setState({ categories: body, isLoading: false });

    const responseExp = await fetch("/api/expenses");
    const bodyExp = await responseExp.json();

    this.setState({ expenses: bodyExp, isLoading: false });
  }

  render() {
    const title = <h3>Add Expense</h3>;
    const { categories } = this.state;
    const { expenses, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    let optionList = categories.map((category) => (
      <option id={category.id}>{category.name}</option>
    ));

    let rows = expenses.map((expense) => (
      <tr key={expense.id}>
        <td>{expense.description}</td>
        <td>{expense.location}</td>
        <td>{expense.expensedate}</td>
        <td>{expense.category.name}</td>
        <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.remove(expense.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div>
        <AppNav />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <label for="description">Title</label>
              <Input
                type="description"
                name="description"
                id="description"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label for="category">Category</label>
              <select>{optionList}</select>

              <Input
                type="text"
                name="category"
                id="category"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label for="city">Date</label>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleChange}
              />
            </FormGroup>

            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <label for="location">Location</label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>

            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>{" "}
        <Container>
          <h3>Expense List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Description</th>
                <th width="10%">Location</th>
                <th>Date</th>
                <th>Category</th>
                <th width="10%">Action</th>
              </tr>
            </thead>

            <tbody>{rows}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Expenses;
