import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiURL =  import.meta.env.VITE_BACKEND_URL;

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
      try {
        const { email, password } = credentials;
        const response = await fetch(`${apiURL}/users?email=${encodeURIComponent(email)}`);
        const users = await response.json();
        const user = users.find(user => user.email === email);
        if (!user) {
          return rejectWithValue('User not found.');
        }

        if (user.password !== password) {
          return rejectWithValue('Invalid password.');
        }
        return user;
      } catch (error) {
        return rejectWithValue(error.message);
      }
});

export const register = createAsyncThunk('auth/register', 

  async (credentials, { rejectWithValue }) => {
    try {
      const { email, password, name } = credentials;

      // Validate input
      if (!email || !password) {
        return rejectWithValue('Email and password are required.');
      }

      // Check if email already exists
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users?email=${encodeURIComponent(email)}`);
      const users = await response.json();

      if (users.length > 0) {
        return rejectWithValue('Email already exists.');
      }

      // Add new user
      const newUserResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name}),
      });

      const newUser = await newUserResponse.json();
      return newUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
        status: 'idle',
    },
    reducers: {
       signOut: (state) => {
          state.user = ''
       }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload; // This will contain the error message passed to rejectWithValue
        })
        .addCase(register.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload; // This will contain the error message passed to rejectWithValue
        });
    },
})

export const {signOut} = authSlice.actions

export default authSlice.reducer