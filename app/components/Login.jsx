const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');
const { Button } = require('react-bootstrap');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.hoverOver = this.hoverOver.bind(this);
    this.hoverOut = this.hoverOut.bind(this);
    this.changeUserNameInput = this.changeUserNameInput.bind(this);
    this.changePasswordInput = this.changePasswordInput.bind(this);
    this.state = {
      hover: {
        textDecoration: 'none',
        color: 'black',
        fontWeight: 'bold',
        username: '',
        password: ''
      }
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
  hoverOver() {
    this.setState({
      hover: {
        textDecoration: 'underline', 
        fontWeight: 'bold',
        color: 'blue'
      }
    });
  }
  hoverOut() {
    this.setState({
      hover: {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: 'black'
      }
    });
  }

  handleSubmit(e, user, pass) {
    const context = this;
    e.preventDefault();
    axios.post('/authenticate', {
      username: user,
      password: pass
    })
    .then(function(response) {
      if (response.data.token) {
        localStorage['jwtToken'] = response.data.token;
        window.location = window.location + 'dashboard';
      } else {
        alert('Failed Login');
      }
    })
    .catch(function(err) {
      console.log(err);  
    });
  }

  render() {
    var signIn = {
      height: 360,
      width: 220,
      backgroundColor: 'white',
      opacity: .8,
      boxShadow: '0px 0px 10px #888888'
    };
    var flex = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    var divHeader = {
      backgroundColor: '',
      flex: 1,
    };
    var github = {
      background: 'https://octicons.github.com/img/og/mark-github.png'
    }
    return (
			<div style={signIn}>
				<div style={divHeader}>Login</div>
				<form  
          style={flex} 
          onSubmit={function(e) {
            this.handleSubmit(e, this.state.username, this.state.password);
          }.bind(this)}
          >
					<input 
            onChange={this.changeUserNameInput}
            type='text' 
            placeholder='username'
            value={this.state.username}
            />
					<input 
            onChange={this.changePasswordInput}
            type='password' 
            placeholder='password'
            />
					<input type='submit' style={github}/>
				</form>
        <Button>Login with github</Button>
				<div 
				style={this.state.hover} 
				onMouseOver={this.hoverOver}
				onMouseOut={this.hoverOut} 
				onClick={this.props.GoToSignUp}>Need to signup?
				</div>
			</div>
		);
  }
}

module.exports = Login;