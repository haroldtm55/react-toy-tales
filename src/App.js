import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys:[],
    nameInputValue: '',
    urlInputValue: ''
  }

  componentDidMount() {
    this.renderToys()
  }

  renderToys = () => {
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(toys => {
        this.setState({
          toys: toys
        })
      })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleChangeName = e => {
    this.setState({
      nameInputValue: e.target.value,
    }, ()=>console.log(this.state.nameInputValue))
  }

  handleChangeUrl = e => {
    this.setState({
      urlInputValue: e.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const newToy = {
      name: this.state.nameInputValue,
      image: this.state.urlInputValue,
      likes: 0
    }
    
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    }
    
    fetch('http://localhost:3000/toys',configObj)
      .then(() => this.renderToys())

    this.setState({
      nameInputValue: '',
      urlInputValue: ''
    })
  }

  removeToyCard = toyId => {
    fetch(`http://localhost:3000/toys/${toyId}`,{method: 'DELETE'})
      .then(() => this.renderToys())
  }

  updateToyLikes = (toyId,currentLikes) => {
    const toyUpdate = {
      likes: currentLikes+=1
    }
    
    const configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyUpdate)
    }
    
    fetch(`http://localhost:3000/toys/${toyId}`,configObj)
      .then(() => this.renderToys())
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm 
            handleSubmit={this.handleSubmit} 
            handleChangeName={this.handleChangeName} 
            handleChangeUrl={this.handleChangeUrl}
            nameInputValue={this.state.nameInputValue}
            urlInputValue={this.state.urlInputValue}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer 
          toys={this.state.toys} 
          removeToyCard={this.removeToyCard} 
          updateToyLikes={this.updateToyLikes}/>
      </>
    );
  }

}

export default App;
