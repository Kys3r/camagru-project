const	Models = require('../config/schemas.js'),
		Tokens = Models.Tokens,
		Forget_tokens = Models.Forget_tokens,
		Users = Models.Users,
		Crud = require('../mongo/models/crud_mod');

module.exports =
{
	clearObsoleteAccount()
	{
		Tokens.find({ creationDate : { $lt: new Date(), $lte: new Date(new Date().setDate(new Date().getDate()-1)) } }, (err, ret) =>
		{
			for (var i = 0; i < ret.length; i++)
			{
				Crud.deleteUser(ret[i].login, (successDeleteUser) => {}, (errorDeleteUser) => {})
			}
			Tokens.deleteMany({ creationDate : { $lt: new Date(), $lte: new Date(new Date().setDate(new Date().getDate()-1)) } }, (errorDeleteToken, ret) =>{});
		});
	},

	clearObsoleteForgetToken()
	{
		Forget_tokens.deleteMany({ creationDate : { $lt: new Date(), $lte: new Date(new Date().setDate(new Date().getDate()-1)) } }, (errorDeleteToken, ret) =>{});
	}
}
