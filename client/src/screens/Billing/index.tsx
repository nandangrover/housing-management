/**
 * Home Page
 */

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import './styles.scss';

const Billing: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <Header {...props} />
      <Container maxWidth="md">
        <div className="header-wrapper">
          <Typography
            align="left"
            variant="h4"
            color="textPrimary"
            style={{ margin: '20px 0px 8px' }}
            className="title">
            Billing
          </Typography>
          <Typography
            align="left"
            variant="body1"
            color="textPrimary"
            style={{ margin: '0px 0px 23px' }}
            className="description">
            Check for latest bills which you are due to pay!
          </Typography>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Billing;
