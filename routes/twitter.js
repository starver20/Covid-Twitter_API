const express = require('express');

const router = express.Router();

const twitterController = require('../controllers/twitter');

router.get('/hashtag/:hashtag', twitterController.getHash);

router.get('/user/:username', twitterController.getUsername);

router.get('/location', twitterController.getLocation);

module.exports = router;