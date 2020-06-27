/**
 * Welcome Page
 */

import React from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { RouteComponentProps } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Container, Typography } from '@material-ui/core';
import './styles.scss';

const Home: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <Header {...props} />
      <Container maxWidth="md">
      <div className="header-wrapper">
        <Typography
          align="left"
          variant="h4"
          color="textPrimary"
          style={{margin:'20px 0px 8px'}}
          className="title">
          Society Members
        </Typography>
        <Typography
          align="left"
          variant="body1"
          color="textPrimary"
          style={{margin:'0px 0px 23px'}}
          className="description">
          Explore your neighbours!
        </Typography>
        <hr />
      </div>
      </Container>
      <Container maxWidth="md">
        <div style={{ maxWidth: '100%', margin: '30px 0 30px' }}>
          <MaterialTable
            columns={[
              { title: 'Adı', field: 'name' },
              { title: 'Soyadı', field: 'surname' },
              { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
              {
                title: 'Doğum Yeri',
                field: 'birthCity',
                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
              },
            ]}
            data={[
              {
                name: 'Mehmet',
                surname: 'Baran',
                birthYear: 1987,
                birthCity: 63,
              },
            ]}
            title="Demo Title"
          />
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
