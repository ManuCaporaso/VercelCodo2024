const db = require('../db/db');

const obtenerTodosLosClientes = (req, res) => {
    const sql = 'SELECT * FROM Clientes';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

const obtenerClientePorcliente_Id = (req, res) => {
    const { cliente_id } = req.params;
    const sql = 'SELECT * FROM Clientes WHERE cliente_id = ?';
    db.query(sql, [cliente_id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

const crearCliente = (req, res) => {
    const { email, nombre, apellido, telefono, direccion, localidad } = req.body;
    const sql = 'INSERT INTO Clientes (email, nombre, apellido, telefono, direccion, localidad) VALUES (?, ?, ?, ?, ?,?)';
    db.query(sql, [email, nombre, apellido, telefono, direccion, localidad], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: 'Cliente Creado',
            cliente_id: result.insertId
        });
    });
};

const actualizarCliente = (req, res) => {
    const { cliente_id } = req.params;
    const { email, nombre, apellido, telefono, direccion, localidad } = req.body;
    const sql = 'UPDATE Clientes SET email = ?, nombre = ?, apellido = ?, telefono = ?, direccion = ?, localidad = ? WHERE cliente_id = ?';
    db.query(sql, [email, nombre, apellido, telefono, direccion, localidad, cliente_id], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: 'Cliente actualizado'
        });
    });
};

const borrarCliente = (req, res) => {
    const { cliente_id } = req.params;
    const sql = 'DELETE FROM Clientes WHERE cliente_id = ?';
    db.query(sql, [cliente_id], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: 'Cliente eliminado'
        });
    });
};

module.exports = {
    obtenerTodosLosClientes,
    obtenerClientePorcliente_Id,
    crearCliente,
    actualizarCliente,
    borrarCliente
};
