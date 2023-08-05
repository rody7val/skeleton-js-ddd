class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user) {
    try {
      const newUser = await this.userRepository.create(user);
      return newUser;
    } catch (error) {
      console.error('Error al crear el usuario:', error.message);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.getAll();
      return users;
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error.message);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await this.userRepository.getById(id);
      return user;
    } catch (error) {
      console.error('Error al obtener el usuario por ID:', error.message);
      throw error;
    }
  }

  async updateUser(id, data) {
    try {
      await this.userRepository.update(id, data);
      return this.getUserById(id)
    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      await this.userRepository.delete(id);
      return true
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
      throw error;
    }
  }
}

module.exports = UserService;