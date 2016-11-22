const React = require('react');
const ReactDOM = require('react-dom');
const Message = require('./Message.jsx')


const Messages = ({messages}) => {
	console.log('these are the messages: ', messages);
	return (
		<div className="chatText" id="chatText">
		{
			messages.map((message, i) =>  <Message message={message} counter={messages.length - 1 - i}/>)
		}
	</div>)
}

module.exports = Messages;