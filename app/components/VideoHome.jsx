const React = require('react');
const ReactDOM = require('react-dom');
const NewVideoForm = require('./NewVideoForm.jsx');
const VideoTable = require('./VideoTable.jsx');
const VideoPage = require('./VideoPage.jsx');
const utils = require('../../utils/videoHelpers.js');
const bootstrap = require('bootstrap');
const API_KEY = process.env.API_KEY;
const NavBar = require('./NavBar.jsx');
const VideoSearch = require('./VideoSearch.jsx');
const VideoSearchResults = require('./VideoSearchResults.jsx');
const axios = require('axios');

class VideoHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoList: [],
      searchResults: []
    };

    this.searchQuery = '';
  }

  componentWillMount() {
    var context = this;
    const user = JSON.parse(localStorage['user']);
    context.setState({
      containerName: user.username,
      username: user.username
    });
  }

  componentDidMount() {
    this.getAllVideos = $.get('/videos/getVideos', function(data) {
      console.log('these are the videos', data);
      const videos = utils.getAllVideoObjects(data);
      this.setState({
        videoList: videos,
      });
    }.bind(this));
  }

  render() {
    return (
      <div className="video-home-page">
        <NavBar username={this.state.username}/>
        <div className="video-homepage-container">
          <div className="homepage-landing">
            <div className="overlay">
              <div className="row">
                <div className="col-md-12 logo-container">
                  <a href="/" className="title"> CODEABLE </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-md-offset-4 description-container">
                  <span>Ready to conquer the programming world?</span><br/>
                  <span>Join Codeable, your one place to learn how to program</span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-md-offset-4 homepage-form">
                  <NewVideoForm handleNewVideoSubmit={this.handleNewVideoSubmit.bind(this)}/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-md-offset-4 homepage-form">
                  <VideoSearch handleVideoSearch={this.handleVideoSearch.bind(this)} 
                    handleVideoSearchInputChange={this.handleVideoSearchInputChange.bind(this)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="video-search-results-container">
          <div className="row">
            <VideoSearchResults videos={this.state.searchResults} 
            handleSearchedVideoClick={this.handleSearchedVideoClick.bind(this)} />
          </div>
        </div>
        <div className="video-table-container">
          <div className="container">
            <VideoTable onVideoClick={this.onVideoClick.bind(this)}videos={this.state.videoList}/>
          </div>
        </div>
      </div>
    );
  }

  handleVideoSearch(e) {
    e.preventDefault();
    const context = this;
    // console.log('handleVideoSearch', e, e.target.value);
    // console.log('api key', API_KEY);
    if(!context.searchQuery.trim()) {
      return;
    }

    const options = {
      part: 'snippet',
      maxResults: 3,
      q: context.searchQuery,
      type: 'video',
      key: API_KEY
    }

    // const options = {
    //   part: 'statistics',
    //   metrics: 'views,comments,likes,dislikes,shares',
    //   max: 3,
    //   key: API_KEY
    // }

    console.log(options)
    axios.get('https://www.googleapis.com/youtube/v3/search?', 
      {params: options })
      .then(function(res) {
        console.log(res.data.items);
        return res.data.items;
      })
      .then(function(videos) {
        console.log(videos);
        context.setState({ searchResults: videos });
        context.searchQuery = '';

      })
      .catch(function(err) {
        console.error(err);
      });

  }

  handleVideoSearchInputChange(e) {
    e.preventDefault();
    this.searchQuery = e.target.value;
  }

  handleSearchedVideoClick(video) {
    // e.preventDefault();
    console.log('handleSearchedVideoClick', video);
  }

  //handlers
  handleNewVideoSubmit(e) {
    if (e.key === 'Enter') {
      const input = e.target.value;

      const iFrameSrc = utils.createIFrameSrc(utils.getVideoId(input));
      const videoId = utils.getVideoId(input);

      if (utils.isValidUrl(input)) {
        $.post('/videos/submitVideo', {videoId: videoId, videoUrl: input}, function() {
          location.reload();
        });
      } else {
        console.log('Please enter a valid url');
      }
    }
  }

  onVideoClick(video) {
    axios.post('/videos/incrementVideoClickCounter', {videoId: video.videoId})
      .then(function(res) {
        console.log('Successfully incremented the counter');
      })
      .catch(function(err) {
        console.error(err);
      })
  }
}

module.exports = VideoHome;
