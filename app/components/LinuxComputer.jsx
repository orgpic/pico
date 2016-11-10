const React = require('react');
const ReactDOM = require('react-dom');
const CodeEditor = require('./CodeEditor.jsx')


class LinuxComputer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<CodeEditor />
			</div>
		)
	}
}


module.exports = LinuxComputer;