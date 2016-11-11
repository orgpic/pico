import { Router, Route, Link, browserHistory } from 'react-router'
const React = require('react');
const ReactDOM = require('react-dom');
const LinuxComputer = require('./LinuxComputer.jsx');

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
        <div className="homepage-container">
          <div className="title">
				    Hello Welcome To MagiTerm
          </div>
          <Link to={`/linuxcomputer`} >
            <div>
              Go To LinuxComputer!
            </div>
          </Link>
        </div>
			</div>
		)
	}
}

ReactDOM.render((
  <Router>
    <Route path="/" component={App}></Route>
    <Route path="/linuxcomputer" component={LinuxComputer}></Route>
  </Router>
), document.getElementById('app'))