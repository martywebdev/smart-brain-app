import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiURL =  import.meta.env.VITE_BACKEND_URL;

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
      try {
        const { email, password } = credentials;
        const response = await fetch(`${apiURL}/sign-in`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }) 
        });
    
        const user = await response.json();
        if (!user) {
          return rejectWithValue('User not found.');
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


      // Add new users
      const newUserResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sign-up`, {
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
          state.error = action.payload; 
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
            state.error = action.payload; 
        });
    },
})

export const {signOut} = authSlice.actions

export default authSlice.reducer