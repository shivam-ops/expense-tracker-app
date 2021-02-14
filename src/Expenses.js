import React, { Component } from "react";
import AppNav from "./AppNav";
import DatePicker from "react-datepicker";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Input, Form, Button, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";

class Expenses extends Component {
  state = {};
  render() {
    const title = <h3>Add Expense</h3>;
    return (
      <div>
        <AppNav />
        <Container>
          {title}
          <Form>
            <FormGroup>
              <label for="title">Title</label>
              <Input
                type="text"
                name="title"
                id="title"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label for="category">Category</label>
              <Input
                type="text"
                name="category"
                id="category"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label for="expenseDate">Expense Date</label>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label for="location">Location</label>
              <Input
                type="text"
                name="location"
                id="location"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Expenses;
