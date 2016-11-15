const React = require('react');
const Stats = require('./Stats.jsx');
const Bio = require('./Bio.jsx');
const Collaborators = require('./Collaborators.jsx');
const UserInfo = require('./UserInfo.jsx');
const cookie = require('react-cookie');


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const context = this;
    this.state = {
      authorized: 'pending'
    }
    this.socket = io();
  }
  ComponentWillRender() {
    const token = localStorage['jwtToken'];
    const context = this;
    if (token) {
      console.log('this is the token', token)
      axios.get('/decode', {
        params: {
          token: token
        }
      })
      .then (function(response) {
        const user = response.data;

        context.setState({
          containerName: user.username,
          username: user.username
       });
        context.renderTerminal();
      }).catch(function(err) {
        console.log(err);
        alert('Not Authenticated, returning to login');
        window.location = '/';
      });
    }
  }
  render() {
    if (this.state.authorized === 'pending') {
      return (
          <div>
            Authorizing user...
          </div>
        );
    } else if (this.state.authorized === false) {
      window.location = '/';
      return(
        <div className="error"> 
          You are not logged in! Returning back to Login Page...
        </div>
      )
    } else if (this.state.authorized === true) {
      return (
          <div>
            Dashboard!
            <Stats username="username" email="email@email.com" github="somegithub"/>
            <Bio bioInfo="Bio Info!"/>
            <Collaborators curCollab="Hobo Jim" collabWith={["Mr. Cool", "Some Guy"]}/>
            <UserInfo />
          </div>
        );
    }
  }
}

module.exports = Dashboard;