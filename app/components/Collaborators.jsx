const React = require('react');

class Collaborators extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      invUsername: ''
    };

    this.changeUserNameInput = this.changeUserNameInput.bind(this);
  }

  changeUserNameInput(event) {
    this.setState({
      invUsername: event.target.value
    });
  }

  handleSubmit(e, user) {
    const context = this;
    e.preventDefault();
    console.log(user);
    document.getElementById('inviteUsernameInput').value = '';
    alert('Invitation Sent!');
  }

  render() {
    return (
        <div>
          Currently Collaborating With:
          <div>(Users whose containers you can access)</div>
          Collaborators on Your Computer:
          <div>(Users who can access your container)</div>
          Invite a New Collaborator To Your Computer:
          <div>
            <form onSubmit={function(e) {
              this.handleSubmit(e, this.state.invUsername)
            }.bind(this)}>
              <div className="form-inputs">
                <input 
                  onChange={this.changeUserNameInput}
                  id="inviteUsernameInput"
                  type='text' 
                  placeholder='username'
                  value={this.state.username}
                  /><br/>
                <div className="submit">
                 <button type="submit" className="btn btn-success">Send Invite</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
  }
}

module.exports = Collaborators;