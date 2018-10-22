const	Models = require('../../config/schemas.js'),
		Users = Models.Users;

module.exports =
{

											// Get PART

	getActualSkin(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.actualSkin);
			else
				error(0);
		});
	},

	getLocker(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.locker);
			else
				error(0);
		});
	},
											// UPDATE PART
	updateActualSkin(id, value, success, error)
	{
		Users.updateOne({ _id: id }, { $set: { actualSkin: value } }, (er, resp) =>
		{
			if (er)
				error(612);
			else
				success(1);
		});
	},

	updateLocker(id, value, success, error)
	{
		if (value != [] || value != '')
			this.getLocker(id, (successLocker) =>
			{
				value = successLocker.concat(value);
				Users.updateOne({ _id: id }, { $set: { locker: value } }, (er, resp) =>
				{
					if (er)
						error(613);
					else
						success(1);
				});
			}, (errorLocker) => {error(613)})
		else
			error(0);
	},
}
