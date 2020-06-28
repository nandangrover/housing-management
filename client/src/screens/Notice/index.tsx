/**
 * Home Page
 */

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useQuery } from '@apollo/react-hooks';
import GET_NOTICE from '../../graphql/query/notice';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import './styles.scss';

const Notice: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { loading: noticeLoading, data: noticeData }: any = useQuery(
    GET_NOTICE,
    {
      variables: { noticeId: props.history.location.search.slice(3) },
    }
  );

  const [numPages, setNumPages] = useState<any>(1);
  const [pageNumber, setPageNumber] = useState<any>(1);
  const [documentLoading, setDocLoading] = useState<any>(true);
  const [isPdf, setPdf] = useState<any>(false);

  useEffect(() => {
    if (!noticeLoading && noticeData) {
      if (noticeData.notice.mimetype === 'pdf') setPdf(true);
    }
  }, [noticeLoading, noticeData]);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
    setDocLoading(false);
  };

  const pageChange = (event: any, page: number) => {
    setPageNumber(page);
  };

  return (
    <React.Fragment>
      <Header {...props} />
      {noticeData?.notice && (
        <div className="container">
          <Container maxWidth="md">
            <div className="header-wrapper">
              <Typography
                align="center"
                variant="h4"
                color="textPrimary"
                style={{ margin: '20px 0px 8px' }}
                className="title">
                Notice
              </Typography>
              <Typography
                align="center"
                variant="body1"
                color="textPrimary"
                style={{ margin: '0px 0px 23px' }}
                className="description">
                {noticeData.notice.description}
              </Typography>
              <hr />
            </div>
          </Container>
          <Container maxWidth="md">
            {!isPdf && (
              <img
                className="responsive-image"
                alt={noticeData.notice.description}
                src={noticeData.notice.file}></img>
            )}
            {isPdf && (
              <div className="encapsulator">
                <div className="responsive-items">
                  {documentLoading && (
                    <CircularProgress
                      style={{ margin: 'auto', display: 'block' }}
                      color="secondary"
                    />
                  )}
                  <Document
                    loading=""
                    file={noticeData.notice.file}
                    onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber}></Page>
                  </Document>
                </div>
                <Typography
                  align="center"
                  variant="body1"
                  color="textPrimary"
                  style={{ margin: '0px 0px 23px' }}
                  className="description">
                  Page {pageNumber} of {numPages}
                </Typography>
                <Pagination
                  className="responsive-items"
                  onChange={pageChange}
                  count={numPages}
                  color="secondary"
                />
              </div>
            )}
          </Container>
        </div>
      )}
      <Footer />
    </React.Fragment>
  );
};

export default Notice;
