//Servidor Node
/*const http=require('http');
const server=http.createServer((req,res)=>{
	res.status = 200;
	res.setHeader('Content-Type','text/plain');
	res.end('Hello World');
});
server.listen(3000,()=>{
	console.log("Server despleado");
});*/

//Servidor Express
const express=require("express");
const morgan=require("morgan");
const app= express();

//Settings
app.set('appName','Kevin Andrey Herrera Silva');
app.set('port',3000);
app.set('view engine','ejs');

function logger(req,res, next){
	console.log(`Route Received ${req.protocol}://${req.get('host')}${req.originalUrl}`);
	next();
}

//Middlewares
app.use(express.json());
app.use(logger)//Muestra el log de las peticiones que llegan y su estado
app.use(morgan('dev'))

app.get('/',(req,res)=>{
	const data=[{name: "Jhon"},{name: "Jose"},{name: "Cameron"}];
	res.render('index.ejs',{people: data});
});


//Routes
app.all("/user",(req, res, next)=>{
	console.log("Por aquí pasó");
	next();
})
app.get("/user",(req,res)=>{
	res.json({
		username: "Usuario",
		password: "Contraseña"
	});
});
app.post("/user/:id", (req,res) => {
	console.log(req.body);
	console.log(req.params);
	res.send(`User ${req.params.id} deleted`);
})
app.put("/contact", (req,res)=>{
	res.send("PUT Received");
})
app.delete("/test", (req,res)=>{
	res.send("DELETE Received");
})

app.use(express.static('public'));

app.listen(app.get('port'), ()=>{
	console.log(app.get('appName'));
	console.log("Server on port",app.get('port'))
});

//instalar nodemon: npm install nodemon -D
//correr nodemon: npx nodemon index.js