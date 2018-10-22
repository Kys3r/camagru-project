
module.exports =
{
	is_alpha : (str) =>
	{
		str = String(str);
		return (((str >= 65 && str <= 90) || (str >= 97 && str <= 122)) ? true : false);
	},
	
	isEmpty : (val) =>
	{
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	},
	
	trimBody : (body) =>
	{
		for (let trim in body)
		{
			body[trim] = String(body[trim])
			if (body[trim] != body.pwd && body[trim] != body.pwd_confirm)
				body[trim] = body[trim].trim();
			if (body[trim] == body.username || body[trim] == body.email)
				body[trim] = body[trim].toLowerCase();
		}
		return (body);
	}
}