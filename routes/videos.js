const express = require('express');
const router = express.Router();
const utils = require('../utils/videoHelpers.js');
const Video = require('../models/Videos.js');
const UserVideos = require('../models/UserVideos.js');
const request = require('request');
const key = process.env.API_KEY

router.post('/addVideoToGlobalList', function(req, res, next) {
	const video = req.body.video;

	Video.findOrCreate({
		where: {
			videoId: video.id.videoId
		},
		defaults: {
			videoId: video.id.videoId,
			videoUrl: utils.getVideoUrlById(video.id.videoId),
			videoTitle: video.snippet.title,
			videoDescription: video.snippet.description,
			videoImage: video.snippet.thumbnails.medium.url
		}
	})
	.then(function(info) {
		// const created = info[1];

		res.send(info[0].dataValues);
		// if (created) {
		// } else {
		// 	res.status(400).send('Video already exists in database');
		// }
	})

});

router.post('/addVideoToPersonalList', function(req, res, next) {
	const userId = req.body.userId;
	const videoId = req.body.videoId;

	UserVideos.findOrCreate({
		where: {
			userId: userId,
			videoId: videoId
		}
	})
	.then(function(info) {
		console.log(info);
		const created = info[1];

		if (created) {
			res.send(info[0].dataValues);
		} else {
			res.status(400).send('Video already exists in database');
		}
	})

});

router.post('/incrementVideoClickCounter', function(req, res) {
	console.log('incrementing video counter', req.body);
	Video.findOne({
		where: {
			videoId: req.body.videoId
		}
	})
	.then(function(video) {
		var newCount = video.dataValues.videoClicks + 1;
		video.update({
			videoClicks: newCount
		})
		.then(function(response) {
			res.status(201).send(response);
		})
	});
})

router.get('/getVideos', function(req, res, next) {
	Video.findAll({
	})
	.then(function(data) {
		res.send(data);
	});
});

router.get('/getMyVideos', function(req, res, next) {
	// console.log('getMyVideos', req.query);
	UserVideos.findAll({
		where: {
			userId: req.query.userId
		}
	})
	.then(function(data) {

		const videoIdList = data.map(function(row) {
			return row.dataValues.videoId;
		})
		// console.log(videoIdList);

		Video.findAll({
			where: {
				videoId: {
					$in: videoIdList
				}
			}
		})
		.then(function(data) {
			// console.log('All my vids', data);
			res.send(data);
		})
		.catch(function(err) {
			// console.error('Failed to get all my videos', err);
			res.send(400);
		})


		// res.send(videoIdList);
	})
	.catch(function(err) {
		res.send(400);
	});
});

router.get('/checkVideoIdInDB', function(req, res, next) {
	Video.findOne({
		where: {videoId: req.query.videoId}
	})
	.then(function(video) {
		if (video) {
			res.send(200, video);
		} else {
			res.send(400, false);
		}
	})
	.catch(function(err) {
		console.error(err);
		res.send(404);
	});
});

router.get('/mostPopularVideos', function(req, res) {
	console.log('found')
  Video.findAll({
    limit: 8,
    order: 'videoClicks DESC'
  })
  .then(function(results) {
    res.status(200).send(results);
  })
  .catch(function(err) {
    res.status(500).send(err);
  });
});


module.exports = router;
