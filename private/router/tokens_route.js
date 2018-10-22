// NPM module part

const Express = require('express'),
	Router = Express.Router(),
	BodyParser = require('body-parser'),
	Cheerio = require('cheerio'),
	Fs = require('fs');

// Dev module part

const Tokens = require('../controllers/token_co.js');


// Router.get('/tokens_route', (req, res) => {
// 	if (res.statusCode == 200) {
// 		Tokens.activeAccount(req.query.token, (success) => {
// 			if (success == 1)
// 			{
// 				// bannier verte email activé
// 				console.log('account is activate')
// 			}
// 			else
// 			{
// 				console.log('account is not activate')
// 			}
// 		}, (error) => { }); //ici il faudrat
// 
// 	}
// });

Router.post('/forget_password', (req, res) => {
	if (res.statusCode == 200)
	{
		Tokens.insertForgetPassword(req.body.email_forget_form, (success) => {}, (error) => {});

	}
});

Router.get('/forget_password', (req, res) => {
	if (res.statusCode == 200)
	{
		let html = Fs.readFileSync(__dirname + '/../../public/src/views/index.html', 'utf8');
		$ = Cheerio.load(html);
		scriptNode = "<script> app.showNewPwd = true; app.token = '" + req.query.token + "' ";
		$('body').append(scriptNode);
		res.send($.html());
	}
});

Router.post('/change_password', (req, res) => {
	let data = {
		ret: undefined
	};
	if (res.statusCode == 200) {
		Tokens.resetPassword(req.body.new_pwd, req.body.confirm_pwd, req.body.token, (success) =>
		{
			data.ret = success;
			res.status(200).send(data);
		}, (error) => {
			data.ret = error;
			res.status(200).send(data);
		})
	}
});


module.exports = Router;