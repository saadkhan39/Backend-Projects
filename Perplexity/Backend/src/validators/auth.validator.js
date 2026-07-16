export function validateRegister(req, res, next) {
	const { username, email, password } = req.body || {};
	const errors = [];

	if (!username || typeof username !== "string" || username.trim().length < 3) {
		errors.push({ field: "username", message: "Username must be at least 3 characters." });
	}

	const emailRegex = /^\S+@\S+\.\S+$/;
	if (!email || typeof email !== "string" || !emailRegex.test(email)) {
		errors.push({ field: "email", message: "A valid email address is required." });
	}

	if (!password || typeof password !== "string" || password.length < 6) {
		errors.push({ field: "password", message: "Password must be at least 6 characters." });
	}

	if (errors.length) {
		return res.status(400).json({ errors });
	}

	next();
}

export function validateLogin(req, res, next) {
	const { email, password } = req.body || {};
	const errors = [];

	const emailRegex = /^\S+@\S+\.\S+$/;
	if (!email || typeof email !== "string" || !emailRegex.test(email)) {
		errors.push({ field: "email", message: "A valid email address is required." });
	}

	if (!password || typeof password !== "string" || password.length < 6) {
		errors.push({ field: "password", message: "Password must be at least 6 characters." });
	}

	if (errors.length) {
		return res.status(400).json({ errors });
	}

	next();
}

export default validateRegister;
