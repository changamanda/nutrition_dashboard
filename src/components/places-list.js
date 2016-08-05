import React from 'react';
import Place from './place';

class PlacesList extends React.Component {
  render() {
    return (
      <ul className="list-group">
        { this.props.places.map((place) => (<Place key={ place.id } data={place} />)) }
      </ul>
    );
  }
}

export default PlacesList;
