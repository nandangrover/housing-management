import React, { useState, useEffect } from 'react';
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Divider,
} from '@material-ui/core';

import { StyledLink as Link } from '../Link/index';

const Sidebar: any = ({
  isOpened = true,
  onClose,
  disableSwipeToOpen = false,
  swipeAreaWidth = 15,
}: any) => {
  const [isOpen, setOpen] = useState(isOpened);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    onClose(false);
    setOpen(false);
  };

  const listItems: any = [
    { text: 'Home', icon: 'home', link: '/home' },
    { text: 'Notices', icon: 'call_to_action', link: '/notices' },
    { text: 'Billing', icon: 'monetization_on', link: '/billing' },
    <Divider light style={{ margin: '5px 0 5px 45px' }} />,
    { text: 'Update', icon: 'perm_identity', link: '/profile' },
    { text: 'Logout', icon: 'power_settings_new', link: '/logout' },
  ];

  useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={() => handleClose()}
      onOpen={() => handleOpen()}
      swipeAreaWidth={swipeAreaWidth}
      disableSwipeToOpen={disableSwipeToOpen}>
      <div
        tabIndex={0}
        role="button"
        style={{
          width: '275px',
          padding: '15px 0',
        }}>
        <List style={{ padding: '15px 0' }}>
          {listItems.map((element: any, index: number) => {
            if (React.isValidElement(element)) {
              return <element.type {...element.props} key={index} />;
            }
            const { text, icon, link } = element;
            return (
              <Link key={index} to={link} style={{ width: '100%' }}>
                <ListItem
                  button
                  key={text}
                  style={{
                    width: 'calc(100% - 15px)',
                    borderTopRightRadius: '30px',
                    borderBottomRightRadius: '30px',
                  }}>
                  <ListItemIcon>
                    <Icon fontSize="small">{icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      variant: 'body2',
                      color: 'textPrimary',
                    }}
                    style={{ paddingLeft: '0', fontSize: '12px' }}
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default Sidebar;
