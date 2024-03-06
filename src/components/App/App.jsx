import { useEffect } from 'react';
import PhonebookForm from '../PhonebookForm/PhonebookForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import { AppContainer, AppWrapper } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContact, deleteContacts } from '../../redux/operations';
import { selectContacts, selectFilter } from '../../redux/selectors';
import { setFilter } from '../../redux/contactsSlice';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  const handleAddContact = ({ name, number }) => {
    const newContact = {
      name,
      number,
    };

    const checkContactExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkContactExist) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContacts(contactId));
  };

  const handleChangeFilter = evt => {
    dispatch(setFilter(evt.target.value));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <AppContainer>
      <AppWrapper>
        <h1>Phonebook</h1>
        <PhonebookForm onSubmit={handleAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ContactList
          contacts={getFilteredContacts()}
          onDeleteContact={handleDeleteContact}
        />
      </AppWrapper>
    </AppContainer>
  );
};

export default App;
