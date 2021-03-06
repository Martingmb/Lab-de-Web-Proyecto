const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

var app = express();
var port = process.env.PORT || 2020;

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
app.listen(port);

app.use((req, res, next)=>{
	res.response = function(data){
		return this.send({ error: false, data });
	}
	res.error = function({code, message}){
		return res.send({
			error: { code, message }
		});
	}
	next();
});

app.use('/admin', require('./routes/Admin'));
app.use('/', require('./routes/Checkout'));
app.use('/', require('./routes/Store'));