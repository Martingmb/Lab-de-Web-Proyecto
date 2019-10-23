const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../lib/Users');
const Codes = require('../Codes');
const fs = require('fs');
var app = express.Router();

const sign_key = fs.readFileSync(__dirname+'/../sign_key.key');

app.post('/login', (req, res)=>{
	var { email, password } = req.body;
	Users.loginUser(email, password).then(user=>{
		if(!user) return res.error(Codes.incorrectLogin);
		else{
			var token = jwt.sign({ id: user._id }, sign_key, { expiresIn: '1d' });
			var sendUser = {
				name: user.name,
				email: user.email,
				token
			}
			return res.response(sendUser);
		}
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

// =====================================
// Login required section
// =====================================

app.all('*', (req, res, next)=>{
	var { token } = req.body;
	if(!token) return res.error(Codes.invalidToken);
	var readToken = jwt.verify(token, sign_key);
	Users.getUser(readToken.id).then(user=>{
		if(!user) return res.error(Codes.invalidToken);
		req.user = user;
		next();
	})
});

app.post('/users', (req, res)=>{
	Users.getUsers().then(users=>{
		return res.response(users);
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

app.post('/users/get', (req, res)=>{
	var { id } = req.body;
	if(!id) return res.error(Codes.missingInfo);

	Users.getUser(id).then(user=>{
		if(!user) return res.error(Codes.noUser)
		return res.response(user);
	})
})

app.post('/users/create', (req, res)=>{
	var { name, email, password } = req.body;
	if(!name || !email || !password) return res.error(Codes.missingInfo);

	Users.createUser(name, email, password).then(user=>{
		if(!user) return res.error(Codes.errorCreatingUser);
		return res.response({ id: user });
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

app.post('/users/delete', (req, res)=>{
	var { id } = req.body;
	if(!id) return res.error(Codes.missingInfo);
	if(id==req.user._id) return res.error(Codes.cannotDeleteSelf);

	Users.deleteUser(id).then(done=>{
		if(!done) return res.error(Codes.unexpectedError);
		return res.response({ ...Codes.userDeleted, deleted: true })
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

module.exports = app;