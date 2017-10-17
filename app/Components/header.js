import React,{Component} from 'react';
import './header.less';

class Header extends Component {
  render(){
    return (
      <div className="component-header row">
        <img src="../static/images/logo.png" width="40" alt="" className="logo -col-auto"/>
        <h1 className="caption">React Music Play</h1>
      </div>
    )
  }
}

export default  Header