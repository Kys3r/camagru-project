// Global Require part

const	mongoose = require('mongoose'),
		Schema = mongoose.Schema;

// module npm require part

require('mongoose-type-email');

let usersCollection = new mongoose.Schema(
{
	 	login : String,
		email : mongoose.SchemaTypes.Email,
		password : String,
		regionServer : String,
		country : String,
		language : { type : String, default : 'EN' },
		epicAccount : String,
		platform : String,
		favoriteCity : { type : String, default : 'tilted' },
		// Hidden part for user
		typeOfUser : { type : String, default : 'user' },
		isActive : { type : Boolean, default : false },
		banned : { type : Boolean, default : false },
		insultReporting : { type : Number, default : 0 },
		afkReporting : { type : Number, default : 0 },
		fakeReporting : { type : Number, default : 0 },
		totalReporting : { type : Number, default : 0 },
		epicValidated : {type : Boolean, default : false},
		kda : {type : Number, default : 0},
		// Skins part
		creationDate : { type: Date, default: Date.now },
		actualSkin : { type : Number, default : (Math.floor(Math.random() * 8) + 1) },
		locker : { type : Array, default : [1, 2, 3, 4, 5, 6, 7, 8]},
});

let tokenRegister = new mongoose.Schema(
{
	token : String,
	login : String,
	creationDate : { type: Date, default: Date.now }
},
	{
    	versionKey: false // You should be aware of the outcome after set to false
	}
);

let tokenForgetPassword = new mongoose.Schema(
{
	token : String,
	email : mongoose.SchemaTypes.Email,
	creationDate : { type: Date, default: Date.now }
},
	{
    	versionKey: false // You should be aware of the outcome after set to false
	}
);

let statistics = new mongoose.Schema(
{
	totalRegisteredUsers : Number,
	roomAverageTime : Number,
	logAverageTime : Number,
	total1v1Rooms : Number,
	total2v2Rooms : Number,
	totalFreeForAllRooms : Number,
},
	{
    	versionKey: false // You should be aware of the outcome after set to false
	}
);

let Users = mongoose.model('Users', usersCollection);
let Tokens = mongoose.model('Tokens', tokenRegister);
let Forget_tokens = mongoose.model('Forget_tokens', tokenForgetPassword);

module.exports =
{
	Users : Users,
	Tokens : Tokens,
	Forget_tokens : Forget_tokens,
}