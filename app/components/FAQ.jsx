const React = require('react');
const NavBar = require('./NavBar.jsx');
const Footer = require('./Footer.jsx');
let bar;

class FAQ extends React.Component {
  componentWillMount() {
    if (localStorage['user'] !== undefined) {
      console.log('localStorage');
      var myUser = JSON.parse(localStorage['user']).username;
      bar = <NavBar username={myUser}/>;
    }
  }
  render() {
    return (
      <div>
        {bar}
        <div className="homepage-container">
          <div className="header">
            <div className="title">
              <img className="mini-logo" src="/images/whitelogo.svg"></img> <span className="logo-text"></span>
            </div>
            <div className="subtitle">
              Frequently Asked Questions
            </div>
          </div>
          <div className='content'>
            <div className='cContainer'>
              <div className='question'>
              Q: How do I start my computer?
              </div>
              <div className='answer'>
              A: It is already started for you! Click on the 'Computer' link in the above navigation bar to get started!
              </div>
              <div className='question'>
              Q: How do I run Code?
              </div>
              <div className='answer'>
              A: Your computer comes installed with node, python, ruby as well as git. You would run a file the exact same way you would on your terminal on your
              local computer, or once you have selected an active file, by pressing the Play (Triangle) button above your code editor.
              </div>
              <div className='question'>
              Q: How do I create a new file?
              </div>
              <div className='answer'>
              A: You can create a new file with the "touch" unix command, followed by the "open" command to set it as your active file in your
              Code Editor or our "pico" command which creates a new file with the specified filename in the current
              working directory and sets it as your active file in your Code Editor.  
              </div>
              <div className='question'>
              Q: How do I upload files?
              </div>
              <div className='answer'>
              A: Its easy! Simply drag and drop your files (one at a time) onto the File Browser. You can upload any type of file, as long as it
              is under 2MB. For larger files, or to upload multiple files at once to your computer you can clone your git repository using the 
              git clone command in your Terminal.  
              </div>
              <div className='question'>
              Q: How do I download files?
              </div>
              <div className='answer'>
              A: There are two ways to download files from your computer. You can can either enter our "download" command followed by the file or folder
              name you want to download into your Terminal, or by simply pressing the "Download" button in the File Browser to the right
              of the file you want to download. Folders are downloaded in the form of a zip file. <br/> Note: Download may take time to begin.
              </div>
              <div className='question'>
              Q: How do I collaborate with friends?
              </div>
              <div className='answer'>
              A: From your dashboard page, in the "Collaborators" section, click on the "Invitations" tab. Enter the username of the person you
              want to give access to your computer and press the Enter key. Once they accept your request, you can specify what type of permissions
              they have on your Computer, read, write or admin access. 
              </div>
              <div className='question'>
              Q: Is the terminal fully functional? What can't I do with it?
              </div>
              <div className='answer'>
              A: Currently picoShell does not support commands that require interaction after they are sent, but before the response is returned,
               such as the "npm init" command. As a result, asynchronous commands such as installing
               a package or cloning a git repository do not show a response in terminal until they have completely finished. We are working on
               it though! Check back soon! \n Aside from that, picoShell is a full featured linux environment and has full support for all unix
               commands. 
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

module.exports = FAQ;