import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'sajib',
    email: 'sajib@admin.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'siddiqui',
    email: 'siddiqui@admin.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
