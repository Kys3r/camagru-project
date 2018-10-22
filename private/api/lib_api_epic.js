module.exports =
{
	validEpic(value, platform, fortniteAPI, success, error)
	{
		let findUsername = (value) =>
		{
			return fortniteAPI
			.checkPlayer(value, platform.toLowerCase())
			.then(stats => 
			{
				return (stats);
			})
			.catch(err =>
			{
				return (err);
			});
		};
		let ret = findUsername(value);
		ret.then((result) =>
		{
			if (result === 'Player Not Found' || result === 'Impossible to fetch User. User not found on this platform' || result === 'Please precise a good platform: ps4/xb1/pc')
				success(String(1));
			else
				success(result.displayName);
		});
	},

	getKda(body, fortniteAPI, success, error)
	{
		let epicAccount = body.epic_account;
		let statsBr = (epicAccount) =>
		{
			return fortniteAPI
			.getStatsBR(epicAccount, body.platform.toLowerCase())
			.then(stats => 
			{
				return (stats);
			})
			.catch(err =>
			{
				return (err);
			});
		};
		let ret = statsBr(epicAccount);
		ret.then((result) =>
		{
			if (result === 'Player Not Found' || result === 'Please precise a good platform: ps4/xb1/pc' || result === 'Impossible to fetch User. User not found on this platform')
				success(String(1));
			else
				success(result.lifetimeStats['k/d']);
		});
	}
}
