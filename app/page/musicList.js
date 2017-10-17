import React, { Component } from 'react';
import './musicList.less';
import MusicListItem from '../Components/MusicListItem.js';
class MusicList extends Component {

  render () {
    let Items = this.props.musicList.map((item,index) => {
      return (
        <MusicListItem
          key={item.id}
          data={item}
          active={this.props.currentMusic === item}
          ></MusicListItem>
      )
    })

    return (
      <ul>
        { Items }
      </ul>
    )
  }
}

export default MusicList