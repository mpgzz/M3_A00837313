require('dotenv').config();
const sql = require('mssql');
const crypto = require('crypto');

const pool = new sql.ConnectionPool({
  user: process.env.DB_USER,
  password: process.env.PW,
  server: process.env.SERVER,
  database: process.env.DB,
  port: parseInt(process.env.PORT, 10)
});

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex').toLowerCase();
};

const createUser = async (req, res) => {
  const {
    usuId, primerNombre, primerApellido,
    segundoApellido, correo, contrasena, rol
  } = req.body;

  try {
    await pool.connect();
    await pool.request()
      .input('usuId', sql.VarChar, usuId)
      .input('primerNombre', sql.VarChar, primerNombre)
      .input('primerApellido', sql.VarChar, primerApellido)
      .input('segundoApellido', sql.VarChar, segundoApellido)
      .input('correo', sql.VarChar, correo)
      .input('contrasena', sql.VarChar, hashPassword(contrasena))
      .input('rol', sql.VarChar, rol)
      .query(`
        INSERT INTO schemaMichelle.tablaUsu
        (usuId, primerNombre, primerApellido, segundoApellido, correo, contrasena, rol)
        VALUES (@usuId, @primerNombre, @primerApellido, @segundoApellido, @correo, @contrasena, @rol)
      `);

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating user' });
  }
};

const getUsers = async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request()
      .query('SELECT * FROM schemaMichelle.tablaUsu');

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching users' });
  }
};


const updateUser = async (req, res) => {
  const { usuId } = req.params; // Get the `usuId` from URL
  const { primerNombre, primerApellido, segundoApellido, correo, contrasena, rol } = req.body;

  try {
    await pool.connect();
    let updateQuery = "UPDATE schemaMichelle.tablaUsu SET ";
    const params = {};

    // Dynamically build the update query based on provided fields
    let fieldsUpdated = false;

    if (primerNombre) {
      updateQuery += "primerNombre = @primerNombre, ";
      params.primerNombre = primerNombre;
      fieldsUpdated = true;
    }
    if (primerApellido) {
      updateQuery += "primerApellido = @primerApellido, ";
      params.primerApellido = primerApellido;
      fieldsUpdated = true;
    }
    if (segundoApellido) {
      updateQuery += "segundoApellido = @segundoApellido, ";
      params.segundoApellido = segundoApellido;
      fieldsUpdated = true;
    }
    if (correo) {
      updateQuery += "correo = @correo, ";
      params.correo = correo;
      fieldsUpdated = true;
    }
    if (contrasena) {
      updateQuery += "contrasena = @contrasena, ";
      params.contrasena = hashPassword(contrasena); // Assuming hashPassword function exists
      fieldsUpdated = true;
    }
    if (rol) {
      updateQuery += "rol = @rol, ";
      params.rol = rol;
      fieldsUpdated = true;
    }

    // If no fields were provided to update, return early with a message
    if (!fieldsUpdated) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    // Remove the last comma and space
    updateQuery = updateQuery.slice(0, -2); // Removing trailing comma
    updateQuery += " WHERE usuId = @usuId";

    // Prepare request with parameters
    const request = pool.request()
      .input('usuId', sql.VarChar, usuId);

    // Add dynamic parameters for updated fields
    Object.keys(params).forEach(param => {
      request.input(param, sql.VarChar, params[param]);
    });

    // Execute the query
    const result = await request.query(updateQuery);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating user' });
  }
};



const deleteUser = async (req, res) => {
  const {
    usuId, primerNombre, primerApellido, correo
  } = req.body;

  try {
    await pool.connect();
    const result = await pool.request()
      .input('usuId', sql.VarChar, usuId)
      .input('primerNombre', sql.VarChar, primerNombre)
      .input('primerApellido', sql.VarChar, primerApellido)
      .input('correo', sql.VarChar, correo)
      .query(`
        DELETE FROM schemaMichelle.tablaUsu
        WHERE usuId = @usuId
          AND primerNombre = @primerNombre
          AND primerApellido = @primerApellido
          AND correo = @correo
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'User not found or incorrect details' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting user' });
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
