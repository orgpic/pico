const React = require('react');
const ReactDOM = require('react-dom');

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
        </div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));