import React from "react";

class Secondary extends React.Component {
  state = {
    /*Line: 4,
    Column: 4,*/
    DisplayOne: 'none',
    DisplayTwo: 'none',
    MarginTop: '52px',
    MarginLeft: '52px',
    CellIndex: -1,
    RowIndex: -1,
    Trs: [[Math.random(),Math.random(),Math.random(),Math.random()],[Math.random(),Math.random(),Math.random(),Math.random()],[Math.random(),Math.random(),Math.random(),Math.random()],[Math.random(),Math.random(),Math.random(),Math.random()]]
  };

  AddLine = () => {
    let arr = [...this.state.Trs];
    let ones = [];
    for(let i = 0; i < arr[0].length; i++){
      ones[i] = 1;
    }
    arr.push(ones);
    this.setState({Trs : arr});
  };

  AddColumn = () => {
    let arr = [...this.state.Trs];
    for(let i = 0; i < arr.length; i++){
      arr[i].push(1);
    }
    this.setState({Trs : arr});
  };

  DeleteLine = () => {
    let arr = [...this.state.Trs];
    let first = [];
    let j = 0;
    for(let i = 0; i < arr.length; i++) {
      if (i !== this.state.RowIndex) {
          first[j] = arr[i];
          j++;
      }
    }
    this.setState({Trs : first});
    this.HideButtons();
  };

  DeleteColumn = () => {
    let arr = [...this.state.Trs];
    let first = [];
    for(let i = 0; i < arr.length; i++){
      first[i] = [];
      for(let j = 0; j < arr[i].length; j++){
        if (j !== this.state.CellIndex) {
          first[i].push(arr[i][j]);
        }
      }
    }
    this.setState({Trs : first});
    this.HideButtons();
  };

  ControlDeleteButtons = (event) => {
    //console.dir(event.target);
    if(event.target.nodeName === "TD"){
      this.setState({MarginTop : event.target.offsetTop});
      this.setState({MarginLeft : event.target.offsetLeft});
      this.MouseOnButton();
      this.setState({CellIndex : event.target.cellIndex});
      this.setState({RowIndex : event.target.parentNode.rowIndex});
    }
  };

  HideButtons = () => {
    this.setState({DisplayOne : 'none'});
    this.setState({DisplayTwo : 'none'});
  };

  TimeOut = () => {
    this.variableTimeOut = setTimeout(this.HideButtons, 400);
  };

  MouseOnButton = () => {
    let arr = [...this.state.Trs];
    if(arr.length > 1){
      this.setState({DisplayOne : 'inline-block'});
    }
    if(arr[0].length > 1) {
      this.setState({DisplayTwo : 'inline-block'});
    }
    clearTimeout(this.variableTimeOut);
  };

  render() {
    return (
      <div className="main">
        <table className="table" onMouseOver={this.ControlDeleteButtons} onMouseLeave={this.TimeOut}>
          <tbody>
          {this.state.Trs.map(function (tr, i) {
            return <tr key={i} className="line">{tr.map(function (e) {
              return <td key={e} className="column" />;
            })}</tr>;
          })}
          </tbody>
        </table>
      <button className="buttonAddLine" onClick={this.AddLine}>+</button>
      <button className="buttonAddColumn" onClick={this.AddColumn}>+</button>
      <button style={{display: this.state.DisplayOne, marginTop: this.state.MarginTop}} className="buttonDeleteLine" onClick={this.DeleteLine} onMouseOver={this.MouseOnButton} onMouseLeave={this.TimeOut}>-</button>
      <button style={{display: this.state.DisplayTwo, marginLeft: this.state.MarginLeft}} className="buttonDeleteColumn" onClick={this.DeleteColumn} onMouseOver={this.MouseOnButton} onMouseLeave={this.TimeOut}>-</button>
      </div>
    );
  }
}

export default Secondary;
