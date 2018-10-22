const 	Parsing = require('../models/parsing_mod'),
		Lib = require('../src/lib/lib'),
		Crud = require('../mongo/models/crud_mod'),
		Mailing = require('../models/email_mod'),
		Token = require('../controllers/token_co'),
		ApiLib = require('../api/lib_api_epic');

		
module.exports =
{
	changeLogin(login, session, success, error)
	{
		if (!Lib.isEmpty(login) && !Lib.isEmpty(session) && login != session)
		{
			login = login.toLowerCase();
			login = login.trim();

			Parsing.validUsername(login, (resp) =>
			{
				Crud.isLogin(login, (loginExist) =>
				{
					error(21);
				}, (loginNotExist) =>
				{
					Crud.updateLogin(session, login, (res) =>
					{
						success(1);
					}, (errorUpdate)=>{error(errorUpdate)});
				});
			}, (error_validUsername) => {error(4)})
		}
		else
		{
			if (login == session)
				error(51);
			else
				error(0);
		}	
	},

	changeEmail(email, emailConfirm, session, fortniteAPI, success, error)
	{
		if (!Lib.isEmpty(email) && !Lib.isEmpty(emailConfirm) && !Lib.isEmpty(session) && email == emailConfirm)
		{
			email = email.toLowerCase();
			email = email.trim();

			Parsing.validEmail(email, (resp) =>
			{
				Crud.isEmail(email, (emailExist) =>
				{
					error(22);
				}, (emailNotExist) =>
				{
					Crud.getId(session, (id) =>
					{
						Crud.getPlatform(id, (platform) =>
						{
							// ApiLib.validEpic(email, platform, fortniteAPI, (isValid) =>
							// {
							Token.stockToken(session, (tokenSuccess) =>
							{
								Crud.updateEmail(session, email, (res) =>
								{
									Mailing.accountConfirmationMail(email, tokenSuccess, (mailSuccess) =>
									{
										Crud.updateActive(session, false, (isActive) =>
										{
											success(1);
										}, (errorActive) => {error(errorActive)})
										success(res);
									}, (mailError) => {error(mailError)})
								}, (errorUpdate)=>{error(errorUpdate)});
							}, (errorToken) => {error(errorToken)})
							// }, (errorEpicValidation) => {error(errorEpicValidation)})
						}, (errorPlatform) => {error(errorPlatform)})
					}, (errorId) => {error(errorId)})
				});
			}, (error_validUsername) => {error(5)})
		}
		else
		{
			if (email != emailConfirm)
				error(3);
			else
				error(0);
		}	
	},

	changePassword(actualPwd, newPwd, pwdConfirm, session, success, error)
	{
		if (!Lib.isEmpty(actualPwd) && !Lib.isEmpty(newPwd) && !Lib.isEmpty(pwdConfirm) && !Lib.isEmpty(session) && actualPwd !== newPwd && newPwd === pwdConfirm)
		{
			actualPwd = actualPwd.trim();
			newPwd = newPwd.trim();
			pwdConfirm = pwdConfirm.trim();

			Parsing.validPassword(newPwd, (validPassword) =>
			{
				Crud.isPassword(actualPwd, session, (isPassword) =>
				{
					Crud.updatePassword(session, newPwd, (updatePwd) =>
					{
						success(1);
					}, (errorUpdatePwd) => {error(errorUpdated)})
				}, (invalidPassword) => {error(27)})
			}, (errorPassword) => {error(7)})
		}
		else
		{
			if (actualPwd === newPwd)
				error(52);
			else if (newPwd !== pwdConfirm)
				error(2)
			else
				error(0);
		}	
	},

	changeRegion(region, session, success, error)
	{
		if (!Lib.isEmpty(region) && !Lib.isEmpty(session))
			Parsing.validLocation(region, 1, (successParsing) =>
			{
				Crud.updateRegion(session, region, (successUpdate) =>
				{
					success(1);
				}, (errorUpdate) => {error(errorUpdate)});
			}, (errorParsing) => {error(errorParsing)});
		else
			error(0)
	},

	changeLanguage(language, session, success, error)
	{
		if (!Lib.isEmpty(language) && !Lib.isEmpty(session))
			Parsing.validLocation(language, 5, (successParsing) =>
			{
				Crud.updateLanguage(session, language, (successUpdate) =>
				{
					success(1);
				}, (errorUpdate) => {error(errorUpdate)});
			}, (errorParsing) => {error(errorParsing)});
		else
			error(0)
	},

	changeCountry(country, session, success, error)
	{
		if (!Lib.isEmpty(country) && !Lib.isEmpty(session))
			Parsing.validLocation(country, 2, (successParsing) =>
			{
				Crud.updateCountry(session, country, (successUpdate) =>
				{
					success(1);
				}, (errorUpdate) => {error(errorUpdate)});
			}, (errorParsing) => {error(errorParsing)});
		else
			error(0)
	},

	changeCity(city, session, success, error)
	{
		if (!Lib.isEmpty(city) && !Lib.isEmpty(session))
			Parsing.validLocation(city, 3, (successParsing) =>
			{
				Crud.updateCity(session, city, (successUpdate) =>
				{
					success(1);
				}, (errorUpdate) => {error(errorUpdate)});
			}, (errorParsing) => {error(errorParsing)});
		else
			error(0)
	},

	changePlatformEpic(platform, epicAccount, session, fortniteAPI, success, error)
	{
		if (!Lib.isEmpty(platform) && !Lib.isEmpty(session))
		{
			if (platform == 'PC' || platform == 'XB1' || platform == 'PS4')
			{
				Parsing.validLocation(platform, 4, (successParsing) =>
				{
					Crud.getId(session, (id) =>
					{
						Crud.getEmail(id, (email) =>
						{
							ApiLib.validEpic(epicAccount, platform, fortniteAPI, (successValidation) =>
							{
								Crud.updatePlatform(session, platform, (successUpdate) =>
								{
									Crud.updateEpicAccount(session, successValidation, (successUpdateEpic) =>
									{
										success(1);
									}, (errorUpdateEpic) => {error(errorUpdateEpic)})
								}, (errorUpdate) => {error(errorUpdate)});
							}, (errorValidation) => {error(34)})
						}, (errorEmail) => {error(errorEmail)})
					}, (errorId) => {error(errorId)})
				}, (errorParsing) => {error(errorParsing)});
			}
			else
			{
				if (!Lib.isEmpty(epicAccount))
				{
					Parsing.validUsername(epicAccount, (successLogin) =>
					{
						Parsing.validLocation(platform, 4, (successParsing) =>
						{
							Crud.getId(session, (id) =>
							{
							// 	Crud.isEpicAccount(epicAccount, (epicExist) =>
							// 	{
							// 		error(29);
							// 	}, (epicNotexist) =>
							// 	{
								Crud.getEmail(id, (email) =>
								{
									Crud.updatePlatform(session, platform, (successUpdatePlatform) =>
									{
										Crud.updateEpicAccount(session, epicAccount, (successUpdateEpic) =>
										{
											success(1);
										}, (errorUpdateEpic) => {error(errorUpdateEpic)})
									}, (errorUpdatePlatform) => {error(errorUpdatePlatform)});
								}, (errorEmail) => {error(errorEmail)})
								// })
							}, (errorId) => {error(errorId)})
						}, (errorParsing) => {error(errorParsing)});
					}, (errorUsername) => {error(errorUsername)})
				}
				else
					error(0);
			}
		}
		else
			error(0)
	}
}
