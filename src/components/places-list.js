import React from 'react';
import Place from './place';

class PlacesList extends React.Component {
  render() {
    return (
      <ul className="list-group">
        { this.props.places.map((place, i) => (<Place key={ i } id={ i } toggleStarred={ this.props.toggleStarred } showDetailsDisplay={ this.props.showDetailsDisplay } changeCurrentPlace={ this.props.changeCurrentPlace } data={place} starred={ this.props.starred } />)) }
      </ul>
    );
  }
}

export default PlacesList;
