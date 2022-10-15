import React from 'react';
import { Layout } from '../home-page/layout';
import { Settings } from '../common/Settings';
import Room from '../home-page/Room';
import { useAppSelector } from '../../app/hooks/redux';

const SettingsPage = () => {
  const { isUserInRoom } = useAppSelector(state => state.room);

  return (
    <Layout>
      <Settings />
      {isUserInRoom && <Room />}
    </Layout>
  );
};

export default SettingsPage;
