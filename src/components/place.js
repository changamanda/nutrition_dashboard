import React from 'react';

class Place extends React.Component {
  constructor(props){
    super(props);
    this.state = { favorited: false };
  }
  _toggleFavorite(event){
    event.preventDefault();
    this.refs.star.blur();
    this.setState({ favorited: !this.state.favorited });
  }
  _faClassName(){
    return this.state.favorited ? "fa fa-star" : "fa fa-star-o";
  }
  render() {
    var faClass = this._faClassName();
    return (
      <li className='list-group-item'>
        { this.props.data.name }
        <a ref="star" href="#"><i onClick={ this._toggleFavorite.bind(this) } className={ faClass } aria-hidden="true"></i></a>
      </li>
    );
  }
}

export default Place;
