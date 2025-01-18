import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./page/Signup";
import Signin from "./page/Signin";
import Dashboard from "./page/Dashboard";
import SendMoney from "./page/SendMoney";
import Home from "./page/Home";
import Account from "./page/Account.jsx";
import Layout from "./Layout/Layout"; // Ensure Layout uses <Outlet /> for nested routes

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Use Layout as a wrapper for nested routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Home page */}
          <Route path="signup" element={<Signup />} /> {/* Signup page */}
          <Route path="signin" element={<Signin />} /> {/* Signin page */}
          <Route path="dashboard" element={<Dashboard />} /> {/* Dashboard page */}
          <Route path="send" element={<SendMoney />} /> {/* SendMoney page */}
          <Route path="account" element={<Account />} /> {/* Account page */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;