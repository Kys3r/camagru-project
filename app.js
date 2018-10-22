// Global modules part

const Express = require('express'),
	BodyParser = require('body-parser'),
	App = Express(),
	Server = require('http').createServer(App),
	Cheerio = require('cheerio'),
	Cron = require('node-cron'),
	Skins = require('./private/mongo/models/crud_skin.js'),
	Fs = require('fs'),
	Db = require('./private/config/setup');

// Dev require module part

let formRoute = require('./private/router/form_route'),
	settingRoute = require('./private/router/settings_route'),
	tokensRoute = require('./private/router/tokens_route'),
	io = require('socket.io').listen(Server),
	socketEvents = require('./private/socket/socketEvents'),
	session = require('express-session')({
		secret: 'kjsfhv;ansvlksdnmvl;d51548715489**qwdkjashcbeqcybieqiufqwdklsjlkjqwldiasdfq;wid;qiwudo;ahs;l;asnelqbnvjkewdnclejlkewfsjdshgfjkdsgfjkdschklajdlskc54547524143234556mnclkew',
		cookie: {
			maxAge: (360 * 86400 * 1000),
		},
		resave: true,
		saveUninitialized: true
	}),
	sharedsession = require('express-socket.io-session'),
	Scripts = require('./private/scripts/tokens_scpt'),
	port = 443;

let scriptNode;


// API require parts

let setupApi = require('./private/api/setup_api.js');
let fortniteAPI = setupApi.fortniteAPI;
fortniteAPI.login().then(() => { });


// Generic calls
App.use(BodyParser.urlencoded({ extended: true }));
App.use(Express.static(__dirname + '/public'));
App.use(BodyParser.json());

App.use(session);

io.use(sharedsession(session, {
	autoSave: true
}));

App.use('/form_route', formRoute);
App.use('/settings_route', settingRoute);
App.use('/tokens_route', tokensRoute);

// NODE CRON TAB SCRIPT
Cron.schedule('* * 0 * * *', () =>
{
	Scripts.clearObsoleteAccount();
	Scripts.clearObsoleteForgetToken();
});


App.get('/', (req, res) =>
{
	let html = Fs.readFileSync(__dirname + '/public/src/views/index.html', 'utf8');
	$ = Cheerio.load(html);
	fortniteAPI.session = req.session;
	module.exports = fortniteAPI;
	if (req.session.isLogged == true)
	{
		scriptNode = "<script> app.authentified = true; </script>"
		Skins.getLocker(req.session.UserId, (success) =>
		{
			req.session.locker = success;
			req.session.save();
		}, (error) => { });
	}
	else
		scriptNode = "<script> app.authentified = false; </script>";
	$('body').append(scriptNode);
	res.send($.html());
});

                    // a suprimier  avant la prod !!!!!!!!!!
App.get('/mobile', (req, res) =>
{

	let html = Fs.readFileSync(__dirname + '/public/src/views/indexMobile.html', 'utf8');
	$ = Cheerio.load(html);
	fortniteAPI.session = req.session;
	module.exports = fortniteAPI;
	if (req.session.isLogged == true)
	{
		scriptNode = "<script> app.authentified = true;</script>";
		Skins.getLocker(req.session.UserId, (success) =>
		{
			req.session.locker = success;
			req.session.save();
		}, (error) => { });
	}
	else
		scriptNode = "<script> app.authentified = false;</script>";
	$('body').append(scriptNode);
	res.send($.html());
});

App.get('/robots.txt', (req, res, next) =>
{
	res.type('text/plain')
	res.send(Fs.readFileSync(__dirname + '/robots.txt', 'utf8'));
});

App.get('/sitemap', (req, res, next) =>
{
	res.type('text/plain');
	res.send(Fs.readFileSync(__dirname + '/sitemap.xml', 'utf8'));
});

App.get('/controlpanel', (req, res) =>
{

	let html = Fs.readFileSync(__dirname + '/public/src/views/controlPanel.html', 'utf8');
	$ = Cheerio.load(html);

	if (req.session.typeOfUser == 'admin') // ajouter condition admin
	{
		scriptNode = "<script>app.authentified = true;</script>";
		$('body').append(scriptNode);
		res.send($.html());
	}
	else
		res.redirect('/');
});

App.use("*", (req, res) =>
{
	res.status(404).sendFile(__dirname + '/public/src/views/404.html', 'utf8');
});


socketEvents(io, fortniteAPI);						//	---> Socket Connection

Server.listen("8000", () =>
{
	console.log("listen port 8000");
});

module.exports = fortniteAPI;
