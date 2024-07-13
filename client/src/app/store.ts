import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

import { usersAPI } from "../features/Users/UserApi";
import { vehiclesAPI } from "../features/vehicles/VehiclesApi";
import { paymentsAPI } from "../features/Payments/PaymentsApi";
import { fleetsAPI } from "../features/fleet/FleetApis";
import { bookingsAPI } from "../features/bookings/BookingsApi";
import { ticketsAPI } from "../features/Tickets/TicketsApi";
import loginAPI from "../features/Login/LoginAPI";
import authSlice from "../features/Auth/authSlice";



// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["usersApi"], // Only persist the users API
};

// Combine all reducers
const rootReducer = combineReducers({
  [usersAPI.reducerPath]: usersAPI.reducer,
  [vehiclesAPI.reducerPath]: vehiclesAPI.reducer,
  [paymentsAPI.reducerPath]: paymentsAPI.reducer,
  [fleetsAPI.reducerPath]: fleetsAPI.reducer,
  [bookingsAPI.reducerPath]: bookingsAPI.reducer,
  [ticketsAPI.reducerPath]: ticketsAPI.reducer,
  [loginAPI.reducerPath]:loginAPI.reducer,
  auth:authSlice
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(
      usersAPI.middleware,
      loginAPI.middleware,
      vehiclesAPI.middleware,
      paymentsAPI.middleware,
      fleetsAPI.middleware,
      ticketsAPI.middleware,
      bookingsAPI.middleware
    ),
});

// Create persistor
export const persistor = persistStore(store);

// Set up listeners for RTK Query
setupListeners(store.dispatch);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
