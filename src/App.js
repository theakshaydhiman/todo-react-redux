import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListTodo from './components/ListTodo';
import AddForm from './components/AddForm';
import * as actions from './actions/todosActions';

class App extends Component {
  state = {
    timeouts: [],
  };

  componentDidMount() {
    const { getTodos } = this.props;
    getTodos();

    const { todos } = this.props;

    // Set timeout for each todo with reminder in the state array.
    todos.forEach((todo) => {
      if (todo.datetime) this.setTodoTimeout(todo.datetime, todo.title);
    });
  }

  componentWillUnmount() {
    const { timeouts } = this.state;
    timeouts.forEach(id => clearTimeout(id));
  }

  editTodo = (selectedTodo, todo) => {
    const { setTodo, todos, editTodo } = this.props;
    // Set the selected todo to the state.
    setTodo(selectedTodo);

    // If a modified todo is returned from AddForm, update it in the state.
    if (todo) {
      const allTodos = todos;
      allTodos[selectedTodo.id - 1].title = todo.title;
      allTodos[selectedTodo.id - 1].description = todo.description;
      if (todo.datetime) {
        allTodos[selectedTodo.id - 1].datetime = todo.datetime;
        this.setTodoTimeout(todo.datetime, todo.title);
      }
      editTodo(allTodos);
    }
  }

  addTodo = (todo) => {
    const { addTodo, todos } = this.props;

    // Create new id.
    const maxid = Math.max(...todos.map(t => t.id));

    // Push new todo to the state.
    addTodo({
      id: maxid + 1,
      title: todo.title,
      description: todo.description,
      datetime: todo.datetime,
    });

    // Set new timeout if the new todo has datetime.
    if (todo.datetime) {
      this.setTodoTimeout(todo.datetime, todo.title);
    }
  }

  setTodoTimeout = (time, title) => {
    const { timeouts } = this.state;

    const final = new Date(time).getTime();
    const now = new Date().getTime();
    const diff = final - now;
    this.timeout = setTimeout(() => {
      const currentTitle = window.document.title;
      window.document.title = title;
      alert(title);
      window.document.title = currentTitle;
    }, diff);

    // Update the array of IDs of timeouts in the state.
    const toArr = timeouts;
    toArr.push(this.timeout);
    this.setState({ timeouts: toArr });
  }

  render() {
    const { todos, deleteTodo } = this.props;
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Route
              exact
              path="/"
              render={() => (
                <ListTodo
                  todos={todos}
                  deleteTodo={id => deleteTodo(id)}
                  editTodo={this.editTodo}
                />
              )}
            />
            <Route
              path="/add"
              render={() => (
                <AddForm
                  addTodoItem={this.addTodo}
                  editTodoItem={this.editTodo}
                />
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  getTodos: PropTypes.func.isRequired,
  setTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todos.todos,
  toEdit: state.todos.editTodo,
});

export default connect(mapStateToProps, { ...actions })(App);
