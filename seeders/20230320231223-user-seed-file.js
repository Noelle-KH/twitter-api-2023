'use strict'
const bcrypt = require('bcryptjs')
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const DEFAULT_NUMBER = 5
    await queryInterface.bulkInsert('Users', [{
      email: 'root@example.com',
      name: 'root',
      account: 'root',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10)),
      role: 'admin',
      avatar: `https://loremflickr.com/320/240/man,woman/?lock=${Math.floor(Math.random() * 50)}`,
      introduction: faker.lorem.sentence(5),
      created_at: new Date(),
      updated_at: new Date()
    },
    ...Array.from({ length: DEFAULT_NUMBER }).map((_, i) => ({
      email: `user${i + 1}@example.com`,
      name: `user${i + 1}`,
      avatar: `https://loremflickr.com/320/240/man,woman/?lock=${Math.floor(Math.random() * 50)}`,
      introduction: faker.lorem.sentence(5),
      account: `user${i + 1}`,
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10)),
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    })
    )], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}
