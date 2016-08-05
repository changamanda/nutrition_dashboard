import React from 'react';

class Quote extends React.Component {
  _handleRefreshClick(event){
    event.preventDefault();
    this.refs.link.blur();
    this.props.setQuote();
  }
  render() {
    return (
      <div className='row'>
        <div className='well'>
          { this.props.quote } <em>—{ this.props.author }</em>
          <a ref="link" href="#"><i onClick={ this._handleRefreshClick.bind(this) } className="fa fa-refresh" aria-hidden="true"></i></a>
        </div>
      </div>
    );
  }
}

export default Quote;
