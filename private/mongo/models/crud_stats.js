const Models = require('../../config/schemas.js'),
	Users = Models.Users,
	ListCountry = require('../../src/list/list_country'),
	ListLanguage = require('../../src/list/list_language'),
	ListRegion = require('../../src/list/list_region'),
	ListCity = require('../../src/list/list_city'),
	ListPlatform = require('../../src/list/list_platform'),
	Lib = require('../../src/lib/lib');

module.exports =
{
	getTotalUsers(success, error)
	{
		Users.where({}).countDocuments((err, count) =>
		{
			if (err)
				error(1);
			success(count);
		})
	},

	getRankCountry(success, error)
	{
		let array = [];
		let object = false;

		for (let country in ListCountry.listCountry)
		{
			Users.where({ country: ListCountry.listCountry[country] }).countDocuments((err, count) =>
			{
				if (err)
					error(32);
				if (count > 0)
				{
					object = new Object();
					object.country = ListCountry.listCountry[country];
					object.value = count;
					array.push(object);
				}
				if (country == ListCountry.listCountry.length - 1)
					success(array.sort(Lib.sortObjectsInArray));
			})
		}
	},

	getRankLanguage(success, error)
	{
		let array = [];
		let object = false;

		for (let language in ListLanguage.listLanguage)
		{
			Users.where({ language: ListLanguage.listLanguage[language] }).countDocuments((err, count) =>
			{
				if (err)
					error(32);
				if (count > 0) {
					object = new Object();
					object.language = ListLanguage.listLanguage[language];
					object.value = count;
					array.push(object);
				}
				if (language == ListLanguage.listLanguage.length - 1)
					success(array.sort(Lib.sortObjectsInArray));
			})
		}
	},

	getRankRegion(success, error)
	{
		let array = [];
		let object = false;
		for (let region in ListRegion.listRegion) {
			Users.where({ regionServer: ListRegion.listRegion[region] }).countDocuments((err, count) =>
			{
				if (err)
					error(32);
				if (count > 0)
				{
					object = new Object();
					object.region = ListRegion.listRegion[region];
					object.value = count;
					array.push(object);
				}
				if (region == ListRegion.listRegion.length - 1)
					success(array.sort(Lib.sortObjectsInArray));
			})
		}
	},

	getRankFavoriteCity(success, error)
	{
		let array = [];
		let object = false;
		for (let city in ListCity.listCity)
		{
			Users.where({ favoriteCity: ListCity.listCity[city] }).countDocuments((err, count) =>
			{
				if (err)
					error(32);
				if (count > 0)
				{
					object = new Object();
					object.city = ListCity.listCity[city];
					object.value = count;
					array.push(object);
				}
				if (city == ListCity.listCity.length - 1)
					success(array.sort(Lib.sortObjectsInArray));
			})
		}
	},

	getRankPlatform(success, error)
	{
		let array = [];
		let object = false;
		for (let platform in ListPlatform.listPlatform)
		{
			Users.where({ platform: ListPlatform.listPlatform[platform] }).countDocuments((err, count) =>
			{
				if (err)
					error(32);
				if (count > 0)
				{
					object = new Object();
					object.platform = ListPlatform.listPlatform[platform];
					object.value = count;
					array.push(object);
				}
				if (platform == ListPlatform.listPlatform.length - 1)
					success(array.sort(Lib.sortObjectsInArray));
			})
		}
	},

	isAdmin(id, success, error)
	{
		Users.findById(id, (err, ret) =>
		{
			if (err)
				error(0);
			else if (ret)
				success(ret.typeOfUser);
			else
				error(0);
		});
	}
}