const contactsOperation = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "contact operation")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperation.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperation.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id: ${id} NOT FOUND!`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperation.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "update":
      const updateContactById = await contactsOperation.updateById(id, data);
      if (!updateContactById) {
        throw new Error(`Contact with id: ${id} NOT FOUND!`);
      }
      console.log(updateContactById);
      break;

    case "remove":
      const removeContact = await contactsOperation.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

(async () => {
  await invokeAction(argv);
})();
