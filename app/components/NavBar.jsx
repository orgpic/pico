const React = require('react');
const ReactDOM = require('react-dom');

class NavBar extends React.Component {
	constructor (props) {
		super(props);

    this.handleLogOut = this.handleLogOut.bind(this);

		this.state = {
			username: this.props.username
		};	
	}

	handleLogOut() {
		localStorage.removeItem('jwtToken');
		location.reload(); 
	}

	render() {
		return (
  			<div className = "navbar">
    			<ul>
      			<li> <a className="logout" onClick={this.handleLogOut}> Log Out </a> </li>
      			<li> <a href="/"> Home </a> </li>
      			<li> <a href="/linuxcomputer"> Computer </a> </li>
      			<li> <a href="/dashboard"> Dashboard </a> </li>
      			<li className="username"><a href="/"> {this.state.username} </a></li>
    			</ul>
  			</div>	
			)
	}
}




module.exports = NavBar;