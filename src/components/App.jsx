import { Component } from 'react';
import { nanoid } from 'nanoid';

import style from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
    search: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleAddContact = e => {
    e.preventDefault();
    const { name, contacts, number } = this.state;
    if (name.trim() === '' || number.trim() === '') {
      return;
    }
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert(`${name} is alredy in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: `${name} (${number})`,
    };
    this.setState({
      contacts: [...contacts, newContact],
      name: '',
      number: '',
    });
  };

  handleSearch = e => {
    this.setState({
      search: e.target.value,
    });
  };

  handleDeleteContact = id => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    this.setState({
      contacts: updatedContacts,
    });
  };

  render() {
    const { contacts, name, number, search } = this.state;
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <div className={style['phone-book']}>
        <h1 className={style.name}>Phonebook</h1>

        <form onSubmit={this.handleAddContact}>
          <label className={style.subTitle}>
            Name
            <input
              className={style.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              // pattern="^[a-zA-Zа-яА-Я]+(([' -]?)[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. 
          For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              placeholder="Enter name"
              value={name}
              onChange={this.handleChange}
            />
          </label>

          <label className={style.subTitle}>
            Number
            <input
              className={style.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              placeholder="Enter your number"
              value={number}
              onChange={this.handleChange}
              required
            />
          </label>

          <h2 className={style.name}>Contact</h2>
          <input
            className={style.input}
            type="text"
            placeholder="Search contacts"
            value={search}
            onChange={this.handleSearch}
          />
          <button className={style.btn} type="submit">
            Add contact
          </button>
        </form>

        <ul>
          {filterContacts.map(contact => (
            <li className={style.list} key={contact.id}>
              {contact.name}
              <button
                className={style.btnDelete}
                type="button"
                onClick={() => this.handleDeleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
