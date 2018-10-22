const	Models = require('../../config/schemas.js'),
		Tokens = Models.Tokens,
		Forget_tokens = Models.Forget_tokens,
		Users = Models.Users;

module.exports =
{
								// GET TOKEN PART

	getTokenRegister(login, success, error)
	{
		Tokens.find({ login : login }, (err, toks) =>
		{
			if (err) error(err);
			if (toks[0])
				success(toks[0].token);
			else
				error(25);
		});
	},


								// INSERT TOKEN PART
	insertTokenRegister(login, token, success, error)
	{
		let TokenCollection = new Tokens({
			login : login,
			token : token
		}).save((err, res) =>
		{
			if (err) error(1);
			success(1);
		});
	},

	insertTokenForget(email, token, success, error)
	{
		let TokenCollection = new Forget_tokens({
			email : email,
			token : token
		}).save((err, res) =>
		{
			if (err) error(1);
			success(1);
		});
	},

								// READ TOKEN PART

	checkTokenRegister(token, success, error)
	{
		Tokens.find({ token : token }, (err, toks) =>
		{
			if (err) error(err);
			if (toks[0])
				success(toks[0].login);
			else
				error(25);
		});
	},

	checkTokenForget(token, success, error)
	{
		Forget_tokens.find({ token : token }, (err, toks) =>
		{
			if (err) error(err);
			if (toks[0])
				success(toks[0].email);
			else
				error(25);
		});
	},

								// UPDATE TOKEN PART


								// DELETE TOKEN PART

	deleteTokenRegister(token, success, error)
	{
		Tokens.deleteOne({ token: token }, (er, resp) =>
		{
			if (er)
				error(er);
			else
				success(1);
		});	
	},

	deleteTokenForgetPassword(token, success, error)
	{
		Forget_tokens.deleteOne({ token: token }, (er, resp) =>
		{
			if (er)
				error(er);
			else
				success(1);
		});
	}
}
