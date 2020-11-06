var axios = require("axios").default;



exports.getName = (req, res, next) => {

    const name = req.params.name

    var options = {
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/country',
        params: {name: name},
        headers: {
          'x-rapidapi-key': 'ee8cfddbbfmsh59279ea9079b69cp16a843jsnafb3f79a6f24',
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {

        const arr = response.data.map(i =>{
            return { country: i.country, confirmed: i.confirmed, recovered: i.recovered, critical: i.critical, deaths: i.deaths }
        })
        if(arr[0]!==undefined){
            res.send(arr[0]);
          }
          res.status(404).send({message: 'record not found'});
      }).catch(function (error) {
          console.error(error);
      });

}

exports.getCode = (req, res, next) => {

    const code = req.params.code;

    var options = {
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/country/code',
        params: {code: code},
        headers: {
          'x-rapidapi-key': 'ee8cfddbbfmsh59279ea9079b69cp16a843jsnafb3f79a6f24',
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        const arr = response.data.map(i =>{
            return { country: i.country, confirmed: i.confirmed, recovered: i.recovered, critical: i.critical, deaths: i.deaths }
        })
        if(arr[0]!==undefined){
            res.send(arr[0]);
          }
          res.status(404).send({message: 'record not found'});
      }).catch(function (error) {
          console.error(error);
      });
}

exports.getSearch = (req, res, next) => {
    const search = req.query.searchText;


    if(search.length == 3) {
        var options = {
            method: 'GET',
            url: 'https://covid-19-data.p.rapidapi.com/country/code',
            params: {code: search},
            headers: {
              'x-rapidapi-key': 'ee8cfddbbfmsh59279ea9079b69cp16a843jsnafb3f79a6f24',
              'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
            const arr = response.data.map(i =>{
                return { country: i.country, confirmed: i.confirmed, recovered: i.recovered, critical: i.critical, deaths: i.deaths }
            })
            if(arr[0]!==undefined){
                res.send(arr[0]);
              }
              res.status(404).send({message: 'record not found'});
          }).catch(function (error) {
              console.error(error);
          });
    }
    else {
        var options = {
            method: 'GET',
            url: 'https://covid-19-data.p.rapidapi.com/country',
            params: {name: search},
            headers: {
              'x-rapidapi-key': 'ee8cfddbbfmsh59279ea9079b69cp16a843jsnafb3f79a6f24',
              'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
    
            const arr = response.data.map(i =>{
                return { country: i.country, confirmed: i.confirmed, recovered: i.recovered, critical: i.critical, deaths: i.deaths }
            })
            if(arr[0]!==undefined){
              res.send(arr[0]);
            }
            res.status(404).send({message: 'record not found'});
          }).catch(function (error) {
              console.error(error);
          });
    }

}