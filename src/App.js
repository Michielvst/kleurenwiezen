import React from 'react';
import './App.css';
import Game from './Game';

const names = ["jan", "simon", "jens", "michiel"];

class App extends React.Component {
  state = {
    names: ['speler 1', 'speler 2', 'speler 3', 'speler 4']
  }

  newGameRef = React.createRef();
  formRef = React.createRef();

  generateGame = (names) => {
    return <Game names={names} />
  }

  handleNameButtonClick = (e) => {
    e.preventDefault();
    const form = e.currentTarget.parentElement;
    const names = [];
    for(let i = 0; i < 4; i++){
      names.push(form[i].value);
    }
    this.setState({
      names
    })
    form.hidden = true;
    this.newGameRef.current.hidden = false;
  }

  handleNewGameButtonClick = () => {
    this.formRef.current.reset();
    this.formRef.current.hidden = false;
    this.newGameRef.current.hidden = true; 
    this.setState({
      names: ['speler 1', 'speler 2', 'speler 3', 'speler 4']
    })
  }

  render() {
  return (
    <div className="app">
      <form ref={this.formRef} className='center'>
      <p>Geef namen in:</p>
      <label>Speler 1:<input></input></label><br></br>
      <label>Speler 2:<input></input></label><br></br>
      <label>Speler 3:<input></input></label><br></br>
      <label>Speler 4:<input></input></label><br></br>
      <button onClick={this.handleNameButtonClick}>Bevestigen</button>
      </form>
      <button hidden ref={this.newGameRef} onClick={this.handleNewGameButtonClick} >New Game</button>
      <Game names={this.state.names} />

    </div>
  );
  }
}

export default App;
