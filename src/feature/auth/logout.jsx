import { Navigate } from 'react-router-dom'
import { useEffect } from 'react';


/**
 * This method is called when the user logs out of the system.
 * It will clear all state data.
 * Todo: This method should also be called on browser close events.
 * @param {*} props 
 * @returns This returns a navigation to the login page.
 */
const Logout = () => {

  /**
   * This is part of the state management life cycle. 
   */
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Navigate to="/auth/login" />
  );

};

export default Logout;
