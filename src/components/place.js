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
  _handleClick(event){
    event.preventDefault();
    this.props.showDetailsDisplay();
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
