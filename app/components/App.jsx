import { Router, Route, browserHistory } from 'react-router';
const React = require('react');
const ReactDOM = require('react-dom');
const LinuxComputer = require('./LinuxComputer.jsx');
const SignUp = require('./SignUp.jsx');
const Login = require('./Login.jsx');
const Dashboard = require('./Dashboard.jsx');
const NavBar = require('./NavBar.jsx');
const axios = require('axios');
const Modal = require('react-modal');
const VideoHome = require('./VideoHome.jsx');
const VideoPage = require('./VideoPage.jsx');
const Slider = require('react-slick');


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height: 300,
    width: 600,
    backgroundColor:'rgba(72,72,72,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    mostPopularVideos: null
  },
};

const login = document.getElementById('login');

let authenticate;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.GoToLogin = this.GoToLogin.bind(this);
    this.GoToSignUp = this.GoToSignUp.bind(this);
    this.OpenModal = this.OpenModal.bind(this);
    this.SendEmail = this.SendEmail.bind(this);
    this.CloseModal = this.CloseModal.bind(this);
    this.changeEmailInput = this.changeEmailInput.bind(this);
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
    const sliderSettings = {
      lazyLoad: 'ondemand',
      slidesToShow: 4,
      slidesToScroll: 1
    }
    if (!this.state.authenticated && this.state.mostPopularVideos) {
      console.log(this.state.mostPopularVideos);
      this.state.authenticate === 'login' ? authenticate = <Login OpenModal={this.OpenModal} GoToSignUp={this.GoToSignUp}/> : authenticate = <SignUp OpenModal={this.OpenModal} GoToLogin={this.GoToLogin}/>;
      return (
        <div> 
            <div className="homepage-container">
              <div className="header">
                <div className="title">
                  <img className="mini-logo" src="/images/whitelogo.svg"></img> <span className="logo-text"></span>
                </div>
                <div className="subtitle">
                  Coding Made Simple
                </div>
                <div className="subsubtitle">
                  Sign Up Today to Simplify the Programming Process
                </div>
                <div className="start-button">

                  <div className="btn btn-success" onClick={this.handleGoToLogin.bind(this)}>Start Now</div>
                </div>
                <div className="logo-container">
                  <img src="/images/header.gif"></img>
                </div>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  style={customStyles}
                  contentLabel="Example Modal"
                  >  
                  <div className='modalDiv'>
                    <form className='modalDiv' onSubmit={this.SendEmail}>
                      <div style={{color: 'white', fontSize: 20}}>Enter Your Email to Reset your Password</div>
                      <input style={{width: 400, marginTop: 15, marginBottom: 15}} onChange={this.changeEmailInput} className="login-input" placeholder='Email' value={this.state.email}/>
                      <div className="submit">
                       <button type="submit" className="btn">Submit</button>
                      </div>
                    </form>
                    <button style={{marginTop: 15, marginBottom: 15}} className="btn" onClick={this.CloseModal}>Close Modal</button>
                  </div>
                </Modal> 
              </div>
              <div className="login-container" id="login">
                <div className="login-container-container">
                  <div className="login-header">
                    <div className="login">
                      Reinvent Programming Today
                    </div>
                  </div>
                  <div className="login-box">
                    <div className="login">
                      {authenticate}
                    </div>
                  </div>
                </div>
              </div>
              <div className="info">
                <div className="dark">
                Current Most Popular Videos <br/>
                  <div className="slider-container">
                    <Slider {...sliderSettings} >
                    {this.state.mostPopularVideos.map((video, i) => {
                      return (
                        <div className="video-entry-home-page" key = {i}>
                            <a href="#login"><img src={video.videoImage}/></a>
                        </div>
                      )
                    })}
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="info">
                <div className="info-header">Why picoShell?</div>
                <div className="sub-header">
                  picoShell is for educators, students, developers, and interviewers who want to collaborate through code remotely
                </div>
                <div className="info-container">
                  <img src="/images/header.gif"></img>
                  <div className="description-left">
                    <span className="title">Powerful</span><br/>
                    Gain full access to your own linux terminal emulator and code editor with ruby, node, python, gcc, git, and more installed
                  </div>
                </div>
                <div className="info-container">
                  <div className="description-right">
                  <span className="title" id="educational">Educational</span><br/>
                  Add videos from YouTube to picoShell and instantly code alongside of it. 
                  picoShell remembers the file you create with each video, so you can always pick up
                  where you left off
                  </div>
                  <img src="/images/codeable.gif"></img>
                </div>
                <div className="info-container">
                  <img src="/images/header.gif"></img>
                  <div className="description-left">
                    <span className="title">Collaborative</span><br/>
                      Easily give read or write access to your computer to work on projects, assignments,
                      or to conduct interviews
                  </div>
                </div>
                <div className="info-container">
                  <div className="description-right">
                  <span className="title">Convenient</span><br/>
                    You could just push your code up to git...or you could use picoShell's download button
                    to export all your files to your local filesystem
                  </div>
                  <img src="/images/codeable.gif"></img>
                </div>
              </div>
              <div className="footer">
                <div className="footer-column">
                    <p className="footer-header">picoShell</p>
                    <ul>
                      <li><img src="/images/whitelogo.svg"></img>About</li>
                      <li><i className="ion-ios-world-outline"></i>FAQ</li>
                    </ul>
                </div>
                <div className="footer-column">
                  <p className="footer-header">Contact Us</p>
                  <ul>
                    <li><i className="ion-ios-email-outline"></i>bianca.subion@gmail.com</li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.authenticated) {
      return (
        <div className="homepage-container">
          <div className="header">
            <NavBar username={this.state.username}/>
            <div className="subtitle">
              Coding Made Simple
            </div>
            <div className="subsubtitle">
              Sign Up Today to Simplify the Programming Process
            </div>
            <div className="logo-container">
              <img src="/images/logo.svg"></img>
            </div>
            <div className="header">
              <div className="overlay">
                <div className="row">
                  <div className="col-xs-12">
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
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