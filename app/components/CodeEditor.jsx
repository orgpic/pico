const React = require('react');

class CodeEditor extends React.Component {
	constructor(props) {
		super(props);
    var context = this;
		this.state = {
			codeValue: null
		}
    console.log(':-)');
	}

  componentWillMount() {
    this.socket = io();
    const context = this;

    //The 1 will be replaced by container/user ID when we have sessions
    this.socket.on('/TE/1', function(code) {
      context.setState({
        codeValue: code
      });
      //Not sure why setState isn't redrawing, so I forced it to re-render. Need to fix.
      document.getElementById('code-editor').value = code;
    });
  }


	handleCodeRun(e) {
	    var code = document.getElementById('code-editor').value;
      this.socket.emit('/TE/1', code);
	}

  handleCodeEnter(e)

	render() {
		return (
			<div>
        <form> 
          <textarea id="code-editor" onKeyUp={this.handleCodeRun.bind(this)}>
            {this.state.codeValue}
          </textarea><br/>
        </form>
        <button onClick={this.handleCodeRun.bind(this)}> Run </button>
			</div>
		)
	}
}

module.exports = CodeEditor;