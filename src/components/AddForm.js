import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/todosActions';

class AddForm extends React.Component {
  state = {
    title: '',
    description: '',
    datetime: '',
    toIndex: false,
  }

  componentDidMount() {
    const { toEdit } = this.props;
    // Set form values if the todo is to be edited and toEdit is defined.
    if (toEdit.id) {
      const { title, description, datetime } = toEdit;
      this.setState({ title, description, datetime });
    }
  }

  handleChange = e => this.setState({ [e.target.id]: e.target.value });

  handleSubmit = (e) => {
    const { editTodoItem, addTodoItem, toEdit } = this.props;
    e.preventDefault();
    // Form submission to add or edit based on the state editTodo.
    if (toEdit.id) {
      editTodoItem(toEdit, this.state);
    } else {
      addTodoItem(this.state);
    }
    this.clearState();
  }

  clearState = () => {
    const { setTodo } = this.props;
    this.setState({
      title: '', description: '', datetime: '', toIndex: true,
    });
    setTodo({});
  }

  render() {
    const {
      toIndex, title, description, datetime,
    } = this.state;
    const { toEdit } = this.props;
    if (toIndex) {
      return (<Redirect to="/" />);
    }
    return (
      <>
        <h3>
          {(toEdit.id) ? 'Edit' : 'Create'}
          To-Do
        </h3>
        <div className="card-panel">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <label className="active" htmlFor="title">Title</label>
                <input id="title" type="text" onChange={this.handleChange} value={title} required />
              </div>
              <div className="input-field col s12">
                <label className="active" htmlFor="description">Description</label>
                <textarea id="description" className="materialize-textarea" onChange={this.handleChange} value={description} required />
              </div>
              <div className="input-field col s12">
                <label className="active" htmlFor="datetime">Reminder - optional</label>
                <input id="datetime" type="datetime-local" onChange={this.handleChange} value={datetime} />
              </div>
              <div className="col">
                <button className="btn waves-effect waves-light blue" type="submit">
                  <i className="material-icons left">edit</i>
                  {(toEdit.id) ? 'Edit' : 'Create'}
                </button>
              </div>
            </div>
          </form>
        </div>
        <Link to="/" className="btn blue waves-effect waves-light" onClick={this.clearState}>
          <i className="material-icons left">arrow_back</i>
          View All To-Dos
        </Link>
      </>
    );
  }
}

AddForm.propTypes = {
  addTodoItem: PropTypes.func.isRequired,
  editTodoItem: PropTypes.func.isRequired,
  setTodo: PropTypes.func.isRequired,
  toEdit: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  toEdit: state.todos.editTodo,
});

export default connect(mapStateToProps, { ...actions })(AddForm);
