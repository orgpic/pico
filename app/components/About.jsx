const React = require('react');
const NavBar = require('./NavBar.jsx');
const Footer = require('./Footer.jsx');
let bar;

class About extends React.Component {
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
              Who We Are
            </div>
          </div>
          <div className='content'>
            <div className='cContainer'>
              <div className="cSubtitle">
                Mission
              </div>
              <div className='cText'>
                picoShell's mission 
              </div>
            </div>
            <div className='cContainer'>
              <div className="cSubtitle">
                Team
              </div>
              <div>
                <div className='teamRow'>
                  <img className='pic' src="/images/BS.jpg"></img>
                  <div className='tText'>
                  Bea (or more formally Bianca) is a Computer Science and Statistics student at the University of British Columbia.
                  She is Canadian and says eh a lot. Bea was mainly responsible for building the infrastructure of the project - 
                  the basis to initialize each computer, the communication bridge between each of your containers in our server to
                  the terminal emulator you see at picoShell, the code-editor integration, and the UI. Her favorite feature
                  implemented is the Videos section which allows users to upload video tutorials or lectures and 
                  code side-by-side.
                  </div>
                </div>
                <div className='teamRow'>
                  <img className='pic' src="/images/JC.jpg"></img>
                  <div className='tText'>
                  Jeff Christian II: When Jeff is not leaping across tall buildings at a single bound, he concentrates almost all his time on Full-Stack Development.
                  With PicoShell, Jeff was highly involved with both the UI and the back-end. From implementing React Components to drafting schema designs, Jeff finished the job.
                  If unoccupied from everything else, Jeff enjoys discussing deep philosophy, human biology, and the state of the world.
                  </div>
                </div>
                <div className='teamRow'>
                  <img className='pic' src="/images/SZ.jpg"></img>
                  <div className='tText'>
                    Steve discovered Java when he was studying Computer Science at the University of Arizona (Bear Down!) and has experience in enterprise 
                    application development with Walmart Headquarters in Arkansas. Afterwards, he moved to the San Francisco Bay and became a full stack 
                    software engineer. Steve contributed to the picoShell web terminal, user videos, and collaborator permissions.
                  </div>
                </div>
                <div className='teamRow'>
                  <img className='pic' src="/images/LB.jpg"></img>
                  <div className='tText'>
                    Lucas began programming at the age of 13, and met the other members of the picoShell Team while at Hack
                    Reactor in San Francisco after attending Carnegie Mellon University's School of Computer Science
                     and is a life long New York Yankees and Jets fan. As a member of the picoShell team, he was responsible for 
                     implementing synchronization between collaborators working on the same computer, the ability to upload
                     and download files from your computer and the File Browser. 
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

module.exports = About;