import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// État initial
interface AuthState {
  password: string;
  pin: string;
}

const initialState: AuthState = {
  password: '',
  pin: '',
};

// Création d'un slice pour gérer le mot de passe et le PIN
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPin: (state, action: PayloadAction<string>) => {
      state.pin = action.payload;
    },
  },
});

// Export des actions pour les utiliser dans les composants
export const { setPassword, setPin } = authSlice.actions;

// Configuration du store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// Types pour le dispatch et l'état
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;