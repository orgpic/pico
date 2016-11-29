const React = require('react');
const ReactDOM = require('react-dom');

const Message = ({message, username, counter}) => {
	return (
	<div className={message.user===username ? "message own" : "message"} id={counter}>
    <span className="message-user"> {message.user===username ? "" : message.user} </span>
    <span className="message-text"> {message.text} </span>
	</div>
	)
}

module.exports = Message;