import React, { Component } from 'react';

import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      items: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });

  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      
    }
    itemsRef.push(item);
    this.setState({
      currentItem: ''
    });
  }
  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  removeAllItems(){
    
    for (let item in firebase.database().ref('items')) {
      const itemRef=firebase.database().ref(`/items/${item}`);
      itemRef.remove()
    }

  }
  render() {
    return (
      <div className='app'>
        <header>
            <div className="wrapper">
              <h1>Chat app</h1>
                             
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  
                  <input type="text" name="currentItem" placeholder="Enter text" onChange={this.handleChange} value={this.state.currentItem} />
                  <button>Enter</button>
                </form>
          </section>
          <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.state.items.map((item) => {
                    return (
                      /*<li key={item.id}>
                        <strong><p>{item.title}</p></strong>
                        <p>brought by: {item.user}
                          <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                        </p>
                      </li>*/
                      
                      <div>
                      <p>{item.title}</p>
                      <button onClick={() => this.removeItem(item.id)}>Delete</button>
                      <br></br>
                      </div>
                      
                    )
                  })}
                </ul>
              </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;