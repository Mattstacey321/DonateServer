const rq = require("request-promise");
class getDates {

  async getDates() {
    var utc_time="";
    var option = {
      uri: "http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh",
      json: true
    };
    await rq(option).then(value => {
      utc_time = value["utc_datetime"];
      /*var convertDays = new Date(utc_time); // convert to local times
            locateDay = convertDays.toLocaleDateString([], {
              dateStyle: "short",
              timeStyle: "long"
            });*/
     
    });
    return utc_time;
  }
}
module.exports = getDates;
