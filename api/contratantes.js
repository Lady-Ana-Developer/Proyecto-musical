const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { createContratante, getById, getByEmail, getAll } = require('../../models/contratante');

const Contratante = require('../../models/contratante');
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
    console.log(req.body);

    await createContratante(req.body);
    res.json({ success: 'Contratante creado correctamente' });
});

// recuperar un contratante a traves de su id
router.get('/:contratanteId', async (req, res) => {
    try {
        const contratante = await Contratante.getById(req.params.contratanteId);
        res.json(contratante);
    } catch (error) {
        console.log(error);
    }
});

// recuperar un contratante
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const result = await createContratante(req.body);
        if (result['affectedRows'] === 1) {
            const nuevoContratante = await getById(result['insertId']);
            res.status(201).json({ success: 'Se ha insertado un nuevo contratante', contratante: nuevoContratante });
        } else {
            res.status(422).json({ error: 'No se ha podido insertar el contratante' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/createContratante', async (req, res) => {
    console.log(req.body);
    const result = await createContratante(req.body);
    res.redirect('/contratante');
});

// Recuperar todos los contratantes
router.get('/', async (req, res) => {
    console.log(req.user);
    try {
        const contratantes = await getAll();
        res.json(contratantes);
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

    const contratante = await getByEmail(req.body.email);

    if (contratante) {
        // El email existe en la BD
        const iguales = bcrypt.compareSync(req.body.password, usuario.password);
        if (iguales) {
            res.json({ success: 'login correcto!', token: createToken(contratante) });
        } else {
            res.json({ error: 'El email/password son incorrectos 2' });
        }
    } else {
        // El email no existe en la BD
        res.json({ error: 'El email/password son incorrectos 1' });
    }
});

// HELPERS
const createToken = (pContratante) => {
    const payload = {
        contratanteId: pContratante.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(15, 'minutes').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = router;