import React from 'react';
import './App.css';
import Game from './Game';

const names = ["jan", "simon", "jens", "michiel"];

class App extends React.Component {

  handleNameButtonClick = (e) => {
    e.preventDefault();
    const form = e.currentTarget.parentElement;
    const names = [];
    for(let i = 0; i < 4; i++){
      names.push(form[i].value);
    }
    console.log(names);
    form.parentElement.innerHTML = `<p></p>`;
  }

  render() {
  return (
    <div className="app">
      <form>
      <p>Geef namen in:</p>
      <label>Speler 1:<input></input></label>
      <label>Speler 2:<input></input></label>
      <label>Speler 3:<input></input></label>
      <label>Speler 4:<input></input></label>
      <button onClick={this.handleNameButtonClick}>Bevestigen</button>
      </form>

    </div>
  );
  }
}

export default App;
