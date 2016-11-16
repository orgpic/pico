const React = require('react');

class UserInfo extends React.Component {
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
          <div> First name: {this.state.firstName} </div>
          <div> Last name: {this.state.lastName} </div>
        </div>
      );
  }
}

module.exports = UserInfo;