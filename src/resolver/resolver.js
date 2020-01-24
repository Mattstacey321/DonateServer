const SignIn = require("../models/signIn");
const UserInfo = require("../models/userInfo");
const rq = require("request-promise");
const Total = require("../models/total");
const getDates = require("./getDates");
module.exports = resolvers = {
  Query: {
    isAccountExist: async (root, { times, userID }) => {
      var nows = new Date(); //ngay hien tai
      var date = new Date(times); //ngay theo global time
      console.log(date);

      return SignIn.find({ id_user: userID }).then(val => {
        if (val.length == 1) {
          var m = nows.getDate() - date.getDate();
          if (m == 0) {
            //login trog 1 ngay
            UserInfo.findOneAndUpdate(
              { id: userID },
              { $set: { lastDaysLogin: date } },
              { upsert: true }
            ).then(v => {
              console.log(v);
            });

            return true;
          } else if (m == 1) {
            //login ngay hom sau
            UserInfo.findOneAndUpdate(
              { id: userID },
              { $inc: { daysLogin: 1 } }
            );
            return true;
          }
        } else return false;
      });
    },
    howManyDaysLogin: async (root, { id }) => {
      return UserInfo.find({ id: id })
        .then(v => {
          return v.daysLogin;
        })
        .catch(err => {
          return "Has error";
        });
    },
    totalMoney: async (root, { id }) => {
      return Total.find({ id: id }).then(v => {
        console.log(v);
      });
    },
    setLastLogin: async (root, { id }) => {
      const aa = new getDates();
      const a = await aa.getDates();
      
      return UserInfo.findOneAndUpdate(
        { id: userID },
        { $set: { lastDaysLogin: a } },
        { upsert: true }
      ).then(v => {
      
      });
    }
  },
  Mutation: {
    createUser: async (root, { input }) => {
      return SignIn.create(input)
        .then(value => {
          UserInfo.create({
            id: value.id_user,
            totalMoney: 0,
            days: 0,
            daysLogin: 0,
            lastDaysLogin: ""
          });
          Total.create({
            id: value.id_user,
            totalMoney: 0
          });
        })
        .catch(err => {
          return false;
        });
    },
    //check difference between device and
    checkDays: async (root, { id }) => {
      var locateDay;
      var option = {
        uri: "http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh",
        json: true
      };
      return rq(option).then(value => {
        var utc_time = value["utc_datetime"];
        var convertDays = new Date(utc_time); // convert to local times
        locateDay = convertDays.toLocaleDateString([], {
          dateStyle: "short",
          timeStyle: "long"
        });
        return utc_time;
      });
      /*console.log(locateDay);
        return locateDay;*/
      //return UserInfo.findOne({'id':id})
    },
    donateMoney: async (root, { id }) => {
      // lay previous value
      // cong vao
      var defaultMoney = 10000;
      UserInfo.updateOne(
        { id: id },
        { $inc: { totalMoney: defaultMoney } }
      ).then(v => {
        return v;
      });
    }
  }
};
