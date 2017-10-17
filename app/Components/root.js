import React, { Component } from 'react';
import Header from './header.js';
import MusicListPage from '../page/musicList.js';
import PlayerPage from '../page/player.js';
import { MUSIC_LIST } from '../config/musicList.js';
let Pubsub = require('pubsub-js');
import Util from '../util/util.js';
class Root extends Component {
  constructor (props){
    super(props);
    this.state = {
      musicList: MUSIC_LIST,
      currentMusic: MUSIC_LIST[0],
      repeatType: 'loop'//'one' 'random'
    };
    this.playMusic = this.playMusic.bind(this);
    this.findMusicIndex = this.findMusicIndex.bind(this);
    this.playWhenEnd = this.playWhenEnd.bind(this);
  }
  playWhenEnd () {
    let index = this.findMusicIndex(this.state.currentMusic);
    let length = this.state.musicList.length;
    let type = this.state.repeatType;
    if(type=='one'){
      index = index;
    } else if(type=='loop') {
      index = (index+1) % length;
    } else if(type =='random'){
      let oldIndex = index;
      do{
        index = Util.getRandomInt(0,length-1);
      }while(index==oldIndex)
    }
    this.playMusic(this.state.musicList[index])
  }
  findMusicIndex (item){
    return this.state.musicList.indexOf(item);
  }
  playMusic (item) {
    $('#player').jPlayer('setMedia',{
      mp3: item.file
    }).jPlayer('play');
    this.setState({
      currentMusic: item
    })
  }
  componentDidMount () {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window',
      useStateClassSkin: true
    });
    this.playMusic(this.state.musicList[0]);
    $('#player').bind($.jPlayer.event.ended,()=>{
      this.playWhenEnd();
    });
    Pubsub.subscribe('playMusic',(msg,data) => {
      this.playMusic(data);
    })
    Pubsub.subscribe('deteleMusic',(msg,data) => {
      //detele
    })
    Pubsub.subscribe('playControl',(msg,data) => {
      let index = this.findMusicIndex(this.state.currentMusic);
      let length = this.state.musicList.length;
      if(data=='prev'){
        index = (index-1+length)%length;
      } else if(data == 'next'){
        index = (index+1)%length;
      }
      this.playMusic(this.state.musicList[index]);
    })
    let repeatTypeList = ['loop','one','random'];
    Pubsub.subscribe('changeRepeatType',(msg,data)=>{
      let oldIndex = repeatTypeList.indexOf(this.state.repeatType);
      let index = (oldIndex+1)%repeatTypeList.length;
      this.setState({
        repeatType: repeatTypeList[index]
      });
    })
  }
  componentWillUnMount () {
    $('#player').unbind($.jPlayer.event.ended);
    Pubsub.unsubscribe('playMusic');
    Pubsub.unsubscribe('deteleMusic');
    Pubsub.unsubscribe('playControl');
    Pubsub.unsubscribe('changeRepeatType');
  }

  render () {
    return (
      <div id="root">
        <Header></Header>
        <MusicListPage
          musicList={ this.state.musicList }
          currentMusic={ this.state.currentMusic }
          ></MusicListPage>
        <PlayerPage
          currentMusic={ this.state.currentMusic }
          repeatType = { this.state.repeatType }
          ></PlayerPage>
      </div>
    )
  }
}

export default Root