import React from 'react';
import Place from './place';

class PlacesList extends React.Component {
  render() {
    return (
      <ul className="list-group">
        { this.props.places.map((place) => (<Place key={ place.id } showDetailsDisplay={ this.props.showDetailsDisplay } changeCurrentPlace={ this.props.changeCurrentPlace } data={place} />)) }
      </ul>
    );
  }
}

export default PlacesList;
