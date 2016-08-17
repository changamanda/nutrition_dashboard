import React from 'react';

class Place extends React.Component {
  constructor(props){
    super(props);
  }
  _toggleFavorite(event){
    event.preventDefault();
    this.refs.star.blur();
    this.props.toggleStarred(this.props.id);
  }
  _faClassName(){
    return this.props.starred.includes(this.props.id) ? "fa fa-star" : "fa fa-star-o";
  }
  _handleClick(event){
    event.preventDefault();

    $.ajax({
      url: '/place-info',
      method: 'POST',
      data: { placeId: this.props.data.place_id }
    })
    .done(function(response){
      var info = JSON.parse(response);
      window.open(info.result.website);
    })

    this.refs.name.blur();
    this.props.changeCurrentPlace(this.props.data);
  }
  render() {
    var faClass = this._faClassName();
    return (
      <li className='list-group-item'>
        <a ref="name" href="#" onClick={ this._handleClick.bind(this) }>{ this.props.data.name }</a>
        <a ref="star" href="#"><i onClick={ this._toggleFavorite.bind(this) } className={ faClass } aria-hidden="true"></i></a>
      </li>
    );
  }
}

export default Place;
