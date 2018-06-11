import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js'
import Sidebar from './components/Sidebar.js'
import ContentWrapper from './components/ContentWrapper.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Sidebar/>
        <ContentWrapper/>
      </div>
    );
  }
}

export default App;
