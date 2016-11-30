const React = require('react');

const VideoSearchResults = ({ videos, handleSearchedVideoClick }) => {

  // console.log(videos);
  const getVideoUrls = (videos) => videos.map(video => video.id.videoId );
  // console.log(getVideoUrls(videos));

  return (
    <div className="video-search-image-container">
      {
        videos.map((video) => {
          // console.log(video.snippet.thumbnails.high.url);

          return <img key={video.id.videoId} src={video.snippet.thumbnails.medium.url} onClick={handleSearchedVideoClick.bind(null, video)} />
          
        })
      }

    </div>

  )
}

module.exports = VideoSearchResults;