const { getConnection } = require('./database');
const User = require('../domain/user');

class UserRepositoryImpl {
  async create(user) {
    try {
      const connection = getConnection();
      const [result] = await connection.query('INSERT INTO users SET ?', [user]);
      return user.id;
    } catch (error) {
      console.error('Error al crear el usuario:', error.message);
      throw error;
    }
  }

  async getAll() {
    try {
      const connection = getConnection();
      const [rows] = await connection.query('SELECT * FROM users');
      return rows.map(userRow => new User(userRow.id, userRow.name));
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      const connection = getConnection();
      const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      const userRow = rows[0];
      return new User(userRow.id, userRow.name);
    } catch (error) {
      console.error('Error al obtener el usuario por ID:', error.message);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const connection = getConnection();
      return await connection.query('UPDATE users SET ? WHERE id = ?', [data, id]);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      const connection = getConnection();
      await connection.query('DELETE FROM users WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
      throw error;
    }
  }
}

module.exports = UserRepositoryImpl;