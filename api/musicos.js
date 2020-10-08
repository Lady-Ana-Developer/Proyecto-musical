const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { createMusico, getById, getByEmail, getAll } = require('../../models/musico');

const Musico = require('../../models/musico');

// registro en el login
router.post('/registro', [
    check('usuario', 'El campo usuario es obligatorio').exists().notEmpty(),
    check('email', 'El campo email es obligatorio').exists().isEmail(),
    check('password', 'El campo password es obligatorio').notEmpty(),

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors.array());
    }

    // encriptamos la password
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    await createMusico(req.body);
    res.json({ success: 'Musico creado correctamente' });
});

// recuperar un musico a traves de su id
router.get('/:musicoId', async (req, res) => {
    try {
        const musico = await Musico.getById(req.params.musicoId);
        res.json(musico);
    } catch (error) {
        console.log(error);
    }
});

// Agregar musico
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const result = await createMusico(req.body);
        if (result['affectedRows'] === 1) {
            const nuevoMusico = await getById(result['insertId']);
            res.status(201).json({ success: 'Se ha insertado un nuevo musico', musico: nuevoMusico });
        } else {
            res.status(422).json({ error: 'No se ha podido insertar el musico' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/createMusico', async (req, res) => {
    console.log(req.body);
    const result = await createMusico(req.body);
    res.redirect('/musico');
});

// Recuperar todos los musicos
router.get('/', async (req, res) => {
    console.log(req.user);
    try {
        const musicos = await getAll();
        res.json(musicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Login
router.post('/login', [
    check('email', 'El email es obligatorio').exists().notEmpty(),
    check('password', 'El campo password es obligatorio').exists().notEmpty()
], async (req, res) => {
    // Validación errores datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json(errors.array());

    const musico = await getByEmail(req.body.email);

    if (musico) {
        // El email existe en la BD
        const iguales = bcrypt.compareSync(req.body.password, usuario.password);
        if (iguales) {
            res.json({ success: 'login correcto!', token: createToken(musico) });
        } else {
            res.json({ error: 'El email/password son incorrectos 2' });
        }
    } else {
        // El email no existe en la BD
        res.json({ error: 'El email/password son incorrectos 1' });
    }
});

// HELPERS
const createToken = (pMusico) => {
    const payload = {
        musicoId: pMusico.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(15, 'minutes').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = router;