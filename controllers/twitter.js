const Twit = require('twit');

const apikey = process.env.apiKey
const apiSecretKey = process.env.apiSecretKey
const accessToken = process.env.accessToken
const accessTokenSecret = process.env.accessTokenSecret

var T = new Twit({
    consumer_key:         apikey,
    consumer_secret:      apiSecretKey,
    access_token:         accessToken,
    access_token_secret:  accessTokenSecret,
  });

exports.getHash = (req, res, next)=> { 
    const hash = req.params.hashtag;
    T.get('search/tweets', {q: `#${hash}`, count:10}, (err, data, response)=> {
        const respo = response;
        if(!err) {
        const arr = data.statuses.map(i=>{
            return {text: i.text, retweet_count:i.retweet_count, user_screen_name:i.user.screen_name}
        });
        console.log(arr);
        res.status(200).send(arr);
      } else {
      res.status(404).send({message:'Record not found'});
      }
    })
}

exports.getUsername = (req, res, next) => {
    const user = req.params.username;
    T.get('statuses/user_timeline', {screen_name:user, count:10}, (err, data, response)=> {
        
        if(!err) {
        var arr = data.map(i=> {
            return {created_at: i.created_at, text: i.text } 
        }); 


        const name = data.map(i=> {
            return i.user.name;
        })
        const screen_name = data.map(i=> {
            return i.user.screen_name;
        })
        const followers = data.map(i=> {
            return i.user.followers_count;
        })
        const friends = data.map(i=> {
            return i.user.friends_count;
        })

   
        var tweets = {
            user_name: name[0],
            user_screen_name: screen_name[0],
            followers_count: followers[0],
            friends_count: friends[0],
            tweets: arr
        }
        console.log(tweets);
        res.status(200).send(tweets);
    }else{
    res.status(404).send({message: 'record not found'})
    }
    })
}

exports.getLocation = (req, res, next) => {
    const lat = req.query.latitude;
    const lng = req.query.longitude;
    const rad = req.query.radius;

    let loc = `${lat},${lng},${rad}`;

    T.get('search/tweets', {geocode: loc, count:10}, (err, data, response)=> {
        
     if(!err){
        const arr = data.statuses.map(i => {
            return {text: i.text, user_screen_name: i.user.screen_name}
        });
        res.status(200).send(arr);
    } else {
    res.status(404).send({message: 'record not found'})
    }
    })

}