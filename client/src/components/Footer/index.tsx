/**
 * Footer Component
 */

import React from 'react';
import { Typography } from '@material-ui/core';
import './styles.scss';

const Footer: React.FC = () => {
  return (
    <Typography style={{padding: '20px'}} variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a target="_blank" rel="noopener noreferrer" color="inherit" href="https://www.nandangrover.com/">
        Nandan Grover
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Footer;
