import { createSlice } from '@reduxjs/toolkit';
import { getContact, addContact, deleteContacts } from './operations';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    isLoading: false,
    error: null,
    contacts: [],
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    const pending = (state, action) => {
      state.isLoading = true;
    };
    const rejected = (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    };
    builder
      .addCase(getContact.pending, pending)
      .addCase(getContact.rejected, rejected)
      .addCase(getContact.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.contacts = actions.payload.map(contact => ({
          id: contact.id,
          name: contact.name,
          number: contact.number,
        }));
      })
      .addCase(addContact.pending, pending)
      .addCase(addContact.rejected, rejected)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const { name, number, id } = action.payload;
        state.contacts = [...state.contacts, { name, number, id }];
      })
      .addCase(deleteContacts.pending, pending)
      .addCase(deleteContacts.rejected, rejected)
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      });
  },
});
export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
