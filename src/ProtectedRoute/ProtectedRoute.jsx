import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataContext } from '../Components/DataProvider/DataProvider';

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect: location.pathname } });
    }
  }, [user, navigate, location.pathname, msg]);

  return user ? children : null;
};

export default ProtectedRoute;
