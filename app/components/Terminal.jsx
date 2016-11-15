const React = require('react');
const jQueryTerminal = require('jquery.terminal');
const axios = require('axios');

class Terminal extends React.Component {
	constructor(props) {
		super(props);
    var context = this;
		this.state = {
			command: null,
      prompt: '/picoShell >> ',
      containerName: '', // change this to refer to user name when login is done
      curCommand: null,
      curDir: '/',
      username: ''
		}
	}

  componentDidMount() {
    const token = localStorage['jwtToken'];
    const context = this;

    if (token) {
      axios.get('/decode', {
        params: {
          token: token
        }
      })
      .then (function(response) {
        const user = response.data;

        context.setState({
          containerName: user.username,
          username: user.username
       });
        context.renderTerminal();
      });
    }
  }

  componentWillMount() {
    this.socket = io();
    const context = this;

    //The 1 will be replaced by container/user ID when we have sessions
    this.socket.on('/TERM/1', function(code) {
      //For some reason code.username keeps resetting itself to 'a'. Not sure why...
      if(code.username !== context.username && code.cmd !== '' && code.username !== 'a') {
        context.terminal.set_command(code.cmd, false);
        context.setState({
          curCommand: code.cmd
        });
      }
    });

    this.socket.on('/TERM/RES/1', function(code) {
      if(code.username !== context.username) {
        context.terminal.echo(context.terminal.get_prompt() + context.terminal.get_command());
        context.terminal.echo(code.res);
        context.terminal.set_command('');
        context.setState({
          curCommand: ''
        });
      }
    });

    this.socket.on('/TERM/CD/1', function(path) {
      if(path.username !== context.username) {
        console.log('REMOTE DIR', path.dir);
        context.setState({
          curDir: path.dir,
          prompt: path.dir + ' >> '
        });
        context.terminal.set_prompt(path.dir + ' >> ');
      }
    });
  }

  renderTerminal() {
    // console.log($);
    // console.log($.terminal);
    var context = this;
    var prompt = this.state.prompt;
    var containerName = this.state.containerName;

    $(function($, undefined) {
      $('#terminal').terminal(function(command, term) {
        console.log('command', command);
        if (command !== '') {

          axios.post('/cmd', { cmd: command, containerName: containerName })
            .then(function(res) {
              console.log(res);
              console.log(res.data);
              if(typeof res.data === 'object') {
                if(res.data.fileOpen) {
                  context.socket.emit('/TE/1', {fileOpen: res.data.fileOpen, fileName: res.data.fileName, code: res.data.termResponse, username: context.state.username});
                  context.socket.emit('/TERM/RES/1', {res: '', username: context.username});
                } else if(res.data.pwd) {
                  console.log('CD', res.data.pwd);
                  if (res.data.pwd[res.data.pwd.length - 1] === '\n') res.data.pwd = res.data.pwd.slice(0, res.data.pwd.length - 1);
                  context.setState({
                    curDir: res.data.pwd,
                    prompt: res.data.pwd + ' >> '
                  });
                  context.terminal.set_prompt(res.data.pwd + ' >> ');
                  console.log('PROMPT', context.terminal.get_prompt());
                  context.socket.emit('/TERM/CD/1', {dir: res.data.pwd, username: context.username});
                  context.socket.emit('/TERM/RES/1', {res: res.data.res, username: context.username});
                } else {
                  term.echo(String(JSON.stringify(res.data)));
                  context.socket.emit('/TERM/RES/1', {res: JSON.stringify(res.data), username: context.username});
                }
                context.terminal.set_command('');
                context.setState({
                  curCommand: ''
                });
              } else {
                term.echo(String(res.data));
                context.socket.emit('/TERM/RES/1', {res: res.data, username: context.username});
                context.terminal.set_command('');
                context.setState({
                  curCommand: ''
                });
              }
            })
            .catch(function(err) {
              console.error(err);
              term.echo(String(err));
              context.socket.emit('/TERM/RES/1', {res: err, username: context.username});
            });

            // var result = window.eval(command);
        }
      }, {
          greetings: '',
          name: '',
          height: 500,
          width: 650,
          prompt: prompt,
          onInit: function(term) {
            context.terminal = term;
            var command = 'cd /picoShell';
            axios.post('/cmd', { cmd: command, containerName: containerName })
              .then(function(res) {
                console.log(res);
                term.echo(String(res.data.res));
              })
              .catch(function(err) {
                console.error(err);
                term.echo(String(err));
              });
          },
          onCommandChange: function(command, term) {
            if(command !== context.state.curCommand) {
              console.log('EMITTING. USERNAME = ', context.username);
              context.socket.emit('/TERM/1', {cmd: command, username: context.username});
              context.setState({
                curCommand: command
              });
            }
          },
          keydown: function(event, term) {
            if(event.key === 'Backspace') {
              //the keydown event fires as soon as the key is pressed, but before a character is removed
              //A timeout of 10ms allows term.get_command() to reflecct the actual new command after backspace
              //is pressed. If this is too janky, we can remove this.
              setTimeout(function() {
                context.socket.emit('/TERM/1', {cmd: term.get_command(), username: context.username});
              }, 10);
            }
          },
      });
    });
  }

	render() {
		return (
      <div>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/0.11.13/css/jquery.terminal.min.css" rel="stylesheet"></link>
        <div id="terminal"></div><br/>
			</div>
		)
	}
}

module.exports = Terminal;