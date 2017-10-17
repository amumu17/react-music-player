import React, { Component } from 'react';
import './progress.less';
let Pubsub = require('pubsub-js');

class Progress extends Component {

  constructor (props) {
    super(props);
    this.changeProgress = this.changeProgress.bind(this);
  }
  changeProgress (e) {
    let progressBar = this.refs.progress;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
    this.props.progressChangeHandler && this.props.progressChangeHandler(progress);
  }
  render () {
    return (
      <div className="component-progress" ref="progress" onClick={ this.changeProgress } style={{height:`${this.props.height}px`}}>
        <div className="progress" style={{width:`${this.props.percent}%`,background:this.props.color, height: `${this.props.height}px`}}></div>
      </div>
    )
  }
}

export default Progress