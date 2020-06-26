/**
 * Welcome Page
 */

import React from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './styles.scss';

const Home: React.SFC = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="welcome-container">
        <h1 className="welcome-heading">Welcome</h1>
        <div className="welcome-cardContainer">
          <Card title="Query" href="/users" />
          <Card title="Mutation" href="/update" />
          <Card title="Subscription" href="/subscription" />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
