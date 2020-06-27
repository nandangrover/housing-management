/**
 * Home Page
 */

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { RouteComponentProps } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Container, Typography, Button } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import GET_USERS from '../../graphql/query/user';
import NoticeModal from '../../components/NoticeModal';
import AddIcon from '@material-ui/icons/Add';
import './styles.scss';

const Notices: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { loading, error, data } = useQuery(GET_USERS);

  let message = 'Users';
  if (loading) message = 'Loading...';
  if (error) message = `Error! ${error}`;
  if (data && data.users.length <= 0) message = 'No Users';

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

  const [modalState, setModalState] = useState<boolean>(false);
  useEffect(() => {
    if (!loading) {
      const mutatedData = data.users.map(
        ({ email, firstName, flat, lastName, notices }: any) => ({
          name: firstName,
          email: email,
          flat: flat,
          surname: lastName,
          noticeCount: notices.length,
          unresolved: countUnresolved(notices),
        })
      );
      setData({ data: mutatedData });
    }
  }, [loading]);

  const countUnresolved = (notices: any): number => {
    return notices.reduce((acc: number, curr: any) => {
      if (!curr.status) {
        acc += 1;
      }
      return acc;
    }, 0);
  };

  const showModal = () => {
    setModalState(true);
  };

  return (
    <React.Fragment>
      <Header {...props} />
      <Container maxWidth="md">
        <div className="header-wrapper">
        <div className="sec-1">
          <Typography
            align="left"
            variant="h4"
            color="textPrimary"
            style={{ margin: '20px 0px 8px' }}
            className="title">
            Notices
          </Typography>
          <Typography
            align="left"
            variant="body1"
            color="textPrimary"
            style={{ margin: '0px 0px 23px' }}
            className="description">
            Check for latest notice by fellow members!
          </Typography>
          </div>
          <div className="sec-2">
          <Button
            variant="contained"
            color="secondary"
            className="add-notice"
            onClick={showModal}
            startIcon={<AddIcon />}>
            Add Notice
          </Button>
          <NoticeModal state={modalState} onClose={setModalState} />
          </div>
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

export default Notices;
