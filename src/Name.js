import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import './App.css';
import firebase from './firebase.js';


class Name extends Component {
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
    
    firebase.database().ref().remove();

  }
  render() {
    return (
      <div className='app'>
        
        <div className='container'>
          <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  
                  <input type="text" name="currentItem" placeholder="Enter text" onChange={this.handleChange} value={this.state.currentItem} />
                                    
                </form>
                <button onClick={() => this.removeAllItems()}>Delete</button>
                
                  

                
          </section>
          
          <section className='display-item'>
            
              <Paper>
                
                  {this.state.items.map((item) => {
                    return (
                      
                      /*<li key={item.id}>
                        <strong><p>{item.title}</p></strong>
                        <p>brought by: {item.user}
                          <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                        </p>
                      </li>*/
                      
                      
                      <Paper>
                      <p>{item.title}</p>
                      
                      </Paper>  
                      
                      
                    )
                  })}
                
             </Paper> 
              
          </section>
          
        </div>
      </div>
    );
  }
}
export default Name;