const rq = require("request-promise");
const userInfo = require("../models/userInfo");
class Dates {
  async getDates() {
    var utc_time = "";
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
  convert2UTC(dates) {
    var convert2UTC = new Date(dates);
    return convert2UTC.getDate();
  }
  async compareDates(id) {
    var presentDays = await this.getDates();

    await userInfo.findOne({ id: id }).then(v => {
      var lastDays = this.convert2UTC(v.lastDaysLogin);
      var nows = this.convert2UTC(presentDays);

      nows - lastDays > 1 ? true : false;
    });
  }
}
module.exports = Dates;
