const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');
const { Button } = require('react-bootstrap');
const Loader = require('react-loader');

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.socket = io();
    this.changeUserNameInput = this.changeUserNameInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePasswordInput = this.changePasswordInput.bind(this);
    this.state = {
        textDecoration: 'none',
        color: 'black',
        fontWeight: 'bold',
        username: '',
        password: '',
        loaded: true
    };
  }
  changeUserNameInput(event) {
    this.setState({
      username: event.target.value
    });
  }

  changePasswordInput(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(e, user, pass) {
    const context = this;
    e.preventDefault();
    context.setState({ loaded: false });

    axios.post('/auth/authenticate', {
      username: this.state.username,
      password: this.state.password
    })
    .then(function(response) {
      console.log('we have a response');
      context.setState({ loaded: true });
      if (response.data.username) {
        console.log('1srt storage', localStorage['user']);
        localStorage['user'] = JSON.stringify(response.data);
        axios.post('/docker/restart', {containerName: context.state.username})
        .then(function(resp) {
          console.log(resp);
          window.location = 'dashboard';
        })
      } else {  
        alert('Failed Login');
      }
    })
    .catch(function(err) {
      console.log('Error during login submit', err);
      context.setState({ loaded: true });
      ReactDOM.render(<div>Please make sure you enter a valid username and password.</div>, 
        document.getElementById('error'));
    });
  }

  render() {
    return (
  		<div>
  			<form onSubmit={this.handleSubmit}>
          <Loader loaded={this.state.loaded}/>
          <div className="form-inputs">
  					<input onChange={this.changeUserNameInput} className="login-input" type='text' placeholder='username'value={this.state.username}/><br/>
  					<input onChange={this.changePasswordInput} className="login-input" type='password' placeholder='password'/>
            <div className="submit">
             <button type="submit" className="btn btn-success">Login</button>
            </div>
          </div>
  			</form>
        <a target="_top" href="/github"> 
          <button className="btn btn-success">Login With Github</button>
        </a>
        <div id='error'></div>
        <div className="login-query-container">
  				<a className="login-query" onClick={this.props.GoToSignUp}> Need to signup?</a><br/>
          <a className="login-query" onClick={this.props.OpenModal}>Forgot Password?</a>
          </div>
  		</div>
  	);
  }
}

module.exports = Login;