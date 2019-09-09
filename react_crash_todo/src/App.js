import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid';

import Todos from './components/Todos/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo/AddTodo';

class App extends Component {
  
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: 'Take out the trash',
        completed: true
      },
      {
        id: uuid.v4(),
        title: 'Dinner with wife',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Meeting with boss',
        completed: false
      },
    ]
  };
  
  markComplete = id => this.setState({
    todos: this.state.todos.map(todo => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    })
  });
  
  delTodo = id => this.setState({
    todos: this.state.todos.filter(todo => todo.id !== id)
  });
  
  addTodo = title => {
    if (title.length > 0) {
      const newTodo = {
        id: uuid.v4(),
        title,
        completed: false
      };
      this.setState({ todos: [...this.state.todos, newTodo] });
    }
  };
  
  render() {
    return (
      <div>
        <Header/>
        <AddTodo addTodo={ this.addTodo }/>
        <Todos todos={ this.state.todos }
               markComplete={ this.markComplete } delTodo={ this.delTodo }/>
      </div>
    );
  }
}

export default App;
