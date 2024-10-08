import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import BookingPage from "./pages/BookingPage";
import CheckinBooking from "./features/check-in-out/CheckinBooking";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/darkMode";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      // staleTime:60*1000
      staleTime:0
    }
  }
})

function App() {
  return (
    <DarkModeProvider>
    <QueryClientProvider client={queryClient}>

      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={ <ProtectedRoute>
              <AppLayout />
          </ProtectedRoute> }>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            <Route path="bookings/:bookingId" element={<BookingPage />} />
            <Route path="checkin/:bookingId" element={<CheckinBooking />} />

          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" gutter={12} reverseOrder={true} toastOptions={
        {
          success:{
            duration:3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error:{
            duration:5000
          }
        }
      }/>
    </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
