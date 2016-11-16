const React = require('react');

class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      email: this.props.email,
      github: this.props.github
    }
  }

  render() {
    return (
        <div className="user-info-container">
          <div className="title">
            Username
          </div>
          <div className="info">
            {this.state.username}
          </div>
          <div className="title">
            Email
          </div>
          <div className="info">
            {this.state.email}
          </div>
          <div className="title">
            Github
          </div>
          <div className="info">
            {this.state.github}
          </div>
        </div>
      );
  }
}

module.exports = UserInfo;