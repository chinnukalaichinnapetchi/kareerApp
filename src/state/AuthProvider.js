
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const AuthContext = createContext();

const initialState = { user: null, token: null, loading: true };

function reducer(state, action){
  switch(action.type){
    case 'RESTORE_TOKEN': return { ...state, token: action.token, user: action.user, loading: false };
    case 'SIGN_IN': return { ...state, token: action.token, user: action.user, loading: false };
    case 'SIGN_OUT': return { ...state, token: null, user: null, loading: false };
    default: return state;
  }
}

export default function AuthContextProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          api.setAuthToken(token);
          const res = await api.getUser();
          if (res && res.success) {
            dispatch({ type: 'RESTORE_TOKEN', token, user: res.data });
            return;
          }
        }
      } catch(e){
        console.warn('Auth restore error', e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: null, user: null });
    };
    bootstrap();
  }, []);

  const authContext = {
    state,
    signIn: async (token, user) => {
      await AsyncStorage.setItem('userToken', token);
      api.setAuthToken(token);
      dispatch({ type: 'SIGN_IN', token, user });
    },
    signOut: async () => {
      await AsyncStorage.removeItem('userToken');
      api.clearAuthToken();
      dispatch({ type: 'SIGN_OUT' });
    },
    register: async (token, user) => {
      await AsyncStorage.setItem('userToken', token);
      api.setAuthToken(token);
      dispatch({ type: 'SIGN_IN', token, user });
    }
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
