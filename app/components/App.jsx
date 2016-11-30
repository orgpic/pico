import { Router, Route, browserHistory } from 'react-router';
const React = require('react');
const ReactDOM = require('react-dom');
const LinuxComputer = require('./LinuxComputer.jsx');
const Dashboard = require('./Dashboard.jsx');
const axios = require('axios');
const SignUp = require('./SignUp.jsx');
const Login = require('./Login.jsx');
const VideoHome = require('./VideoHome.jsx');
const VideoPage = require('./VideoPage.jsx');
const HomePage = require('./HomePage.jsx');
const LandingPage = require('./LandingPage.jsx');


let authenticate;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticate: 'login',
      authenticated: false,
      username: '',
      containerName: '',
      render: false,
      modalIsOpen: false,
      email: ''
    };
  }

  componentWillMount() {
    const context = this;
    axios.get('/auth/oAuth', {
    })
    .then(function(response) {
      if (response.data) {
        var myUser = response.data;
        localStorage['user'] = JSON.stringify(myUser);
        if (myUser) {
          context.setState({
            authenticated: true,
            username: myUser.username,
            containerName: myUser.containerName,
          });
          console.log('state in app', context.state);
        }
      }
    })
    .catch(function(err) {
      console.log('no user');
      console.log(err);
    });

    this.getMostPopularVideos();
  }


  GoToLogin() {
    this.setState({
      authenticate: 'login'
    });
  }
  GoToSignUp() {
    this.setState({
      authenticate: 'signup'
    });
  }
  OpenModal() {
    this.setState({
      modalIsOpen: true
    });
  }
  CloseModal() {
    this.setState({
      modalIsOpen: false
    });
  }
  SendEmail(e) {
    e.preventDefault();
    var context = this;
    var email = this.state.email;
    console.log('emial', this.state.email, 'nonstate', email, this.state);
    axios.post('/email', {
      email: email
    })
    .then(function(response) {
      context.setState({
        email: ''
      });
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
  }
  changeEmailInput(e) {
    this.setState({email: e.target.value});
  }

  getMostPopularVideos() {
    var context = this;
    axios.get('/videos/mostPopularVideos')
      .then(function(res) {
       context.setState({
        mostPopularVideos: res.data
       });
      })
      .catch(function(err) {
        console.error(err);
      })
  }

  handleGoToLogin(event) {
    var scrollId = "login";
    var scrollElement = document.getElementById(scrollId);
    window.location = "#login";
    smoothScroll(scrollElement);
    event.preventDefault();
  }

  render() {
    if (!this.state.authenticated && this.state.mostPopularVideos) {
      this.state.authenticate === 'login' ? authenticate = <Login OpenModal={this.OpenModal.bind(this)} GoToSignUp={this.GoToSignUp.bind(this)}/> : authenticate = <SignUp OpenModal={this.OpenModal.bind(this)} GoToLogin={this.GoToLogin.bind(this)}/>; 
      return (
        <LandingPage 
        authenticate={authenticate}
        email={this.state.email}
        modalIsOpen={this.state.modalIsOpen}
        mostPopularVideos={this.state.mostPopularVideos}
        handleChangeEmailInput={this.changeEmailInput.bind(this)}
        handleGoToSignUp={this.GoToSignUp.bind(this)}
        handleGoToLogin={this.handleGoToLogin.bind(this)}
        handleSendEmail={this.SendEmail.bind(this)}
        handleCloseModal={this.CloseModal.bind(this)}
        handleOpenModal={this.OpenModal.bind(this)}
        />
      )
    } else if (this.state.authenticated && this.state.mostPopularVideos) {
      return (
        <HomePage username={this.state.username} mostPopularVideos={this.state.mostPopularVideos}/>
      );
    } else {
      return (
        <div> Loading... </div>
      )
    }
  }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}></Route>
    <Route path="/computer" component = {LinuxComputer} ></Route>
    <Route path="/dashboard" component={Dashboard} ></Route>
    <Route path="/video" component={VideoHome}></Route>
    <Route path="/video/:videoId" component={VideoPage}></Route>
  </Router>
), document.getElementById('app'))