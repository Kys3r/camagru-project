const	Lib = require("../src/lib/lib"),
		Crud = require("../mongo/models/crud_mod"),
		Parsing = require("../models/parsing_mod");
module.exports =
{
	connection(logValue, password, success, error)
	{
		if (!Lib.isEmpty(logValue) || !Lib.isEmpty(password))
		{
			logValue = logValue.toLowerCase();
			logValue = logValue.trim();

			Parsing.validUsername(logValue, (successUsername) =>
			{
				Crud.isLogin(logValue, (successLogin) =>
				{
					Crud.isActive(logValue, (successIsActive) =>
					{
						Crud.isPassword(password, logValue, (successPassword) =>
						{
							success(71);
						}, (errorPassword) =>{error(27)})
					}, (notActivate) => {error(notActivate)})
				}, (errorLogin) => {error(26)})
			},
			(errorUsername) =>{
				Parsing.validEmail(logValue, (successEmail) =>
				{
					Crud.getLoginByEmail(logValue, (succcessGetLog) =>
					{
						Crud.isActive(succcessGetLog, (successIsActive) =>
						{
							Crud.isPassword(password, succcessGetLog, (successPassword) =>
							{
								success(72);
							}, (errorPassword) =>{error(27)})
						}, (notActivate) => {error(notActivate)})
					}, (errorGetLog) =>{error(26)})
				}, (errorEmail) => {error(4)})
			})
		}
		else
			error(0);
	}
}
