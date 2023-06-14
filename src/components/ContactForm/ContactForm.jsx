import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addContact } from 'redux/operations';
import css from './ContactForm.module.css';
import { selectContacts } from 'redux/selectors';

const ContactForm = () => {
  const [name, setName] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleNameInput = e => {
    const { value } = e.currentTarget;
    setName(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const lowerCase = name.toLowerCase();
    const contactExists = contacts.some(
      contact => contact.name.toLowerCase() === lowerCase
    );

    if (contactExists) {
      alert(`${name} is already in contacts`);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const newContact = {
      name: formData.get('name'),
      number: formData.get('number'),
    };

    dispatch(addContact(newContact));
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label>
        Name:
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces."
          required
          onChange={handleNameInput}
        />
      </label>
      <label>
        Number:
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
