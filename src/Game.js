import React from 'react';
import './App.css';

class Game extends React.Component {
  state = {
    scores: {},
    types: {
      solo6: {goal: 6, results: [12, 15, 18, 18, 18, 18, 18, 18], aantalSpelers: 1},
      samen8: {goal: 8, results: [7, 10, 13, 16, 19, 30], aantalSpelers: 2},
      samen9: {goal: 9, results: [10, 13, 16, 19, 30], aantalSpelers: 2},
      abondance: {results: 32, aantalSpelers: 1},
      troel: {results: 16, aantalSpelers: 2},
      miserie: {results: 36, aantalSpelers: 'nvt'}
    },
    select: {
      active: '',
      inactive: ''
    }
  }
  
  typeRef = React.createRef();
  slagenRef = React.createRef();
  geslaagdRef = React.createRef();

  setNames = () => {
    let scores = {};
    Array.from(this.props.names).map(el => {
      scores[el] = [];
    });
    this.setState({
      scores
    });
  };

  handleClick = (e) => {
    e.currentTarget.classList.toggle('active');
    e.currentTarget.classList.toggle('inactive');
    const active = Array.from(document.getElementsByClassName('active')).map(el => el.id);
    const inactive = Array.from(document.getElementsByClassName('inactive')).map(el => el.id);
    this.setState({
      select: {
        active,
        inactive
      }
    });    
  }

  renderNames = () => {
    return (
      Array.from(this.props.names).map(el =>
        <th id={el} onClick={this.handleClick} className="inactive" >{el}</th>
      )
    );    
  };

  renderFirstScores = () => {
    return (
      Array.from(this.props.names).map(el =>
        <th name={el} >0</th>
      )
    );
  };

  //scores rederen bij bevestigen
  renderScores = () => {
    const scores = this.state.scores;
    console.log(scores);
    console.log(Object.keys(this.state.scores));
    const names = Object.keys(this.state.scores);
    names.map(el => {
      const element = document.getElementsByName(el);
      let HTML = `${scores[el][0]}`;
      console.log(scores[el]);
      let tussen = scores[el][0];
      for(let i = 1; i < scores[el].length; i++){
        tussen += scores[el][i] 
        HTML += `<br>${tussen}`; 
      }
      Array.from(element)[0].innerHTML = HTML;
      console.log(Array.from(element)[0].innerHTML);
    });
  }

  //voegt score toe aan persoon
  calculateScoreSamen = (typeSpel, aantalSlagen) => {
    const arr = this.state.types[typeSpel].results;
    const overSlagen = aantalSlagen - this.state.types[typeSpel].goal;
    if(overSlagen < 0) {
      console.log((arr[overSlagen * -1]));
      return (arr[overSlagen * -1] * -1);
    }
    if(arr[overSlagen]){
      return arr[overSlagen];
    } else { 
      return;
    }
  }
  
  calculateScoreSpecialekes = (typeSpel, geslaagd) => {
    return geslaagd === 'geslaagd'? (this.state.types[typeSpel].results): (this.state.types[typeSpel].results * -1);  
  }

  checkActivePlayers = () => {
    const typeSpel = this.typeRef.current.value;
    const aantalActive = this.state.select.active.length;
    console.log(typeSpel, aantalActive);
    if(this.state.types[typeSpel].aantalSpelers === 'nvt' || this.state.types[typeSpel].aantalSpelers === aantalActive){
      return true;
    } else {
      return false;
    }
  }

  //alle scores state updaten
  handleScoring = () => {
    //checken of aantal spelers klopt
    if(this.checkActivePlayers() === false){
      window.alert('Aantal spelers klopt niet voor dit speltype! Geef correct aantal in!');
      return;
    }

    const scores = this.state.scores;
    const type = this.typeRef.current.value;
    const aantalSlagen = this.slagenRef.current.value;
    const active = this.state.select.active;
    const inactive = this.state.select.inactive;
    let factor;
    active.length === inactive.length ? factor = 1 : factor = 3;
    if(type.includes("samen") || type.includes("solo")){
      active.map(el => {
        scores[el].push(this.calculateScoreSamen(type, aantalSlagen) * factor);
      });
      inactive.map(el => {
        scores[el].push(this.calculateScoreSamen(type, aantalSlagen) * -1);
      });      
    } else {
      active.map(el => {
        scores[el].push(this.calculateScoreSpecialekes(type, this.geslaagdRef.current.value) * factor);
      });
      inactive.map(el => {
        scores[el].push(this.calculateScoreSpecialekes(type, this.geslaagdRef.current.value) * -1);
      });      
    }

    this.setState({
      scores
    });
    this.renderScores();
  }

  handleTypeChange = () => {
    if(this.typeRef.current.value.includes('solo') || this.typeRef.current.value.includes('samen')){
      this.slagenRef.current.hidden = false;
      this.geslaagdRef.current.hidden = true;
    } else {
      this.slagenRef.current.hidden = true;
      this.geslaagdRef.current.hidden = false;
    }
  }

  componentDidMount() {
    this.setNames();
    this.handleTypeChange();
  }

  render() {
    return (
      <div className='flexValues'>
        <table className="center">
          <tr>
            {this.renderNames()}
          </tr>
          <tr>
            {this.renderFirstScores()}
          </tr>
        </table> 
        <div> 
          <select ref={this.typeRef} onChange={this.handleTypeChange} className='inputElement'>
            {Object.keys(this.state.types).map(el => 
              <option value={el} >{el}</option>
            )}
          </select>
          <input type='number' placeholder="aantal slagen" ref={this.slagenRef} className='inputElement' min='0' max='13'></input>
          <select ref={this.geslaagdRef}>
            <option value={'geslaagd'} >Geslaagd</option>
            <option value={'gefaald'} >Gefaald</option>
          </select>
          <button onClick={this.handleScoring} className='inputElement'>Bevestigen</button>
        </div>
      </div>
    );
  }
}

export default Game;