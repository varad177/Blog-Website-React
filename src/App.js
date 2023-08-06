import { useState } from "react";
import "./App.css";
import Login from "./components/account/Login";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import DataProvider from "./context/dataprovider";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import CreatePost from "./components/create/CreatePost";
import DetailsViews from "./components/details/DetailsViews";
import Update from "./components/create/Update";


const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Header />
      <Outlet />
    </>
    : <Navigate replace to='/login' />
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false)
  return (
    <DataProvider>
      <Router>

        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/create" element={<CreatePost />} />
            </Route>
            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/details/:id" element={<DetailsViews />} />
            </Route>
            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/update/:id" element={<Update />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
