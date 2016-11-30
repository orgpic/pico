const React = require('react');

const VideoSearchResults = ({ videos, handleSearchedVideoClick }) => {

  // console.log(videos);
  // const getVideoUrls = (videos) => videos.map(video => video.id.videoId );
  // console.log(getVideoUrls(videos));

  return (
    <div className="video-search-image-container row">
      {
        videos.map((video) => {
          // console.log(video.snippet.thumbnails.high.url);
          // console.log(video.snippet.description);
          return (
            <div className="video-search-result">
              <img className="video-search-image"
                      key={video.id.videoId} 
                      src={video.snippet.thumbnails.medium.url} 
                      onClick={handleSearchedVideoClick.bind(null, video)} />
                  <p className="video-search-description">{video.snippet.description}</p>
            </div>
          )
        })
      }

    </div>

  )
}

module.exports = VideoSearchResults;