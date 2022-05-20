const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactPath = path.join(__dirname, "db", "contacts.json");

// Функция для вывода всего списка контактов
const listContacts = async () => {
  const dataString = await fs.readFile(contactPath);
  const data = JSON.parse(dataString);
  return data;
};

// Функция для поиска контакта по id
const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contanct = allContacts.find((contanct) => contanct.id === id);
  return contanct ? contanct : null;
};

// Функция добавления нового контакта
const addContact = async (name, email, phone) => {
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(allContacts));
  return newContact;
};

//Функция обновления по контакта по id
const updateById = async (id, data) => {
  const allContacts = await listContacts();
  const contanctIndex = allContacts.findIndex((contanct) => contanct.id === id);
  if (contanctIndex === -1) {
    return null;
  }
  allContacts[idx] = { ...data, id };
  await fs.writeFile(contactPath, JSON.stringify(allContacts));
  return allContacts[idx];
};

//Функция удаления контакта по id
const removeContact = async (id) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contanct) => contanct.id === id);
  const deletedcontanct = allContacts[index];
  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactPath, JSON.stringify(allContacts));
  }
  return deletedcontanct ? deletedcontanct : null;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateById,
  removeContact,
};
