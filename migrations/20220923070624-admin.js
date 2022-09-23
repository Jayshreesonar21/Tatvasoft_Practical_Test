module.exports = {
  async up(db, client) {
    // Create system admin
    const role = await db.collection('roles').findOne({ name: 'admin' });

    await db.collection('users').insertOne({
      firstName: 'admin',
      lastName: 'system',
      email: 'admin@gmail.com',
      password: '$2a$10$Y13.0QCtLZrtUYU.8Sw9qekolLgF7hXjU.fFm2M2xHFUQhJt9GVfu', //12345678 
      dob: '2022-09-23',
      role: role._id,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    })
  },

  async down(db, client) {
    await db.collection('users').deleteOne({ email: 'admin@gmail.com' })
  }
};
