import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Todos from './components/Todos/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo/AddTodo';
import About from './components/pages/About';

class App extends Component {
  
  state = {
    todos: []
  };
  
  async componentDidMount() {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
      this.setState({ todos: res.data });
    } catch (err) {
      console.error(err);
    }
  }
  
  markComplete = id => this.setState({
    todos: this.state.todos.map(todo => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    })
  });
  
  delTodo = async id => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
    } catch (err) {
      console.error(err);
    }
  };
  
  addTodo = async title => {
    if (title.length > 0) {
      const newTodo = {
        title,
        completed: false
      };
      try {
        const res = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
        this.setState({ todos: [...this.state.todos, res.data] });
      } catch (err) {
        console.error(err);
      }
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
