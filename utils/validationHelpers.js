const isValidEmail = function(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

const isValidPassword = function(password) {
	if (password.length >= 6) {
		return true;
	}
	return false;
}

const isValidName = function(string) {
	if (string.length > 0) {
		return true;
	}

	return false;
}

module.exports = {
	isValidName: isValidName,
	isValidPassword: isValidPassword,
	isValidEmail: isValidEmail
}