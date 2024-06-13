import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { GetNotifyNow } from '../../../services/HttpServices';
import { NotifyInterface } from '../../../models/Notify';

const TrackStatus: React.FC = () => {
  const { Content } = Layout;
  const id = localStorage.getItem("id")
  const numId: number | undefined = id !== null ? parseInt(id, 10) : undefined;
  const [notify, setNotify] = useState<NotifyInterface[]>([]);

  const getnotify = async () => {
    let res = await GetNotifyNow(numId);
    if (res) {
      setNotify(res);
    }
  };

  console.log(notify);  
  
  useEffect(() => {
    getnotify();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>

      </Content>
    </Layout>
  );
};

export default TrackStatus;