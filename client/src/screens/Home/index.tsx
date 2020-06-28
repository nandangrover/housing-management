/**
 * Home Page
 */

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { RouteComponentProps } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Container, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import GET_USERS from '../../graphql/query/user';
import './styles.scss';

const Home: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { loading, data } = useQuery(GET_USERS);

  const columns: any = [
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname' },
    { title: 'Email', field: 'email' },
    { title: 'Flat', field: 'flat' },
    {
      title: 'Notices Posted',
      field: 'noticeCount',
      type: 'numeric',
    },
    {
      title: 'Unresolved Notices',
      field: 'unresolved',
      type: 'numeric',
    },
  ];

  const [tableData, setData] = useState<any>({
    data: [],
  });
  useEffect(() => {
    if (!loading) {
      const mutatedData = data?.users.map(
        ({ email, firstName, flat, lastName, notices }: any) => ({
          name: firstName,
          email: email,
          flat: flat,
          surname: lastName,
          noticeCount: notices.length,
          unresolved: countUnresolved(notices),
        })
      ) ?? [];
      setData({ data: mutatedData });
    }
  }, [loading, data]);

  const countUnresolved = (notices: any): number => {
    return notices.reduce((acc: number, curr: any) => {
      if (!curr.status) {
        acc += 1;
      }
      return acc;
    }, 0);
  };

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
            Society Members
          </Typography>
          <Typography
            align="left"
            variant="body1"
            color="textPrimary"
            style={{ margin: '0px 0px 23px' }}
            className="description">
            Explore your neighbours!
          </Typography>
          <hr />
        </div>
      </Container>
      <Container maxWidth="md">
        <div style={{ maxWidth: '100%', margin: '30px 0 30px' }}>
          <MaterialTable
            columns={columns}
            data={tableData.data}
            title="Member List"
          />
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
