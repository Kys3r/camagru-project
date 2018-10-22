// NPM module part

const Express = require('express'),
	Router = Express.Router(),
	SetupApi = require('../api/setup_api'),
	Crud = require('../mongo/models/crud_mod'),
	Skins = require('../mongo/models/crud_skin'),
	Stats = require('../mongo/models/crud_stats'),
	fortniteAPI = SetupApi.fortniteAPI,
	request = require('request'),
	Lib = require("../src/lib/lib"),
	Cron = require('node-cron');
// Dev module part

const Register = require('../controllers/register_co'),
	Tokens = require('../controllers/token_co'),
	SignIn = require('../controllers/sign_in_co');

Router.post('/sign-up', (req, res) => {
	Router.session = undefined;

	if (res.statusCode == 200)
	{
		// RECAPTCHAT
		if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
		{
			return(res.status(200).send('13'));
		}
		else 
		{
			let secretKey = "6LfdBHYUAAAAAN1A_0b8OTBe7hhRPRhYsAzB1xMb";
			let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
	        
			request(verificationUrl, (error, response, body) =>
			{ 
				let captchat = JSON.parse(body);
				if (response)
				{
					Register.bodyControl(req.body, fortniteAPI, (success) => //if success == 1, user is insert, else check error indice returned
					{
						console.log("success form route = " + success);
						req.session.error = success;
						req.session.save();
						return(res.status(200).send(String(success)));

					}, (error) =>
					{
						console.log("error form route = " + error);
						req.session.error = error;
						req.session.save();
						return(res.status(200).send(String(error)));
					});
				}
			});
			
		}
	}
});

Router.post('/sign-in', (req, res) =>
{
	Router.session = undefined;
	let data = {};
	if (res.statusCode == 200) {
		if (!Lib.isEmpty(req.body.username)) {
			req.body.username = req.body.username.toLowerCase();
			req.body.username = req.body.username.trim();
			SignIn.connection(req.body.username, req.body.password, (success) =>
			{
				if (success == 71)
					Crud.getId(req.body.username, (success) =>
					{
						req.session.login = req.body.username;
						req.session.UserId = success;
						Crud.getEpicAccount(req.session.UserId, (success) =>
						{
							req.session.username = success;
							req.session.isLogged = true;
							Crud.getPlatform(req.session.UserId, (success) =>
							{
								req.session.platform = success;
								Crud.getKda(req.session.UserId, (success) =>
								{
									req.session.kda = success;
									Skins.getActualSkin(req.session.UserId, (success) =>
									{
										req.session.skin = success;
										Stats.isAdmin(req.session.UserId, (success) =>
										{
											req.session.typeOfUser = success;
											Skins.getLocker(req.session.UserId, (success) => 
											{
												req.session.locker = success;
												Crud.getCountry(req.session.UserId, (success) =>
												{
													req.session.country = success;
													Crud.getRegion(req.session.UserId, (success) =>
													{
														req.session.region = success;
														req.session.mailRequest = 0;
														req.session.save();
														Router.session = req.session;
														module.exports = Router;
														data =
															{
																username: req.session.login,
																epicId: req.session.username,
																skin: req.session.skin,
																locker: req.session.locker,
																platform: req.session.platform,
																country: req.session.country,
																ret: 1,
															}
														res.status(200).send(data);
													}, (errorGetRegion) => { });
												}, (errorGetCountry) => { });
											}, (errorGetLocker) => { });
										}, (errorGetAdmin) => { });
									}, (errorGetSkin) => { });
								}, (errorGetKda) => { });
							}, (errorGetPlatform) => { });
						}, (errorGetEpic) => { });
					}, (errorGetId) => { })
				else {
					Crud.getLoginByEmail(req.body.username, (success) =>
					{
						req.session.login = success;
						Crud.getId(req.session.login, (success) =>
						{
							req.session.UserId = success;
							Crud.getEpicAccount(req.session.UserId, (success) =>
							{
								req.session.username = success;
								req.session.isLogged = true;
								Crud.getPlatform(req.session.UserId, (success) =>
								{
									req.session.platform = success;
									Crud.getKda(req.session.UserId, (success) =>
									{
										req.session.kda = success;
										Skins.getActualSkin(req.session.UserId, (success) =>
										{
											req.session.skin = success;
											Stats.isAdmin(req.session.UserId, (success) =>
											{
												Skins.getLocker(req.session.UserId, (success) =>
												{
													req.session.locker = success;
													Crud.getCountry(req.session.UserId, (success) =>
													{
														req.session.country = success;
														Crud.getRegion(req.session.UserId, (success) =>
														{
															req.session.region = success;
															req.session.mailRequest = 0;
															req.session.save();
															Router.session = req.session;
															module.exports = Router;
															data =
																{
																	epicId: req.session.username,
																	username: req.session.login,
																	skin: req.session.skin,
																	locker: req.session.locker,
																	ret: 1,
																}
															res.status(200).send(data);
														});
													});
												});
											});
										});
									});
								});
							});
						})
					});
				}
			}, (error) => {
				req.session.mailRequest = 0;
				data.ret = error;
				res.status(200).send(data);
			});
		}
	}
});

Router.post('/logout', (req, res) => {
	Router.session = undefined;
	let data =
	{
		logout: false,
	};
	req.session.destroy();
	data.logout = true;
	Router.session = req.session;
	module.exports = Router;
	res.status(200).send(data);
});

Router.get('/active_account/', (req, res) =>
{
	Router.session = undefined;
	if (res.statusCode == 200)
	{
		Tokens.activeAccount(req.query.token, (success) =>
		{
			res.redirect('/');
		}, (error) => { }); //ici il faudrat
	}
});

Router.post('/skin', (req, res) =>
{
	if (res.statusCode == 200)
	{
		Router.session = undefined;
		data =
			{
				ret: false,
			}
		Skins.getLocker(req.session.UserId, (success) =>
		{
			req.session.locker = success;
			req.session.save(() => {
				let index = req.session.locker.indexOf(req.body.skin);
				if (req.session && req.body.skin && req.session.locker[index])
				{
					Skins.updateActualSkin(req.session.UserId, req.body.skin, (success) =>
					{
						req.session.skin = req.body.skin;
						req.session.save();
						Router.session = req.session;
						module.exports = Router;
						data.ret = true;
						res.status(200).send(data);
					}, (error) => {});
				}
			}, (error) => {});
		}, (error) => {});
	}
});

Router.post('/sendback-email', (req, res) =>
{
	if (req.session.mailRequest < 20)
	{
		req.session.mailRequest += 1;
		req.session.save();
		if (res.statusCode == 200)
		{
			Register.sendBackMail(req.body.value, (success) =>
			{
				console.log("success  =" + success);
			}, (error) => {console.log("error =" + error)})
		}
	}
})

// App.post('/settings_user', (req, res) =>
// {
// 	if (res.statusCode == 200)
// 	{
// 		Setting.settingUser(req.session.login, req.body, fortniteAPI, (success) =>
// 		{
// 			console.log("success dans /setting = " + success);
// 			if (success === 1)
// 			{
// 				req.session.login = req.body.username;
// 				console.log("req session after = " + req.session.login);
// 			}
// 		}, (error) => {console.log("Error sign in : " + error)});
// 	}
// });

module.exports = Router;