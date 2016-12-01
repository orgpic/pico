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
                 SOMETHING CREATIVE Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam magna in massa dapibus, eget malesuada dui accumsan. Nullam sodales congue condimentum. Aenean gravida, dolor ut iaculis iaculis, massa tortor aliquet metus, id tincidunt orci orci nec ex. Nunc molestie, ante mollis consectetur porttitor, mi turpis tempus nisl, vel commodo velit tellus quis massa. In semper justo a quam efficitur facilisis. Proin quis risus in sapien pellentesque placerat quis eu risus. Nullam eu pellentesque mauris. Nam varius mollis augue, at commodo mauris dictum sed. Aenean iaculis feugiat molestie. Sed in libero commodo, fermentum leo ut, malesuada eros. Nulla sit amet lectus non lorem tristique volutpat a in nunc.
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
                    SOMETHING CREATIVE Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam magna in massa dapibus, eget malesuada dui accumsan. Nullam sodales congue condimentum. Aenean gravida, dolor ut iaculis iaculis, massa tortor aliquet metus, id tincidunt orci orci nec ex. Nunc molestie, ante mollis consectetur porttitor, mi turpis tempus nisl, vel commodo velit tellus quis massa. In semper justo a quam efficitur facilisis. Proin quis risus in sapien pellentesque placerat quis eu risus. Nullam eu pellentesque mauris. Nam varius mollis augue, at commodo mauris dictum sed. Aenean iaculis feugiat molestie. Sed in libero commodo, fermentum leo ut, malesuada eros. Nulla sit amet lectus non lorem tristique volutpat a in nunc.
                  </div>
                </div>
                <div className='teamRow'>
                  <img className='pic' src="/images/JC.jpg"></img>
                  <div className='tText'>
                  Jeff Christian II: Jeff is a tall white male.
                  </div>
                </div>
                <div className='teamRow'>
                  <img className='pic' src="/images/SZ.jpg"></img>
                  <div className='tText'>
                    SOMETHING CREATIVE Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam magna in massa dapibus, eget malesuada dui accumsan. Nullam sodales congue condimentum. Aenean gravida, dolor ut iaculis iaculis, massa tortor aliquet metus, id tincidunt orci orci nec ex. Nunc molestie, ante mollis consectetur porttitor, mi turpis tempus nisl, vel commodo velit tellus quis massa. In semper justo a quam efficitur facilisis. Proin quis risus in sapien pellentesque placerat quis eu risus. Nullam eu pellentesque mauris. Nam varius mollis augue, at commodo mauris dictum sed. Aenean iaculis feugiat molestie. Sed in libero commodo, fermentum leo ut, malesuada eros. Nulla sit amet lectus non lorem tristique volutpat a in nunc.
                  </div>
                </div>
                <div className='teamRow'>
                  <img className='pic' src="/images/LB.jpg"></img>
                  <div className='tText'>
                    SOMETHING CREATIVE Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam magna in massa dapibus, eget malesuada dui accumsan. Nullam sodales congue condimentum. Aenean gravida, dolor ut iaculis iaculis, massa tortor aliquet metus, id tincidunt orci orci nec ex. Nunc molestie, ante mollis consectetur porttitor, mi turpis tempus nisl, vel commodo velit tellus quis massa. In semper justo a quam efficitur facilisis. Proin quis risus in sapien pellentesque placerat quis eu risus. Nullam eu pellentesque mauris. Nam varius mollis augue, at commodo mauris dictum sed. Aenean iaculis feugiat molestie. Sed in libero commodo, fermentum leo ut, malesuada eros. Nulla sit amet lectus non lorem tristique volutpat a in nunc.
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