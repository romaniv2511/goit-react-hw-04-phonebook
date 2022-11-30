import { Component } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyles';
import { Section } from './Section/Section';
import { ContactsForm } from './Form/Form';
import { ContactsList } from './Contacts/ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const allNames = this.state.contacts.reduce(
      (acc, item) => [...acc, item.name],
      []
    );
    if (allNames.includes(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };
  removeContact = contactId => {
    const newContactsList = this.state.contacts.reduce((acc, item) => {
      return item.id === contactId ? acc : [...acc, item];
    }, []);

    this.setState({ contacts: newContactsList });
  };
  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  render() {
    return (
      <>
        <GlobalStyle />
        <h1>Phonebook</h1>
        <Section>
          <ContactsForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter
            onChange={e => this.setState({ filter: e.target.value })}
            value={this.state.filter}
          />
          <ContactsList
            contacts={this.filterContacts()}
            onBtnClick={this.removeContact}
          />
        </Section>
      </>
    );
  }
}
