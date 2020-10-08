const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { createColegio, getById, getByEmail, getAll } = require('../../models/colegio');

const Colegio = require('../../models/colegio');

// sacado de app escuelas
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

    await createColegio(req.body);
    res.json({ success: 'Colegio creado correctamente' });
});

// Recuperar un colegio a traves de su id
router.get('/:colegioId', async (req, res) => {
    try {
        const colegio = await Colegio.getById(req.params.colegioId);
        res.json(colegio);
    } catch (error) {
        console.log(error);
    }
});

// Agregar Colegio
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const result = await createColegio(req.body);
        if (result['affectedRows'] === 1) {
            const nuevoColegio = await getById(result['insertId']);
            res.status(201).json({ success: 'Se ha insertado un nuevo colegio', colegio: nuevoColegio });
        } else {
            res.status(422).json({ error: 'No se ha podido insertar el colegio' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/createColegio', async (req, res) => {
    console.log(req.body);
    const result = await createColegio(req.body);
    res.redirect('/colegio');
});

// Recuperar todos los colegios
router.get('/', async (req, res) => {
    console.log(req.user);
    try {
        const colegios = await getAll();
        res.json(colegios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// login
router.post('/login', [
    check('email', 'El email es obligatorio').exists().notEmpty(),
    check('password', 'El campo password es obligatorio').exists().notEmpty()
], async (req, res) => {
    // Validación errores datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json(errors.array());

    const colegio = await getByEmail(req.body.email);

    if (colegio) {
        // El email existe en la BD
        const iguales = bcrypt.compareSync(req.body.password, usuario.password);
        if (iguales) {
            res.json({ success: 'login correcto!', token: createToken(colegio) });
        } else {
            res.json({ error: 'El email/password son incorrectos 2' });
        }
    } else {
        // El email no existe en la BD
        res.json({ error: 'El email/password son incorrectos 1' });
    }
});

// HELPERS
const createToken = (pColegio) => {
    const payload = {
        colegioId: pColegio.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(15, 'minutes').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = router;