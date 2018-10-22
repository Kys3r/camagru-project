// Dev require module part

const	lib = require("../src/lib/lib"),
		Token = require('./token_co'),
		Mail = require('../models/email_mod'),
		EpicApiLib = require('../api/lib_api_epic'),
		Crud = require("../mongo/models/crud_mod"),
		CrudToken = require('../mongo/models/crud_token');

// Mongo controllers

const	CheckDb = require('../mongo/controllers/checkDb_co'),
		InsertDb = require('../mongo/controllers/insertDb_co'),
		Parsing = require('../models/parsing_mod');

module.exports =
{
	async bodyControl(body, fortniteAPI, success, error)
	{
		if (!lib.isEmpty(body.username) && !lib.isEmpty(body.email) && !lib.isEmpty(body.email_confirm) // Check if input is empty
			&& !lib.isEmpty(body.pwd) && !lib.isEmpty(body.pwd_confirm)
				&& !lib.isEmpty(body.region) && !lib.isEmpty(body.country))
		{
			body = await lib.trimBody(body);
			if (lib.isEmpty(body.epic_account))  //if data is empty
				error(0);
			if (body.pwd === body.pwd_confirm)	//Check if pwd, email confirmation is same
				if (body.email === body.email_confirm)
				{
					Parsing.validation(body, (resp) =>
					{
						CheckDb.checkRegistration(body, fortniteAPI, (response) => // Check if Mail or login exist and if Mail epic exist with API
						{
							// if (body.platform === 'SM' || body.platform === 'SW')
								body.epic_account = body.epic_account;
							// else
							// 	body.epic_account = response;
							if (body.platform === 'SM' || body.platform === 'SW')
							{
								InsertDb.userRegistration(body, (respInsert) =>		// Insert user in DB
								{
									Token.stockToken(body.username, (valide) =>
									{
										let token = valide;
										Mail.accountConfirmationMail(body.email, token, (resp) =>
										{
											success(resp);
										}, (er) => 
										{
											error(er)
										});
									}, (errorStock) => {error(errorStock)});
								}, (errInsert) => {error(errInsert)});
							}
							else
							{
								EpicApiLib.getKda(body, fortniteAPI, (respKda) =>
								{
									body.kda = respKda;
									InsertDb.userRegistration(body, (respInsert) =>		// Insert user in DB
									{
										Token.stockToken(body.username, (valide) =>
										{
											let token = valide;
											Mail.accountConfirmationMail(body.email, token, (resp) =>
											{
												success(resp);
											}, (er) => {error(er)});
										}, (errorStock) => {error(errorStock)});
									}, (errInsert) => {error(errInsert)});
								}, (errorKda) => {error(33)});
							}
						},(errorCheckRegistration) => {error(errorCheckRegistration)});
					}, (errorValidation) => {
						error(errorValidation);
					});  // Closing validation method
				}	// Closing email && confirm_email comparison
				else
					error(3);
			else
				error(2);
		}
		else
			error(0);
	},

	sendBackMail(value, success, error)
	{
		Parsing.validEmail(value, (successParsing) =>
		{
			Crud.getLoginByEmail(value, (successLogin) =>
			{
				CrudToken.getTokenRegister(successLogin, (successGetToken) =>
				{
					let token = successGetToken;
					Mail.accountConfirmationMail(value, token, (successMail) =>
					{
						success(1);
					}, (er) => 
					{
						error(er)
					});
				}, (errorGetToken) => {error(errorGetToken)})
			}, (errorLogin) => {error(26)})
		}, (errorParsing) =>
		{
			Parsing.validUsername(value, (successParsinLogin) =>
			{
				CrudToken.getTokenRegister(value, (successGetToken) =>
				{
					Crud.getId(value, (successId) =>
					{
						Crud.getEmail(successId, (successGetEmail) =>
						{
							Mail.accountConfirmationMail(successGetEmail, successGetToken, (successMail) =>
							{
								success(1);
							}, (er) => 
							{
								error(er)
							});
						}, (errorgetEmail) => {})
					}, (errorId) => {})
				}, (errorGetToken) => {error(errorGetToken)})
			}, (errorParsingError) => {error(0)})
		})
	}
}

