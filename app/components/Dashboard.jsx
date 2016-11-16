const React = require('react');
const Stats = require('./Stats.jsx');
const Bio = require('./Bio.jsx');
const Collaborators = require('./Collaborators.jsx');
const UserInfo = require('./UserInfo.jsx');
const NavBar = require('./NavBar.jsx');
const axios = require('axios');


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const context = this;
    this.state = {
      username: '',
      containerName: '',
      firstName: '',
      lastName: '',
      email: '',
      createdAt: null
    }
  }

  componentWillMount() {
    var context = this;
    const token = localStorage['jwtToken'];

    if (token) {
      axios.get('/decode', {
        params: {
          token: token
        }
      })
      .then (function(response) {
        const user = response.data;
        console.log('setting state!');
        context.setState({
          containerName: user.username,
          username: user.username
       });
        axios.get('/infodashboard', {
          params: {
            username: user.username
          }
        })
        .then(function(response){
          console.log(response);
          const user = response.data;
          context.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt
          })
        })
      });
    }
  } 


  render() {
   if (this.state.lastName.length) {
      return (
         <div>
          <NavBar username={this.state.username} />
          <div className="dashboard-container">
             <Stats username={this.state.username} email={this.state.email} github="somegithub"/>
             <Bio bioInfo="Bio Info!"/>
             <Collaborators curCollab="Hobo Jim" collabWith={["Mr. Cool", "Some Guy"]}/>
             <UserInfo firstName={this.state.firstName} lastName={this.state.lastName}/>
           </div>
         </div>
       );
    } else {
     return (
       <div>
         Loading...
       </div>
     )
    }
  }
}

module.exports = Dashboard;