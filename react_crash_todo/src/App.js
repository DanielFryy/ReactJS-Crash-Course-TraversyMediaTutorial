import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import uuid from 'uuid';

import Todos from './components/Todos/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo/AddTodo';
import About from './components/pages/About';

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
      <Router>
        <div>
          <Header/>
          <Route exact path="/" render={ () => (
            <React.Fragment>
              <AddTodo addTodo={ this.addTodo }/>
              <Todos todos={ this.state.todos }
                     markComplete={ this.markComplete } delTodo={ this.delTodo }/>
            </React.Fragment>
          ) }/>
          <Route path="/about" component={ About }/>
        </div>
      </Router>
    );
  }
}

export default App;
