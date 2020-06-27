/**
 * Logout Component
 */

import React, { useEffect } from 'react';
import { destroyToken } from '../../configureClient';

const Logout: React.FC = () => {
  useEffect(() => {
    destroyToken();
  })
  return (
    <React.Fragment />
  );
};

export default Logout;
