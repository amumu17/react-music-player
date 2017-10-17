import React, { Component } from 'react';
import './MusicListItem.less';
let Pubsub = require('pubsub-js');

class MusicListItem extends Component {

  constructor(props){
    super(props);

  }
  play (item) {
    Pubsub.publish('playMusic',item);
  }
  detele (item,e) {
    e.stopPropagation();
    Pubsub.publish('deteleMusic',item);
  }
  render () {
    let item = this.props.data;
    return (
      <li className={`component-musicListItem row ${this.props.active? 'active':''}`} onClick={ this.play.bind(this,item) }>
        <p><span className="bold">{item.title}</span> - {item.artist}</p>
        <p className="-col-auto detele" onClick={ this.detele.bind(this,item) }></p>
      </li>
    )
  }
}

export default MusicListItem