import React, { Component } from 'react';

class ToyCard extends Component {

  // state={
  //   id: this.props.toy.id
  // }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name /* Toy's Name */}</h2>
        <img src={this.props.toy.image /* Toy's Image */} alt={this.props.toy.name /* Toy's Name */} className="toy-avatar" />
        <p>{this.props.toy.likes /* Toy's Likes */} Likes </p>
        <button onClick={()=>this.props.updateToyLikes(this.props.toy.id,this.props.toy.likes)} className="like-btn">Like {'<3'}</button>
        <button onClick={()=>this.props.removeToyCard(this.props.toy.id)} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
