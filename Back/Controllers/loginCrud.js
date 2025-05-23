const sql = require('mssql');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

let connectedPool = null;

const connectToDatabase = async () => {
  if (!connectedPool) {
    const pool = new sql.ConnectionPool({
      user: process.env.DB_USER,
      password: process.env.PW,
      server: process.env.SERVER,
      database: process.env.BD,
      encrypt: process.env.ENCRYPT === 'true',
      options: {
        trustedConnection: false,
      },
    });

    connectedPool = await pool.connect();
    console.log('Database connection successful');
  }
  return connectedPool;
};


const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex').toLowerCase();
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    console.log('Received email:', email);
    console.log('Received password:', password);

    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT usuId, correo, contrasena, rol, primerNombre, primerApellido, segundoApellido FROM schemaMichelle.tablaUsu WHERE correo = @email');

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas1' });
    }

    const user = result.recordset[0];
    const hashedPassword = hashPassword(password);

    if (user.contrasena.toLowerCase() !== hashedPassword) {
      return res.status(401).json({ message: 'Credenciales incorrectas2' });
    }

    const token = jwt.sign(
      { usuId: user.usuId, correo: user.correo, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    const userData = {
      token,
      userInfo: {
        usuId: user.usuId,
        correo: user.correo,
        rol: user.rol,
        primerNombre: user.primerNombre,
        primerApellido: user.primerApellido,
        segundoApellido: user.segundoApellido,
      },
    };

    res.json({ userData });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = { loginUser, connectToDatabase };
