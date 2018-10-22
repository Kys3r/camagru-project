const	Models = require('../../config/schemas.js'),
		Users = Models.Users,
		Bcrypt = require('bcrypt'),
		SaltRounds = 8;

module.exports = 
{
									// Validator 'isFoo' part

	isLogin(login, success, error)
	{
		Users.where({ 'login' : login }).countDocuments((err, count) =>
		{
			if (err)
				error(1);
			else if (count > 0)
				success(1);
			else
				error(0);
		})
	},

	isEmail(email, success, error)
	{
		Users.where({ email : email }).countDocuments((err, count) =>
		{
			if (err)
				error(err);
			else if (count > 0)
				success(1);
			else
				error(1);
		});
	},

	isPassword(password, login, success, error)
	{
		Users.findOne({ login : login }, 'password', (err, pwd) =>
		{
			Bcrypt.compare(password, pwd.password, (err, res) =>
			{
				if (err)
					error(0);
				if (res === true)
					success(1);
				else
					error(0);
			});
		}, (errorUpdate) => {error(errorUpdate)})
	},

	isEpicAccount(epicAccount, success, error)
	{
		Users.where({ epicAccount : epicAccount}).countDocuments((err, count) =>
		{
			if (err)
				error(err);
			else if (count > 0)
				success(1);
			else
				error(1);
		});
	},

	isActive(login, success, error)
	{
		Users.findOne({ login : login }, 'isActive', (err, res) =>
		{
			if (err)
				error(err);
			else
			{
				if (res.isActive)
					success(1);
				else
					error(28);
			}
		})
	},

									// GET PART

	getId(login, success, error)
	{
		Users.findOne({ login : login}, (err, ret) =>
		{
			if (err)
				error(err);
			else if (ret)
				success(ret._id);
			else
				error(0);
		});
	},

	getLoginByEmail(email, success, error)
	{
		Users.findOne({ email : email }, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.login);
			else
				error(0);
		});
	},

	getLoginById(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.login);
			else
				error(0);
		});
	},

	getEmail(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.email);
			else
				error(0);
		});
	},

	getPassword(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.password);
			else
				error(0);
		});
	},

	getFavoriteCity(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.favoriteCity);
			else
				error(0);
		});
	},

	getEpicAccount(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.epicAccount);
			else
				error(0);
		});
	},

	getEpicValidated(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.epicValidated);
			else
				error(0);
		});
	},

	getPlatform(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.platform);
			else
				error(0);
		});
	},

	getRegion(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.regionServer);
			else
				error(0);
		});
	},

	getCountry(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.country);
			else
				error(0);
		});
	},

	getKda(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.kda);
			else
				error(0);
		});
	},

	getTotalReporting(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.totalReporting);
			else
				error(0);
		});
	},

	getFakeReporting(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.fakeReporting);
			else
				error(0);
		});
	},

	getAfkReporting(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.afkReporting);
			else
				error(0);
		});
	},

	getInsultReporting(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.insultReporting);
			else
				error(0);
		});
	},

	getIsActive(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.isActive);
			else
				error(0);
		});
	},

	getBanned(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.banned);
			else
				error(0);
		});
	},

									// UPDATE PART

	updateLogin(session, login, success, error)
	{
		Users.updateOne({ login: session }, { $set: { login: login } }, (er, resp) =>
		{
			if (er)
				error(61);
			else
				success(1);
		});
	},

	updateEmail(login, email, success, error)
	{
		Users.updateOne({ login: login }, { $set: { email: email } }, (er, resp) =>
		{
			if (er)
				error(62);
			else
				success(1);
		});
	},

	updatePasswordByEmail(email, password, success, error)
	{
		Bcrypt.hash(password, SaltRounds, (err, hash) =>
		{
			if (err)
				error(err);
			else
			{
				Users.updateOne({ email: email }, { $set: { password : hash } }, (er, resp) =>
				{
					if (er)
						error(611);
					else
						success(1);
				});
			}
		})
	},

	updateActive(login, bool, success, error)
	{
		Users.updateOne({ login: login }, { $set: { isActive: bool } }, (er, resp) =>
		{
			if (er)
				error(63);
			else
				success(1);
		});
	},

	updatePassword(login, password, success, error)
	{
		Bcrypt.hash(password, SaltRounds, (err, hash) =>
		{
			if (err)
				error(err);
			else
			{
				Users.updateOne({ login: login }, { $set: { password : hash } }, (er, resp) =>
				{
					if (er)
						error(691);
					else
						success(1);
				});
			}
		})
	},

	updateRegion(login, region, success, error)
	{
		Users.updateOne({ login: login }, { $set: { regionServer : region } }, (er, resp) =>
		{
			if (er)
				error(64);
			else
				success(1);
		});
	},

	updateLanguage(login, language, success, error)
	{
		Users.updateOne({ login: login }, { $set: { language : language } }, (er, resp) =>
		{
			if (er)
				error(65);
			else
				success(1);
		});
	},

	updateCountry(login, country, success, error)
	{
		Users.updateOne({ login: login }, { $set: { country : country } }, (er, resp) =>
		{
			if (er)
				error(66);
			else
				success(1);
		});
	},

	updateCity(login, city, success, error)
	{
		Users.updateOne({ login: login }, { $set: { favoriteCity : city } }, (er, resp) =>
		{
			if (er)
				error(67);
			else
				success(1);
		});
	},

	updatePlatform(login, platform, success, error)
	{
		Users.updateOne({ login: login }, { $set: { platform : platform } }, (er, resp) =>
		{
			if (er)
				error(68);
			else
				success(1);
		});
	},

	updateEpicAccount(login, epicAccount, success, error)
	{
		Users.updateOne({ login: login }, { $set: { epicAccount : epicAccount } }, (er, resp) =>
		{
			if (er)
				error(69);
			else
				success(1);
		});
	},

	UpdateActiveUser(login, success, error)
	{
		Users.updateOne({ login: login }, { $set: { isActive: true } }, (er, resp) =>
		{
			if (er)
				error(er);
			else
				success(1);
		});
	},
									// DELETE PART
	
	deleteUser(login, success, error)
	{
		Users.deleteOne({ login: login }, (er, resp) =>
		{
			if (er)
				error(er);
			else
				success(1);
		});	
	},
	
}