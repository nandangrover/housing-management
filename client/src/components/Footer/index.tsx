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
      <a target="_blank" color="inherit" href="https://www.nandangrover.com/">
        Nandan Grover
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Footer;
