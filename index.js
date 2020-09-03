const unirest = require("unirest");
const fs = require("fs");

// Export API key as environment variable
const FOOTBALL_KEY = process.env.FOOTBALL_KEY;

// Team IDs - find new ID here using search on left: https://rapidapi.com/api-sports/api/api-football
const NEWCASTLE = 34;
const COVENTRY = 1346;

// Choose team (see ID list above)
const TEAM = COVENTRY;
const FILENAME = 'coventry';


const req = unirest("GET", `https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${TEAM}`);

// req.query({
// 	"timezone": "Europe%2FLondon"
// });

req.headers({
	"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
	"x-rapidapi-key": FOOTBALL_KEY
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);
  fs.writeFileSync(`out/${FILENAME}.json`,JSON.stringify(res.body),function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('Success');
  });
});
