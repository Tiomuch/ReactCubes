import React from 'react';

class App extends React.Component {
  state = {
    displayOne: 'none',
    displayTwo: 'none',
    marginTop: '52px',
    marginLeft: '52px',
    cellIndex: -1,
    rowIndex: -1,
    trs: [[Math.random(),Math.random(),Math.random(),Math.random()],[Math.random(),Math.random(),Math.random(),Math.random()],[Math.random(),Math.random(),Math.random(),Math.random()],[Math.random(),Math.random(),Math.random(),Math.random()]]
  };

  addLine = () => {
    let tr = [];
    for(let i = 0; i < this.state.trs[0].length; i++){
      tr[i] = Math.random();
    }
    this.setState({trs : [...this.state.trs, tr]});
  };

  addColumn = () => {
    let array = [...this.state.trs];
    array.forEach((element) => element.push(Math.random()));
    this.setState({trs : array});
  };

  deleteLine = () => {
    let arr = [...this.state.trs];
    let first = [];
    let j = 0;
    for(let i = 0; i < arr.length; i++) {
      if (i !== this.state.rowIndex) {
        first[j] = arr[i];
        j++;
      }
    }
    this.setState({trs : first});
    this.hideButtons();
  };

  deleteColumn = () => {
    let arr = [...this.state.trs];
    let first = [];
    for(let i = 0; i < arr.length; i++){
      first[i] = [];
      for(let j = 0; j < arr[i].length; j++){
        if (j !== this.state.cellIndex) {
          first[i].push(arr[i][j]);
        }
      }
    }
    this.setState({trs : first});
    this.hideButtons();
  };

  controlDeleteButtons = (event) => {
    if(event.target.nodeName === "TD"){
      this.mouseOnButton();
      this.setState({cellIndex : event.target.cellIndex, marginTop : event.target.offsetTop, marginLeft : event.target.offsetLeft, rowIndex : event.target.parentNode.rowIndex});
    }
  };

  hideButtons = () => {
    this.setState({displayOne: 'none', displayTwo: 'none'});
  };

  timeOut = () => {
    this.variabletimeOut = setTimeout(this.hideButtons, 400);
  };

  mouseOnButton = () => {
    if(this.state.trs.length > 1){
      this.setState({displayOne : 'inline-block'});
    }
    if(this.state.trs[0].length > 1) {
      this.setState({displayTwo : 'inline-block'});
    }
    clearTimeout(this.variabletimeOut);
  };

  render() {
    return (
      <div className="main">
        <table className="table" onMouseOver={this.controlDeleteButtons} onMouseLeave={this.timeOut}>
          <tbody>
          {this.state.trs.map((tr, i) => (
            <tr key={i} className="line">{tr.map((e) => (
              <td key={e} className="column" />
              ))}</tr>
            ))}
          </tbody>
        </table>
        <button className="button-add-line" onClick={this.addLine}>+</button>
        <button className="button-add-column" onClick={this.addColumn}>+</button>
        <button style={{display: this.state.displayOne, marginTop: this.state.marginTop}} className="button-delete-line" onClick={this.deleteLine} onMouseOver={this.mouseOnButton} onMouseLeave={this.timeOut}>-</button>
        <button style={{display: this.state.displayTwo, marginLeft: this.state.marginLeft}} className="button-delete-column" onClick={this.deleteColumn} onMouseOver={this.mouseOnButton} onMouseLeave={this.timeOut}>-</button>
      </div>
    );
  }
}

export default App;
