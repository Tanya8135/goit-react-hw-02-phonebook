import PropTypes from 'prop-types';

import style from './App.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(
      (
        contact // Оновлено: використовуємо `contacts` замість `filterContacts`
      ) => (
        <li className={style.list} key={contact.id}>
          {contact.name}
          <button
            className={style.btnDelete}
            type="button"
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      )
    )}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
