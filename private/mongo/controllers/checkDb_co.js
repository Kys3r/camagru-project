let Users = require('../../config/schemas'),
	lib = require('../models/crud_mod'),
	EpicApiLib = require('../../api/lib_api_epic');

let checkRegistration = (body, fortniteAPI, success, error) =>
{
	let login = String(body.username);
	let email = String(body.email);
	lib.isLogin(login, (loginExist) =>
	{
		error(21);
	}, (loginNotExist) =>
	{
		lib.isEmail(email, (emailExist) =>
		{
			error(22)
		}, (emailNotExist) =>
		{
			if (body.platform === 'SM' || body.platform === 'SW')
				success(1);
			else
				EpicApiLib.validEpic(body.epic_account, body.platform, fortniteAPI, (resp) =>
				{
					success(1);
				},
				(er) => {error(31)});
		})
	});
}
module.exports.checkRegistration = checkRegistration;