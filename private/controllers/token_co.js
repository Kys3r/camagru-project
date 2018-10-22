const 	randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
		TokenLib = require('../mongo/models/crud_token'),
		Models = require('../config/schemas'),
		Token = Models.Tokens,
		Crud = require('../mongo/models/crud_mod'),
		Mail = require('../models/email_mod'),
		Parsing = require('../models/parsing_mod'),
		Lib = require('../src/lib/lib');

module.exports = 
{
	stockToken(login, success, error)
	{
		let token = randomToken(64);
		login = String(login);
		TokenLib.insertTokenRegister(login, token, (response) =>
		{
			success(token);
		}, (err) => {error(24)});
	},

	activeAccount(token, success, error)
	{
		TokenLib.checkTokenRegister(token, (successCheck) =>
		{
			Crud.UpdateActiveUser(successCheck, (successUpdate) =>			//response is equal to login
			{
				TokenLib.deleteTokenRegister(token, (successDelete) =>
			 	{
					success(1);
				}, (deleteError) => {error(deleteError)});
			}, (updateError) => { error(updateError) });
		}, (checkError) => { error(checkError) });
	},

	insertForgetPassword(email, success, error)
	{
		if (!Lib.isEmpty(email))
			Parsing.validEmail(email, (emailSuccess) =>
			{
				Crud.isEmail(email, (successEmail) =>
				{
					let token = randomToken(64);

					TokenLib.insertTokenForget(email, token, (successInsert) =>
					{
						Mail.forgetPasswordMail(email, token, (successSendMail) =>
						{
							success(1);
						}, (errorMail) => {error(41)}) //la reponse devrait dire dans tous les cas "si l'email existe, vous recevrez un mail dans votre boite de reception, le code erreur ne doit pas etre pris en compte"
					}, (errorInsert) => {error(24)});
				}, (errorEmail) => {error(0)})
			}, (errorParse) => {error(errorParse)})
		else
			error(0);
	},

	resetPassword(newPwd, confirmPwd, token, success, error)
	{
		if (!Lib.isEmpty(newPwd) && !Lib.isEmpty(confirmPwd) && newPwd === confirmPwd)
			Parsing.validPassword(newPwd, (successParse) =>
			{
				TokenLib.checkTokenForget(token, (successCheckToken) =>
				{
					Crud.updatePasswordByEmail(successCheckToken, newPwd, (successChangePwd) =>
					{
						TokenLib.deleteTokenForgetPassword(token, (successDelete) =>
						{
							success(1);
						}, (errorDelete) => {error(er)})
					}, (errorChangePwd) => {error(691)});
				}, (errorCheckToken) => { error(errorCheckToken) })
			}, (errorparse) => { error(7) })
		else
		{
			if (!Lib.isEmpty(newPwd) || !Lib.isEmpty(confirmPwd)) {
				error(2);
			}
			else
				error(0);
		}
	}
	
}