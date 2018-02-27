const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var mongoose = require("mongoose");

app.use(express.static(publicPath));



//----------------------------------MONGOOSE----------------------------------//

var uristring = 'mongodb://pablotsdaw:pablotsdaw@ds247078.mlab.com:47078/minijuegospablo';
mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

var userSchema = new mongoose.Schema({
  name: String,
  puntos: Number
});

var PUser = mongoose.model('Puntuaciones', userSchema);

//METER EN SOCKET--------------------------//
// var jugador = new PUser({
//   name: socket.username,
//   puntos: puntos
// });
//
// jugador.save(function(err) {
//   if (err) console.log('Error on save!')
// });
//------------------------------------------//


//---------------------------------GLOBAL-------------------------------------//

var conectados = [];
let salaN = 1;
let jugadoresSala = [
  [],
  []
];

let vasos = [{
    num: 1,
    veneno: false,
    lleno: true
  }, {
    num: 2,
    veneno: true,
    lleno: true
  }, {
    num: 3,
    veneno: false,
    lleno: true
  }, {
    num: 4,
    veneno: false,
    lleno: true
  }, {
    num: 5,
    veneno: false,
    lleno: true
  },
  {
    num: 6,
    veneno: false,
    lleno: true
  }, {
    num: 7,
    veneno: false,
    lleno: true
  }, {
    num: 8,
    veneno: false,
    lleno: true
  }, {
    num: 9,
    veneno: false,
    lleno: true
  }, {
    num: 10,
    veneno: false,
    lleno: true
  },
  {
    num: 11,
    veneno: false,
    lleno: true
  }, {
    num: 12,
    veneno: false,
    lleno: true
  }, {
    num: 13,
    veneno: false,
    lleno: true
  }, {
    num: 14,
    veneno: false,
    lleno: true
  }, {
    num: 15,
    veneno: false,
    lleno: true
  },
  {
    num: 16,
    veneno: false,
    lleno: true
  }
];

//MEZCLAR ARRAY
function shuffle(lista) {
  for (var j, x, i = lista.length; i; j = Math.floor(Math.random() * i), x = lista[--i], lista[i] = lista[j], lista[j] = x);
  return lista;
}


//--------------------------------CONEXION------------------------------------//

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('nuevo-usuario', function(user) {
    if (conectados.indexOf(user) == -1) socket.username = user;
    else socket.username = user + Math.floor(Math.random() * 100);
    conectados.push(socket.username);
    io.emit('conectados', conectados);
  });

  //CHAT GENERAL
  socket.on('nuevo-mensaje', function(msg) {
    io.emit('mensajeChat', msg);
  });

  socket.on('reset', function() {
    socket.removeAllListeners('nuevo-mensaje-sala');
    socket.removeAllListeners('vaso-elegido');
  })

  //--------------------------------PARTIDA------------------------------------//

  socket.on('nueva-partida', function(msg) {
    socket.join("sala-" + salaN);
    socket.sala = salaN;
    vasos2 = shuffle(vasos);
    for (let elem of vasos2) elem.lleno = true;
    io.to("sala-" + salaN).emit('joinSala', "Estás en la sala: " + socket.sala);

    let turno = false;
    if (jugadoresSala[salaN - 1].length + 1 == 1) turno = true;

    jugadoresSala[salaN - 1].push({
      num: jugadoresSala[salaN - 1].length + 1,
      nombre: socket.username,
      turno: turno,
      puntos: 0,
      vidas: 1
    });
    if (jugadoresSala[salaN - 1].length == 2) {
      jugadoresSala.push([]);
      io.to("sala-" + socket.sala).emit('vasos', vasos2);
      io.to("sala-" + socket.sala).emit('jugadores', jugadoresSala[salaN - 1]);
      salaN++;
    }

    //CHAT SALA
    socket.on('nuevo-mensaje-sala', function(msg) {
      io.to("sala-" + socket.sala).emit('mensajeChatSala', msg);
    });

    //ELEGIR VASO
    socket.on('vaso-elegido', function(msg) {
      if (!vasos2[msg].veneno) {
        vasos2[msg].lleno = false;
        io.to("sala-" + socket.sala).emit('vaso', vasos2.indexOf(vasos2[msg]));
        for (let jugador of jugadoresSala[socket.sala - 1]) {
          if (jugador.turno == true) {
            jugador.turno = false;
            jugador.puntos += 20;
          } else jugador.turno = true;
          io.to("sala-" + socket.sala).emit('jugadores', jugadoresSala[socket.sala - 1]);
        }
      } else {
        for (let jugador of jugadoresSala[socket.sala - 1]) {
          if (jugador.nombre == socket.username) {
            jugador.vidas -= 1;
            jugador.puntos -= 20;
          }
        }
        for (let elem of vasos2) elem.lleno = true;
        io.to("sala-" + socket.sala).emit('mensajeChatSala', {
          nombre: 'SISTEMA',
          mensaje: 'Has perdido ' + socket.username
        });
        io.to("sala-" + socket.sala).emit('fin', jugadoresSala[socket.sala - 1]);

        //SACAR JUGADORES DE LA SALA
        socket.leave("sala-" + socket.sala);
      }
    });

  });

  //--------------------------------DESCONEXION---------------------------------//

  socket.on('disconnect', function() {
    console.log('user disconnected');
    conectados = conectados.filter(user => user != socket.username);
    io.emit('conectados', conectados);
    io.to("sala-" + socket.sala).emit('partida-cancelada', 'El oponente ha abandonado la partda.');
    jugadoresSala[socket.sala - 1] = jugadoresSala[salaN - 1].filter(elem => elem.nombre != socket.username);
  });
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});




//------------------------------LOGIN REDES SOCIALES--------------------------//

/*  PASSPORT SETUP  */

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("You have successfully logged in"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


/*  FACEBOOK AUTH  */

const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = '338891956597234';
const FACEBOOK_APP_SECRET = '29925367f2438148d3d16d3f6b6f11d2';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/error'
  }),
  function(req, res) {
    console.log(req.user);
    res.redirect('/logueo');
  });
