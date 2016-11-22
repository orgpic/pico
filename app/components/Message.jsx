const React = require('react');
const ReactDOM = require('react-dom');

const Message = ({message, counter}) => {
	return (
	<div className="message" id={counter}>
		{message}
	</div>
	)
}

module.exports = Message;