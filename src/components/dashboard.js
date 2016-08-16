import React from 'react';
import MapContainer from './map-container';
import Quote from './quote';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    if (window.board){
      board = window.board;
      this.state = { quote: "", author: "", lat: board.lat, lng: board.lng, zoom: board.zoom, query: board.query };
    } else {
      this.state = { quote: "", author: "", lat: 37.09024, lng: -95.71289100000001, zoom: 4, query: "" };
    }
  }
  componentWillMount(){
    this.setQuote();
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
    $.ajax({
      url: "/boards",
      method: "POST",
      data: {
        lat: self.state.lat,
        lng: self.state.lng,
        zoom: self.state.zoom,
        query: self.state.query
      }
    })
    .done((response) => {
      debugger
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
  render() {
    return (
      <div id='dashboard'>
        <h1>
          SuccessBoard
          <a href="#" onClick={ this._handleSave.bind(this) }><i className="fa fa-floppy-o" aria-hidden="true"></i></a>
        </h1>
        <Quote setQuote={ this.setQuote.bind(this) } quote={ this.state.quote } author={ this.state.author } />
        <MapContainer changeZoom={this._changeZoom.bind(this)} changeQuery={this._changeQuery.bind(this)} changeLatLng={this._changeLatLng.bind(this)} lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} query={this.state.query} />
      </div>
    );
  }
}

export default Dashboard;
