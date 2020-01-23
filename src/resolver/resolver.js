const SignIn = require('../models/signIn');
const UserInfo = require('../models/userInfo');
const rq = require('request-promise');
const Total = require('../models/total');


module.exports = resolvers = {
   
    Query: {
        isAccountExist: async (root, { times,userID }) => {
            var nows = new Date(); //ngay hien tai
            var date = new Date(times); //ngay theo global time

            return SignIn.find({ 'id_user': userID }).then((val) => {
                if (val.length == 1) {
                    var m = nows.getDate() - date.getDate();
                    if (m == 0) {
                        //login trog 1 ngay
                        UserInfo.findOne({ 'id:': userID },{'lastDaysLogin':date});
                        return true;
                    }
                    else {
                        //login ngay hom sau
                        UserInfo.findOne({ 'id:': userID },{$inc:{'daysLogin':1}});
                        return true;
                    }
                    
                }
                else return false;
            });
        },
        howManyDaysLogin: async (root, { id }) => {
            return UserInfo.find({ "id": id }).then((v) => {
                return v;
            }).catch((err) => {
                return "Has error"
            })
        }
    },
    Mutation: {
        createUser: async (root, { input }) => {
            return SignIn.create(input).then((value) => {
                UserInfo.create({
                    "id":value.id_user,
                    totalMoney:0,
                    days:0,
                    daysLogin:0,
                    lastDaysLogin:""
                });
            }).catch((err) => {
                return false
            });
        },
        //check difference between device and 
        checkDays: async (root, { id }) => {
            
            var locateDay;
            var option = {
                uri: "http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh",
                json: true
            }
            return rq(option)
                .then((value) => {
                    var utc_time = value["utc_datetime"];
                    var convertDays = new Date(utc_time); // convert to local times
                    locateDay = convertDays.toLocaleDateString([], { dateStyle: "short", timeStyle: 'long' })
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
            UserInfo.updateOne({ "id": id }, { $inc: { 'totalMoney': defaultMoney } }).then((v) => {
                return v;
            })
        }



    }

}