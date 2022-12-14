import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  form: {
    radius: 12,
  },
  btn: {
    disabled: false,
    value: 'Cari Teman',
  },
  message: {
    error: '',
    success: '',
  },
  friends: [],
  selectedFriend: {
    _id: null,
  },
};

export const formSearch = createSlice({
  name: 'form-search',
  initialState: { ...initialState },
  reducers: {
    // State Control.
    setRadius: (state, { payload }) => {
      state.form.radius = payload;
    },

    setBtn: (state, { payload }) => {
      const { disabled, value } = payload;
      state.btn.disabled = disabled;
      state.btn.value = value;
    },

    setMessage: (state, { payload }) => {
      const { error, success } = payload;
      state.message.error = error;
      state.message.success = success;
    },

    setFriends: (state, { payload }) => {
      state.friends = payload;
    },

    setSelectedFriend: (state, { payload }) => {
      state.selectedFriend = payload;
    },

    resetState: (state) => {
      const {
        form, btn, message, friends, selectedFriend,
      } = { ...initialState };
      state.form = form;
      state.btn = btn;
      state.message = message;
      state.friends = friends;
      state.selectedFriend = selectedFriend;
    },

    // API Control.
  },
});

export const {
  setRadius, setBtn, setMessage, setFriends, setSelectedFriend, resetState,
} = formSearch.actions;
export default formSearch.reducer;
