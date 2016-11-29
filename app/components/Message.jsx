const React = require('react');
const ReactDOM = require('react-dom');
const ReactTooltip = require('react-tooltip');
const TimeAgo = require('react-timeago').default;

const Message = ({message, username, counter}) => {
  console.log(message.time);
	return (
	<div className={message.user===username ? "message own" : "message"} id={counter}>

    <span className="message-user"> {message.user===username ? "" : message.user} </span>
    <a data-tip data-for='message-tool-tip' className="message-text"> {message.text} </a>
    <ReactTooltip id='message-tool-tip' place='top' type='dark' effect='solid'>
      <span className="message-time">
        <TimeAgo date={message.time}></TimeAgo>
      </span>
    </ReactTooltip>
    
	</div>
	)
}

module.exports = Message;