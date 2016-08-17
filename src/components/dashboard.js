import React from 'react';
import MapContainer from './map-container';
import Quote from './quote';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    if (window.board){
      board = window.board;
      this.state = { quote: board.quote, author: board.author, lat: board.lat, lng: board.lng, zoom: board.zoom, query: board.query, places: JSON.parse(board.places), starred: JSON.parse(board.starred) };
    } else {
      this.state = { quote: "", author: "", lat: 37.09024, lng: -95.71289100000001, zoom: 4, query: "", places: [], starred: [] };
    }
  }
  componentWillMount(){
    if (!window.board){
      this.setQuote();
    }
  }
  setQuote(){
    $.ajax({
      url: "/quotes/random"
    })
    .done((response) => {
      this.setState({quote: response.quote, author: response.author });
    })
  }
  _handleSave(event){
    event.preventDefault();
    var self = this;
    var id = (window.board ? window.board._id : "");
    console.log(id);
    $.ajax({
      url: "/boards/" + id,
      method: "POST",
      data: {
        lat: self.state.lat,
        lng: self.state.lng,
        zoom: self.state.zoom,
        query: self.state.query,
        places: JSON.stringify(self.state.places),
        quote: self.state.quote,
        author: self.state.author,
        starred: JSON.stringify(self.state.starred)
      }
    })
    .done((response) => {
      window.location = 'https://' + window.location.host + '/' + response._id;
    })
  }
  _changeLatLng(newLat, newLng){
    this.setState({ lat: newLat, lng: newLng });
  }
  _changeZoom(newZoom){
    this.setState({ zoom: newZoom });
  }
  _changeQuery(newQuery){
    this.setState({ query: newQuery });
  }
  _changePlaces(newPlaces){
    this.setState({ places: newPlaces });
  }
  _toggleStarred(index){
    var arrayId = this.state.starred.indexOf(index);
    var starred = this.state.starred;
    if (arrayId === -1){
      starred.push(index);
    } else {
      starred.splice(arrayId, 1);
    }
    this.setState({ starred: starred });
  }
  _clearStarred(){
    this.setState({ starred: [] });
  }
  render() {
    return (
      <div id='dashboard'>
        <h1>
          SuccessBoard
          <a href="#" onClick={ this._handleSave.bind(this) }><i className="fa fa-floppy-o" aria-hidden="true"></i></a>
        </h1>
        <Quote setQuote={ this.setQuote.bind(this) } quote={ this.state.quote } author={ this.state.author } />
        <MapContainer changeZoom={this._changeZoom.bind(this)} changeQuery={this._changeQuery.bind(this)} changeLatLng={this._changeLatLng.bind(this)} lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} query={this.state.query} places={this.state.places} changePlaces={this._changePlaces.bind(this)} starred={this.state.starred} toggleStarred={this._toggleStarred.bind(this)} clearStarred={this._clearStarred.bind(this)} />
      </div>
    );
  }
}

export default Dashboard;
