import React from 'react';

class PlaceDetail extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    if (!this.props.detailsDisplay){
      return false;
    }
    return (
      <div className='row well'>
        <h3>{ this.props.data.name }</h3>
        <h5>{ this.props.data.formatted_address }</h5>
        { this.props.data.rating ? (<p>Rating: { this.props.data.rating }</p>) : false }
      </div>
    );
  }
}

export default PlaceDetail;
