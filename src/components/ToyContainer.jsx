import React from 'react';
import ToyCard from './ToyCard'


const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy => <ToyCard key={toy.id} toy={toy} removeToyCard={props.removeToyCard} updateToyLikes={props.updateToyLikes}/>)}
    </div>
  );
}

export default ToyContainer;
