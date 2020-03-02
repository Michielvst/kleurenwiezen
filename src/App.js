import React from 'react';
import './App.css';
import Game from './Game';

class App extends React.Component {
  state = {
    names: ['speler 1', 'speler 2', 'speler 3', 'speler 4']
  }

  newGameRef = React.createRef();
  formRef = React.createRef();
  modalRef = React.createRef();

  generateGame = (names) => {
    return <Game names={names} />
  }

  handleNameButtonClick = (e) => {
    e.preventDefault();
    const form = e.currentTarget.parentElement.parentElement;
    const names = [];
    for(let i = 0; i < 4; i++){
      if(form[i].value == '') {
        names.push(`speler ${i+1}`)
      } else {
      names.push(form[i].value);
      }
    }
    this.setState({
      names
    })
    form.hidden = true;
    this.newGameRef.current.hidden = false;
    this.modalRef.current.hidden = true;
  }

  handleNewGameButtonClick = () => {
    this.formRef.current.reset();
    this.formRef.current.hidden = false;
    this.newGameRef.current.hidden = true; 
    this.setState({
      names: ['speler 1', 'speler 2', 'speler 3', 'speler 4']
    })
    this.modalRef.current.hidden = false;
  }

  render() {
  return (
    <div className="app">
      <div className='modal' ref={this.modalRef}>
      <form ref={this.formRef}>
        <div className='flexModal'>
          <p>Geef namen in:</p>
          <label>Speler 1:<input></input></label><br></br>
          <label>Speler 2:<input></input></label><br></br>
          <label>Speler 3:<input></input></label><br></br>
          <label>Speler 4:<input></input></label><br></br>
          <button onClick={this.handleNameButtonClick}>Bevestigen</button>
        </div>
      </form>
      </div>
      <button hidden ref={this.newGameRef} onClick={this.handleNewGameButtonClick} >New Game</button>
      <Game names={this.state.names} />

    </div>
  );
  }
}

export default App;
