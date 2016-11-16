const React = require('react');

class Bio extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName
    }
  }

  render() {
    return (
        <div>
          <div className="card-container">
            <div className="title">
              Bio
            </div>
            <div className="info">
              {this.state.firstName + ' ' + this.state.lastName}
            </div>
          </div>
        </div>
      );
  }
}

module.exports = Bio;