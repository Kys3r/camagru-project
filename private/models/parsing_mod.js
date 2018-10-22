//     Model register
const	lib = require("../src/lib/lib"),
		Region = require("../src/list/list_region"),
		Country = require("../src/list/list_country"),
		City = require("../src/list/list_city"),
		Platform = require("../src/list/list_platform"),
		Language = require("../src/list/list_language"),
		isValidUTF8 = require('utf-8-validate');

module.exports =
{
	validation(body, success, error)
	{
		this.validUsername(body.username, (usernameSuccess) =>
		{
			this.validEmail(body.email, (emailSuccess) =>
			{
				this.validPassword(body.pwd, (pwdSuccess) =>
				{
					this.validLocation(body.region, 1, (regionSuccess) =>
					{
						this.validLocation(body.country, 2, (countrySuccess) =>
						{
							this.validLocation(body.platform, 4, (platformSuccess) =>
							{
								this.validUsername(body.epic_account, (epic_accountSuccess) =>
								{
									success(1);
								}, (epic_accountSuccess) => {error(13)})
							}, (platformSuccess) => {error(platformSuccess)})
						}, (countrySuccess) => {error(countrySuccess)})
					}, (regionSuccess) => {error(regionSuccess)})
				}, (emailError) => {error(emailError)})
			}, (emailError) => {error(emailError)})
		}, (usernameError) => {error(usernameError)})
	},

	validUsername(str, success, error)
	{
		str = String(str);
		let strLen = str.length;

		if (str != undefined && (strLen >= 3 && strLen <= 16))
		{
			for (let i = 0; i < strLen; i++)
			{
				console.log(str[i]);
			    // lib.is_alpha(str.charCodeAt(i))  
				if (str[i] === '-' || str[i] === '_' || str[i] === ' ' || !(str.charCodeAt(i) >= 0 && str.charCodeAt(i) < 33)
					&& (str[i] !== '\'' && str[i] !== '\"' && str[i] !== '\\' && str[i] !== ';' && str[i] !== '{' && str[i] !== '}' && str[i] !== '<' 
						&& str[i] !== '>' && str[i] !== '&' && str[i] !== '' && str[i] !== '/'))
				{
					if (((str[i] === '-' && str[i - 1] === '-') || (str[i] === '_' && str[i - 1] === '_') || (str[i] === ' ' && str[i - 1] === ' ')) && i > 0)
					{
						error(4);
						break;
					}
					if (i >= (strLen - 1))
						success(1);
				}
				else
				{
					error(4);
					break;
				}
			}
		}
		else
			error(4);
	},

	validEmail(email, success, error)
	{
    	email = String(email);
		email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) ? success(1) : error(5);
	},

	validPassword(pwd, success, error)
	{
		let u = String(pwd);

		if (u.length >= 8)
		{
			let number = 0,
				letter = 0;
			for (let i = 0; i < u.length; i++)
			{
				if ((u.charCodeAt(i) >= 33 && u.charCodeAt(i) < 48)
					|| (u.charCodeAt(i) >= 58 && u.charCodeAt(i) <= 126))
						letter++;
				else if (u.charCodeAt(i) >= 48 && u.charCodeAt(i) <= 57)
					number++;
				else if (u[i] == ' ')
					error(7);
				if (i >= (u.length - 1))
					success(1)
			}
		}
		else
			error(7);
	},

	validLocation(value, param, success, error)	//param equal to select type, if value match in list, success !
	{
		value = String(value);
		let listLocal;
		let i = (-1);

		if (param === 1)
			listLocal = Region.listRegion;
		else if (param === 2)
			listLocal = Country.listCountry;
		else if (param === 3)
			listLocal = City.listCity;
		else if (param === 4)
			listLocal = Platform.listPlatform;
		else if (param === 5)
			listLocal = Language.listLanguage;

		let size = listLocal.length;
		let find = 0;
		while (++i < size)
			if (value === listLocal[i])
			{
				find = 1;
				success(1);
			}
		if (param == 1 && find == 0)
			error(8);
		else if (param == 2 && find == 0)
			error(9);
		else if (param == 3  && find == 0)
			error(10);
		else if (param == 4 && find == 0)
			error(11);
		else if (param == 5 && find == 0)
			error(12);
	}
}
