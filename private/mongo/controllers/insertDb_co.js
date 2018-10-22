const	Models = require('../../config/schemas'),
		SaltRounds = 8,
		Users = Models.Users,
		Bcrypt = require('bcrypt');


let userRegistration = (body, response, error) =>   //insert User in db
{
	try
	{
		let password = body.pwd;
		Bcrypt.hash(password, SaltRounds, (err, hash) =>
		{
			if (body.platform === 'SW' || body.platform === 'SM') 
			{
				let UsersCollection = new Users({
					login : String(body.username),
					email : String(body.email),
					password : String(hash),
					regionServer : String(body.region),
					country : String(body.country),
					epicAccount : String(body.epic_account),
					platform : String(body.platform)
				});
				UsersCollection.save((err, res) =>
				{
					if (res)
						response(1);
					else
						error(23);
				});
			}
			else
			{
				let UsersCollection = new Users({
					login : String(body.username),
					email : String(body.email),
					password : String(hash),
					regionServer : String(body.region),
					country : String(body.country),
					epicAccount : String(body.epic_account),
					platform : String(body.platform),
					epicValidated : true,
					'kda' : Number(body.kda)
				});
				UsersCollection.save((err, res) =>
				{
					if (res)
						response(1);
					else
						error(23);
					if (err) error(err);
				});
			}
		});
	} catch (e)
	{
		error(e);
	}
}

module.exports.userRegistration = userRegistration;
