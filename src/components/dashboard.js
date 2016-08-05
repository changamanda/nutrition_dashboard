import React from 'react';
import Map from './map';
import Quote from './quote';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = { quote: "", author: "" };
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
  render() {
    return (
      <div id='dashboard'>
        <Quote setQuote={ this.setQuote.bind(this) } quote={ this.state.quote } author={ this.state.author } />
        <Map />
      </div>
    );
  }
}

export default Dashboard;
