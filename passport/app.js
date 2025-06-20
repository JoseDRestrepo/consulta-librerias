const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();

const users = [{ id: 1, username: 'jose', password: 'contrasena' }, { id: 2, username : 'maria', password: 'contrasena2' }];

passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(user => user.username === username);
    if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
    }
    if (user.password !== password) {
        return done(null, false, { message: 'Contraseña incorrecta' });
    }
    return done(null, user);
}));

passport.serializeUser ((user, done) => {
    done(null, user.id);
});

passport.deserializeUser ((id, done) => {
    const user = users.find(user => user.id === id);
    done(null, user);
});

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'mi_secreto', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login'
}));

app.get('/success', (req, res) => {
    res.send('Inicio de sesión exitoso');
});

app.get('/login', (req, res) => {
    res.send('Página de inicio de sesión');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
