const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await listContacts();
    const contact = contactsList.find(
      (contact) => String(contact.id) === String(contactId)
    );

    if (!contact) {
      throw new Error(`Contact with id = ${contactId} not found`);
    }

    console.table(contact);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await listContacts();
    const data = JSON.parse(contactsList);
    const filtredContacts = data.filter(({ id }) => String(id) !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(filtredContacts, null, 2));
    console.table(filtredContacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsList = await listContacts();
    const data = JSON.parse(contactsList);
    data.push({
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    });

    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    console.table(data);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
