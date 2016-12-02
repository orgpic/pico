const React = require('react');
const ReactDOM = require('react-dom');
const Message = require('./Message.jsx');
const TimeAgo = require('react-timeago');


const Messages = ({messages, username}) => {
	// console.log('these are the messages: ', messages);
	return (
		<div className="chatText" id="chatText">
		{
			messages.map((message, i) =>  <Message message={message} username={username} counter={messages.length - 1 - i}/>)
		}
	</div>);
}

module.exports = Messages;