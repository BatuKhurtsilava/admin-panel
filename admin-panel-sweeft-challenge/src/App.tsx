import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Authorization from "./Pages/Authorization/Authorization";
import Navigation from "./Components/Navigation";
import PageNotFound from "./Pages/NotFound/PageNotFound";
import UserOrResource from "./Pages/UsersResources/components/UserOrResource";
import { AuthorizationContextProvider } from "./Contexts/AuthorizationContext";
import Main from "./Pages/Main";
import CardPage from "./Pages/UsersResources/CardPage";
import ResourcesOrUsers from "./Pages/UsersResources/ResourcesOrUsers";

import RequireAuth from "./Pages/Authorization/RequireAuth";

import { useEffect } from "react";

import styled from "styled-components";



function App() {
  return (
    
      <AuthorizationContextProvider>
        <Router>
          <Navigation />

          <Routes>
            <Route path="admin/auth" element={<Authorization />} />
            <Route element={<RequireAuth />}>
              <Route path="admin/main" element={<Main />} />
              <Route path="admin/resources" element={<ResourcesOrUsers />} />
              <Route path="admin/users" element={<ResourcesOrUsers />} />
              <Route path="admin/user/:userId" element={<CardPage />} />
              <Route path="admin/resource/:resId" element={<CardPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthorizationContextProvider>
    
  );
}

export default App;
