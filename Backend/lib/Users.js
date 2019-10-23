const db = require('./Database');
const bcrypt = require('bcrypt-nodejs');

async function getUser(id){
	return await db.Admin.findById(id);
}

async function loginUser(email, password){
	var user = await db.Admin.findOne({ email });
	if(!user) return false;
	if(!bcrypt.compareSync(password, user.password)) return false;
	return user;
}

async function getUsers(){
	return await db.Admin.find().select('email name');
}

async function createUser(name, email, password){
	var u = await db.Admin.findOne({ email });
	if(u) return false;
	password = bcrypt.hashSync(password);
	var user = {
		name, email, password
	}
	var newUser = await db.Admin.create(user);
	return newUser._id;
}

async function deleteUser(id){
	return await db.Admin.findByIdAndDelete(id);
}

module.exports = {
	getUser,
	loginUser,
	getUsers,
	deleteUser,
	createUser
}