const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../lib/Users');
const Products = require('../lib/Products');
const Orders = require('../lib/Orders');
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

// -------------------------------------
// User actions
// -------------------------------------

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

// -------------------------------------
// Product Actions
// -------------------------------------

app.post('/products', (req, res)=>{
	Products.getAllProducts().then(products=>{
		return res.response(products);
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

app.post('/products/add', (req, res)=>{
	var { name, description, amount, cost, available, siempreverde, rojo, image, information } = req.body;
	if(!name || !amount || !cost) return res.error(Codes.missingInfo);

	Products.createProduct(name, description, amount, cost, information, available, siempreverde, rojo, image).then(newProduct=>{
		return res.response({ id: newProduct });
	}).catch(err=>{
		console.log(err);
		return res.error(Codes.unexpectedError);
	})
});

app.post('/products/edit', (req, res)=>{
	var { id, name, description, amount, cost, available, siempreverde, rojo, information } = req.body;
	if(!id || !name || !amount || !cost) return res.error(Codes.missingInfo);

	Products.editProduct(id, name, description, amount, cost, information, available, siempreverde, rojo).then(done=>{
		return res.response({ edited: true });
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

app.post('/products/image', (req, res)=>{
	var { id, image } = req.body;
	if(!id, !image) return res.error(Codes.missingInfo);
	var size = new Buffer(image, 'base64').length/1024;
	if(size>2048){
		return res.error(Codes.fileSizeTooLarge)
	}else{
		Products.setImage(id, image).then(done=>{
			return res.response({ edited: true })
		}).catch(err=>{
			return res.error(Codes.unexpectedError);
		})
	}
})

app.post('/products/get', (req, res)=>{
	var { id } = req.body;
	if(!id) return res.error(Codes.missingInfo);

	Products.getProduct(id).then(product=>{
		return res.response(product);
	}).catch(err=>{
		console.log(err);
		return res.error(Codes.unexpectedError);
	})
});

app.post('/products/delete', (req, res)=>{
	var { id } = req.body;
	if(!id) return res.error(Codes.missingInfo);

	Products.deleteProduct(id).then(done=>{
		if(!done) return res.error(Codes.noProduct);
		return res.response({ deleted: true });
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
})

// -------------------------------------
// Order Actions
// -------------------------------------
app.post('/orders/list', (req, res)=>{
	var { fulfilled } = req.body;
	var pr = fulfilled ? Orders.getFulfulledOrders : Orders.getMissingOrders;
	pr().then(orders=>{
		return res.response(orders);
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
})

app.post('/orders/get', (req, res)=>{
	var { id } = req.body;
	Orders.getOrder(id, true).then(order=>{
		return res.response(order);
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

app.post('/orders/mark', (req, res)=>{
	var { id } = req.body;
	Orders.orderFulfilled(id).then(done=>{
		return res.response({ fulfilled: true });
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

module.exports = app;