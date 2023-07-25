import fs from 'fs/promises'
import path from 'path'
import { nanoid } from 'nanoid'

const contactsPath = path.resolve('models','contacts.json')

const listContacts = async () => {
    const data = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(data)
}

const getContactById = async (contactId) => {
    const contacts = await listContacts()
    const result = contacts.find(item => item.id === contactId)
    return result || null
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null
  }
  const [result] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

const addContact = async (name, email, phone) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  const contacts = await listContacts()
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}



// const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// !!! const updateContact = async (contactId, body) => {}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact,
}
