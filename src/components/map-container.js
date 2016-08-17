import React from 'react';
import PlacesList from './places-list';
import PlaceDetail from './place-detail';

class MapContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {currentPlace: {}, markers: []};
  }
  componentDidMount(){
    this.initMap();
  }
  initMap(){
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.props.lat, lng: this.props.lng},
      zoom: this.props.zoom,
      styles: [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
    });
    var infowindow = new google.maps.InfoWindow();
    this.setState({ map: map, infowindow: infowindow });

    if (window.board){
      var self = this;
      this.props.places.forEach((place) => {
        self.createMarker(place, map);
      })
    }

    var input = document.getElementById('pac-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    var service = new google.maps.places.PlacesService(map);

    autocomplete.addListener('place_changed', () => {
      this.clearMarkers();
      this.props.clearStarred();
      var place = autocomplete.getPlace();

      var newQuery = place.formatted_address;
      this.props.changeQuery(newQuery);

      this.changeCenter(place.geometry.location);
      this.changeZoom(14);
      this.setPlaces(service, place.geometry.location);
    })
  }
  changeCenter(newLocation){
    this.state.map.setCenter(newLocation);
    this.props.changeLatLng(newLocation.lat(), newLocation.lng());
  }
  changeZoom(newZoom){
    this.state.map.setZoom(newZoom);
    this.props.changeZoom(newZoom);
  }
  setPlaces(service, newLocation){
    service.textSearch({
      location: newLocation,
      radius: 500,
      query: 'fitness'
    }, (results, status) => {
      var places = results.slice(0, 10).map((place) => {
        this.createMarker(place, this.state.map);
        return place;
      });
      this.props.changePlaces(places);
    });
  }
  clearMarkers(){
    this.state.markers.forEach((marker) => marker.setMap(null));
    this.setState({markers: []});
  }
  createMarker(place, map) {
    var self = this;
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });
    var markers = this.state.markers;
    markers.push(marker);
    this.setState({markers: markers});

    google.maps.event.addListener(marker, 'click', function(){
      self.state.infowindow.setContent(place.name);
      self.state.infowindow.open(self.state.map, this);
    });
  }
  _changeCurrentPlace(object){
    this.setState({currentPlace: object});
  }
  _showDetailsDisplay(){
    if (!this.state.detailsDisplay){
      this.setState({detailsDisplay: true});
    }
  }
  _handleTextChange(event){
    this.setState({query: event.target.value});
  }
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-8'>
            <input id="pac-input" className="controls" type="text"
              placeholder="Enter a location" defaultValue={ this.props.query } />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            <div id='map'>
            </div>
          </div>
          <div className='place-list col-md-4'>
            <PlacesList showDetailsDisplay={ this._showDetailsDisplay.bind(this) } changeCurrentPlace={ this._changeCurrentPlace.bind(this) } places={ this.props.places } toggleStarred={ this.props.toggleStarred } starred={ this.props.starred } />
          </div>
        </div>
        <PlaceDetail detailsDisplay={ this.state.detailsDisplay } data={ this.state.currentPlace } />
      </div>
    );
  }
}

export default MapContainer;
