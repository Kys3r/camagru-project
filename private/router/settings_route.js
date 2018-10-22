// NPM module part

const Express = require('express'),
	App = Express(),
	Router = Express.Router(),
	BodyParser = require('body-parser'),
	setupApi = require('../api/setup_api'),
	fortniteAPI = setupApi.fortniteAPI,
	apiLib = require('../api/lib_api_epic');

const Register = require('../controllers/register_co'),
	Tokens = require('../controllers/token_co'),
	Settings = require('../controllers/settings_co'),
	Parsing = require('../models/parsing_mod'),
	Lib = require('../src/lib/lib');

//Dev modules part


Router.post('/change_login', (req, res) => {
	if (res.statusCode == 200) {

		Settings.changeLogin(req.body.username, req.session.login, (success) => {
			req.session.login = req.body.username.toLowerCase();
			req.session.save();
			res.status(200).send('1')
		}, (error) => { res.status(200).send(String(error)) })
	}
});

Router.post('/change_email', (req, res) => {
	if (res.statusCode == 200) {
		Settings.changeEmail(req.body.email, req.body.email_confirm, req.session.login, fortniteAPI, (success) => {
			res.status(200).send('1');
		}, (error) => { res.status(200).send(String(error)) })
	}
});
Router.post('/change_password', (req, res) => {
	if (res.statusCode == 200) {
		Settings.changePassword(req.body.actual_pwd, req.body.pwd, req.body.pwd_confirm, req.session.login, (success) => {
			res.status(200).send('1');
		}, (error) => { res.status(200).send(String(error)) })
	}
});
Router.post('/change_region', (req, res) => {
	if (res.statusCode == 200) {
		Settings.changeRegion(req.body.region, req.session.login, (success) => {
			res.status(200).send('1');
		}, (error) => { res.status(200).send(String(error)) })
	}
});
Router.post('/change_language', (req, res) => {
	if (res.statusCode == 200) {
		Settings.changeLanguage(req.body.language, req.session.login, (success) => {
			res.status(200).send('1');
		}, (error) => { res.status(200).send(String(error)) })
	}
});
Router.post('/change_country', (req, res) => {
	if (res.statusCode == 200) {
		Settings.changeCountry(req.body.country, req.session.login, (success) => {
			req.session.country = req.body.country;
			req.session.save();
			Router.session = req.session;
			res.status(200).send('1');
		}, (error) => { res.status(200).send(String(error)) })
	}
});
Router.post('/change_city', (req, res) => {
	if (res.statusCode == 200) {
		Settings.changeCity(req.body.city, req.session.login, (success) => {
			res.status(200).send('1');
		}, (error) => { res.status(200).send(String(error)) })
	}
});
Router.post('/change_platform_epic', (req, res) => {
	if (res.statusCode == 200)
	{
		Settings.changePlatformEpic(req.body.platform, req.body.epic_account, req.session.login, fortniteAPI, (success) => {
			Crud.getEpicAccount(req.session.UserId, (success) => {
				req.session.username = success;
				req.session.platform = req.body.platform;
				req.session.save();
			});
			Router.session = req.session;
			res.status(200).send('1');
		}, (error) => { res.status(200).send(String(error)) })
	}
});

module.exports = Router;