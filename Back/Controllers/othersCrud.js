const sql = require('mssql');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('./loginCrud');

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token faltante' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};

const getUserData = async (req, res) => {
  const { usuId } = req.user;
  console.log('Datos obtenidos:', req.user);

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('usuId', sql.VarChar, usuId)
      .query(`
        SELECT tu.usuId,
            tu.primerNombre AS primerNombre,
            tu.primerApellido AS primerApellido,
            tu.segundoApellido AS segundoApellido,
            tu.correo AS correo,
            tu.rol,
            td.carreraNomen,
            td.carreraNombre,
            td.fechaGrad,
            td.directorNombre,
            td.caliPromedio,
            td.nivelIngles
        FROM
            schemaMichelle.tablaUsu AS tu
        JOIN
            schemaMichelle.tablaDatosUsu AS td ON tu.usuId = td.usuId
        WHERE
            tu.usuId = @usuId;
      `);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos del usuario' });
    }

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
};

module.exports = { authenticateJWT, getUserData };
