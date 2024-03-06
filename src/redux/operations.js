import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://65e7669b53d564627a8ebbfd.mockapi.io/';

const getContact = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('contacts/contacts');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const addContact = createAsyncThunk(
  'contacts/addContacts',
  async ({ name, phone }, thunkAPI) => {
    try {
      const response = await axios.post('contacts/contacts', {
        name,
        phone,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteContacts = createAsyncThunk(
  'contacts/deteteContact',
  async (contactId, thunkAPI) => {
    try {
      console.log(contactId);
      const response = await axios.delete(`contacts/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { getContact, addContact, deleteContacts };
