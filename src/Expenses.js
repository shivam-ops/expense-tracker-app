import React, { Component } from "react";
import AppNav from "./AppNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import {
  Table,
  Container,
  Input,
  Button,
  Label,
  FormGroup,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class Expenses extends Component {
  // {
  //   "id": 100,
  //   "expensedate": "2019-06-16T17:00:00Z",
  //   "description": "New York Business Trip",
  //   "location": "New York",
  //   "category": {
  //   "id": 1,
  //   "name": "Travel"
  //   }
  //   },

  emptyItem = {
    description: "",
    expenseDate: new Date(),
    id: 104,
    location: "",
    category: { id: 1, name: "Travel" },
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      categories: [],
      expenses: [],
      date: new Date(),
      item: this.emptyItem,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  async handleSubmit(event) {
    const item = this.state.item;
    await fetch(`/api/expenses`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    event.preventDefault();
    this.props.history.push("/expenses");
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
    console.log(item);
  }

  handleDateChange(date) {
    let item = { ...this.state.item };
    item.expenseDate = date;
    this.setState({ item });
    console.log(item);
  }

  async remove(id) {
    await fetch(`/api/expenses/${id}`, {
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
    console.log(bodyExp);
  }

  render() {
    const title = <h3>Add Expense</h3>;
    const { expenses, categories, isLoading } = this.state;

    if (isLoading) return <div>Loading....</div>;

    let optionList = categories.map((category) => (
      <option value={category.id} key={category.id}>
        {category.name}
      </option>
    ));

    let rows = expenses.map((expense) => (
      <tr key={expense.id}>
        <td>{expense.description}</td>
        <td>{expense.location}</td>
        <td>
          <Moment date={expense.expensedate} format="YYYY/MM/DD" />
        </td>
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

              {/* <Input
                type="text"
                name="category"
                id="category"
                onChange={this.handleChange}
              /> */}
            </FormGroup>

            <FormGroup>
              <label for="city">Date</label>
              <DatePicker
                selected={this.state.item.expenseDate}
                onChange={this.handleDateChange}
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
