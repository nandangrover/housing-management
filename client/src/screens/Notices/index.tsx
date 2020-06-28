/**
 * Home Page
 */

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { RouteComponentProps } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Container, Typography, Button, Icon } from '@material-ui/core';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import GET_NOTICES from '../../graphql/query/notices';
import NOTICE_ADDED from '../../graphql/subscription/notice';
import NoticeModal from '../../components/NoticeModal';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import './styles.scss';

const Notices: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { loading, data } = useQuery(GET_NOTICES);
  const { data: noticeAdded, loading: subLoading }: any = useSubscription<any>(
    NOTICE_ADDED
  );

  const columns: any = [
    { title: 'Created By', field: 'name' },
    { title: 'Member Email', field: 'email' },
    { title: 'Notice Description', field: 'description' },
    { title: 'Notice Filetype', field: 'mimetype' },
    { title: 'Notice Created At', field: 'created' },
    {
      title: 'Resolved Status',
      field: 'status',
      render: (rowData: any) => (
        <Icon style={{ color: '#90caf9' }}>{rowData.status}</Icon>
      ),
    },
  ];

  const [tableData, setData] = useState<any>({
    data: [],
    actions: [],
  });

  const [modalState, setModalState] = useState<boolean>(false);

  /**
   * Check for query data change
   */
  useEffect(() => {
    if (!loading) {
      const mutatedData = hydrateNoticeData(data?.notices);

      const actionData = [
        {
          icon: 'link',
          tooltip: 'Link to notice',
          onClick: (event: any, rowData: any) =>
            props.history.push({
              pathname: '/notice',
              search: `?u=${rowData.id}`,
              // state: { detail: response.data }
            }),
        },
      ];
      setData({ data: mutatedData, actions: actionData });
    }
  }, [loading, data, props.history]);

  // Update data for subscription
  useEffect(() => {
    if (!subLoading && noticeAdded) {
      const { noticeAdded: notice } = noticeAdded;

      const hydratedData = hydrateNoticeData([notice]);
      // Set the newly created data
      setData((t: any) => ({...t, data: [hydratedData[0], ...t.data]}));
    }
  }, [subLoading, noticeAdded]);

  /**
   * Hydrate data
   * @param data
   */
  const hydrateNoticeData = (data: any) => {
    return (
      data?.map(
        ({
          _id,
          description,
          mimetype,
          createdAt,
          status,
          user: { firstName, lastName, email },
        }: any) => ({
          name: `${firstName} ${lastName}`,
          id: _id,
          email: email,
          mimetype: mimetype,
          description: description,
          created: moment(createdAt).format('MMMM Do YYYY, h:mm:ss a'),
          status: status ? 'checkcircle' : 'info',
        })
      ) ?? []
    );
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
            <NoticeModal state={modalState} setModalState={setModalState} />
          </div>
          <hr />
        </div>
      </Container>
      <Container maxWidth="md">
        <div style={{ maxWidth: '100%', margin: '30px 0 30px' }}>
          <MaterialTable
            columns={columns}
            data={tableData.data}
            actions={tableData.actions}
            title="Member List"
          />
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Notices;
