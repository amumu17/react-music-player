import React, { Component } from 'react';
import './player.less';
import Progress from '../Components/progress.js';
let Pubsub = require('pubsub-js');
let duration = null;
class Player extends Component {

  constructor (props) {
    super(props);
    this.state = {
      progress: 0,
      volume: 0,
      leftTime: '00:00',
      isPlay: true
    }
    this.formatTime = this.formatTime.bind(this);
    this.changePlayProgress = this.changePlayProgress.bind(this);
    this.changePlayStatus = this.changePlayStatus.bind(this);
  }
  changeRepeatType (){
    Pubsub.publish('changeRepeatType');
  }
  PlayControlHandler (option) {
    Pubsub.publish('playControl',option);
  }
  changePlayStatus () {
    if(this.state.isPlay){
      $('#player').jPlayer('pause')
    } else {
      $('#player').jPlayer('play')
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  }
  changePlayProgress (progress) {
    $('#player').jPlayer('play',duration * progress);
    this.setState({
      isPlay: true
    })
  }
  changePlayVolume (progress) {
    $('#player').jPlayer('volume',progress)
  }
  formatTime (time){
    time = Math.floor(time);
    let muniute = Math.floor(time/60);
    let seconds = Math.floor(time%60);
    return muniute + ':' + (seconds<10? '0'+seconds : seconds)
  }
  componentDidMount () {
    $('#player').bind($.jPlayer.event.timeupdate, e => {
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
        leftTime: this.formatTime(duration * (1-e.jPlayer.status.currentPercentAbsolute/100))
      })
    });
  }
  render () {
    let item = this.props.currentMusic;
    return (
      <div className="page-player">
        <h1 className="link">我的音乐工坊 &gt;</h1>
        <div className="row mt20">
          <div className="control-wrapper">
            <h2 className="music-title">{ item.title }</h2>
            <h3 className="music-artist">{ item.artist }</h3>
            <div className="mt20">
              <div className="left-time">-{ this.state.leftTime }</div>
              <div className="volume-wrapper row">
                <i className="icon-volume -col-auto" style={{top: 5, left: -5}}></i>
                <Progress
                  percent={ this.state.volume }
                  color='#333'
                  height='5'
                  progressChangeHandler={ this.changePlayVolume }
                  ></Progress>
              </div>
            </div>
            <div className='progress-wrapper mt20'>
              <Progress
                percent={ this.state.progress }
                color='#ff4900'
                height='7'
                progressChangeHandler = { this.changePlayProgress }
                ></Progress>
            </div>
            <div className="mt20 row">
              <div>
                <i className="icon prev" onClick={ this.PlayControlHandler.bind(this,'prev') }></i>
                <i className={`icon ${this.state.isPlay?'play':'pause'}`} onClick={ this.changePlayStatus }></i>
                <i className="icon next" onClick={ this.PlayControlHandler.bind(this,'next') }></i>
              </div>
              <div className="-col-auto">
                <i className={`icon repeat-${this.props.repeatType}`} onClick={ this.changeRepeatType.bind(this) }></i>
              </div>
            </div>
          </div>
          <div className="thumb -col-auto cover">
            <img src={ item.cover } title={ item.title }/>
          </div>
        </div>
      </div>
    )

  }
}

export default  Player