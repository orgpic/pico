const React = require('react');

class CodeEditor extends React.Component {
	constructor(props) {
		super(props);
    var context = this;
		this.state = {
			command: null
		}
    console.log(':-)');

	}

	sendCommand(e) {

	}

	render() {
		return (
      <script src="node_modules/jquery/dist/jquery.min.js"></script>
      <script src="node_modules/jquery.terminal/js/jquery.terminal-0.11.13.min.js"></script>
      <script src="node_modules/jquery.terminal/js/jquery.mousewheel-min.js"></script>
      <link href="node_modules/jquery.terminal/css/jquery.terminal-0.11.13.css" rel="stylesheet"/>

			<div>
        <form> 
          <textarea id="code-editor" onKeyUp={this.sendCommand.bind(this)}>
            {this.state.command}
          </textarea><br/>
        </form>
        <button onClick={this.sendCommand.bind(this)}> Run </button>
			</div>
		)
	}
}

module.exports = CodeEditor;