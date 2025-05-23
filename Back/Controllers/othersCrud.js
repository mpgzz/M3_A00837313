const sql = require('mssql');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('./loginCrud');

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

const getUserData = async (req, res) => {
  const { usuId } = req.user;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('usuId', sql.VarChar, usuId)
      .query('SELECT * FROM schemaMichelle.tablaDatosUsu WHERE usuId = @usuId');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No data found for this user' });
    }

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving user data' });
  }
};

module.exports = { authenticateJWT, getUserData };
