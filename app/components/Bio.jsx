const React = require('react');

class Bio extends React.Component {
	constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          {this.props.bioInfo}
        </div>
      );
  }
}

module.exports = Bio;