const { connectToDatabase } = require('./infrastructure/database');
const User = require('./domain/user');
const UserService = require('./application/user-service');
const UserRepositoryImpl = require('./infrastructure/user-repository-impl');

(async () => {
  try {
    await connectToDatabase();
    const userRepository = new UserRepositoryImpl();
    const userService = new UserService(userRepository);

    async function create (id, name) {
      let userId = await userService.createUser(
        new User(id, name)
      )
      console.log("create(): ", `Usuario creado con ID: ${userId}`);
    };

    async function getAll () {
      let users = await userService.getAllUsers();
      console.log("getAll(): ", `Usuarios creados: ${users.length}`);
    };
    
    async function getById (id) {
      let user = await userService.getUserById(id);
      console.log("getById(): ", `Usuario "${user.name}" obtenido con ID: ${user.id}`);
    };

    async function update (id, data) {
      let user = await userService.updateUser(id, data);
      console.log("update(): ", `Usuario editado a: "${user.name}"`);
      return process.exit()
    };

    async function deleted (id) {
      let userDeleted = await userService.deleteUser(id);
      if (userDeleted) {
        console.log("delete(): ", `Usuario borrado, su ID era: "${id}"`);
        return process.exit()
      }
    };

    // CRUD example
    const user = {
      id: Date.now().toString(),
      name: 'Juan'
    };
    create(user.id, user.name);
    getAll();
    getById(user.id);
    update(
      user.id,
      {name: `${user.name}-EDITED`}
    );
    deleted(user.id);
  } catch (error) { console.error('Error en la aplicación:', error) }
})();
