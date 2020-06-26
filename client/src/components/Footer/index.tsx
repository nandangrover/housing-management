/**
 * Footer Component
 */

import React from 'react';
import { Link, Typography } from '@material-ui/core';
import './styles.scss';

const Footer: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="www.nandangrover.com">
        Nandan Grover
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Footer;
