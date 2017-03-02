import React, { Component } from 'react';
import {connect} from 'react-redux';


class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequireName: false,
      isRequireArea: false
    };
  }
  onSave(val){
    this.onCheck(val)
    if(this.nameInput.value==="" || this.areaInput.value===""){
      return;
    }
    this.props.saveMeet(this.nameInput.value, this.areaInput.value)
  }
  onCheck(val){
    this.setState({ isRequireName: this.nameInput.value==="" });
    this.setState({ isRequireArea: this.areaInput.value==="" });
  }

  render() {
    var
      requireName ="edit-input ",
      requireNemePar = "edit-temp red ",
      requireArea ="edit-input edit-input-area " ;
    requireName+=this.state.isRequireName?'red':'';
    requireArea+=this.state.isRequireArea?'red':'';
    requireNemePar+=this.state.isRequireName?'':'hide';

    console.log(" requireName = ", requireName);
    return (
      <form  className="edit">
        <div  className="edit-title"> New meeting on September 22 </div>
        <div className="edit-temp">Participant</div>
        <input
          className={requireName}
          placeholder="Name"
          ref={(input) => this.nameInput = input}
          onChange={this.onCheck.bind(this)}
        />
        <div className={requireNemePar}>Participant is required</div>
        <div className="edit-temp">Description</div>
        <textarea
          className={requireArea}
          placeholder="Meeting description"
          ref={(input) => this.areaInput = input}
          onChange={this.onCheck.bind(this)}
        />
        <div className="edit-button close" onClick={this.props.changeMode}>X</div>
        <div className="edit-button save" onClick={this.onSave.bind(this)}>SAVE</div>
        <div className="edit-button cansel">CANSEL</div>
      </form>
    );
  }
}



export default connect(
  state=>({
    // meetDate:state.edit
  }),
  dispatch=>({
    changeMode: (val)=>{
      dispatch({type:"TOGGLE_EDIT"})
    },
    saveMeet: (name, content)=>{
      dispatch({type:"SAVE_MEET", name, content})
    }
  })
)(Editor);