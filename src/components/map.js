import React from 'react';
import PlacesList from './places-list';

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {lat: 37.09024, lng: -95.71289100000001, zoom: 4, places: []};
  }
  componentDidMount(){
    this.initMap();
  }
  initMap(){
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.state.lat, lng: this.state.lng},
      zoom: this.state.zoom,
      styles: [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
    });
    var infowindow = new google.maps.InfoWindow();
    this.setState({ map: map, infowindow: infowindow });

    var input = document.getElementById('pac-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    var service = new google.maps.places.PlacesService(map);

    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace();
      this.changeCenter(place.geometry.location);
      this.changeZoom(14);
      this.setPlaces(service, place.geometry.location);
    })
  }
  changeCenter(newLocation){
    this.state.map.setCenter(newLocation);
    this.setState({lat: newLocation.lat(), lng: newLocation.lng()});
  }
  changeZoom(newZoom){
    this.state.map.setZoom(newZoom);
    this.setState({zoom: newZoom});
  }
  setPlaces(service, newLocation){
    service.textSearch({
      location: newLocation,
      radius: 500,
      query: 'fitness'
    }, (results, status) => {
      var places = results.slice(0, 10).map((place) => {
        this.createMarker(place);
        return place;
      });
      this.setState({places: places});
    });
  }
  createMarker(place) {
    var self = this;
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.state.map,
      position: place.geometry.location,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    google.maps.event.addListener(marker, 'click', function(){
      self.state.infowindow.setContent(place.name);
      self.state.infowindow.open(self.state.map, this);
    });
  }
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-8'>
            <input id="pac-input" className="controls" type="text"
              placeholder="Enter a location" />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            <div id='map'>
            </div>
          </div>
          <div className='col-md-4'>
            <PlacesList places={ this.state.places } />
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
