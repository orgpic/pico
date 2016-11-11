const React = require('react');

class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          Stats!
          <div>Username: {this.props.username}</div>
          <div>Email: {this.props.email}</div>
          <div>Github: {this.props.github}</div>
        </div>
      );
  }
}

module.exports = Stats;