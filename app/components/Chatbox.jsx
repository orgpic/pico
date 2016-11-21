const React = require('react');

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      username: this.props.username,
      curMessage: '',
      containerName: this.props.containerName
    };
    this.changeMessageInput = this.changeMessageInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.socket.off('/CHAT/' + this.state.containerName);
    this.setState({
      containerName: nextProps.containerName
    });
    this.socket.on('/CHAT/' + nextProps.containerName, function(msg) {

    });
  }

  changeMessageInput(event) {
    this.setState({
      curMessage: event.target.value
    });
  }

  handleSubmit(e, message) {
    e.preventDefault();
    document.getElementById('chatText').value = this.state.username + ': ' + message + '\n' + document.getElementById('chatText').value;
  }

  render() {
    return (
        <div>
          <textarea readOnly="true" id="chatText" rows="10" cols="50"></textarea>
          <form onSubmit={
            function(e) {
              this.handleSubmit(e, this.state.curMessage)
            }.bind(this)}>
            <div className="col-md-12">
              <div className="form-inputs">
                <input 
                onChange={this.changeMessageInput}
                id="messageText"
                type='text' 
                placeholder='message'
                className="collaborators-input"
                />
                <button type="submit">Send</button>
              </div>
            </div>
          </form>
        </div>
      );
  }
}

module.exports = Chatbox;