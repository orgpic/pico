const React = require('react');

class CodeEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			codeValue: null
		}
	}

	handleCodeRun(e) {
    var code = document.getElementById('code-editor').value;
    this.setState({
      codeValue: code
    });
    console.log(code);
	}

	render() {
		return (
			<div>
        <form> 
          <textarea id="code-editor">
            {this.state.codeValue}
          </textarea><br/>
        </form>
        <button onClick={this.handleCodeRun.bind(this)}> Run </button>
			</div>
		)
	}
}

module.exports = CodeEditor;