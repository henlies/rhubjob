import React, { useEffect, useState } from 'react';
import { Button, Col, Layout, Table, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { ShowNotifyCheckHistoryByID, ShowNotifyHistoryByID } from '../../../services/HttpServices';
import { NotifyInterface } from '../../../models/Notify';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';

const HistoryP: React.FC = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const { postId } = useParams();
  const postIDparams: number | undefined = postId ? parseInt(postId, 10) : undefined;

  const [notify, setNotify] = useState<NotifyInterface[]>([]);
  const [notifycheck, setNotifyCheck] = useState<Partial<NotifyInterface>>({});

  const intstatus = notifycheck.Post?.Status?.ID || 0;
  const targetLink = ((intstatus > 3) || intstatus === 0) ? '/post' : `/post-status/${postIDparams}`;
  
  const getnotify = async () => {
    let res = await ShowNotifyHistoryByID(postIDparams);
    if (res) {
      setNotify(res);
    }
    getchecknotify();
  };

  const getchecknotify = async () => {
    let res = await ShowNotifyCheckHistoryByID(postIDparams);
    if (res) {
      setNotifyCheck(res);
    }
  };

  const columnnotify: ColumnsType<NotifyInterface> = [
    {
      title: 'เวลาที่แจ้ง',
      dataIndex: 'Date',
      width: '10%',
      align: "center",
      render: (date: Date) => date && moment(date).toISOString() !== "0001-01-01T00:00:00.000Z" ?
        moment(date).format('DD/MM/YYYY') : null,
    },
    {
      title: 'สุขภา่พ',
      dataIndex: 'Health',
      width: '10%',
      align: "center",
    },
    {
      title: 'ความสะอาด',
      dataIndex: 'Clean',
      width: '10%',
      align: "center",
    },
    {
      title: 'ข้อความอื่นๆ',
      dataIndex: 'Text',
      width: '10%',
      align: "center",
    },
  ];

  useEffect(() => {
    getnotify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ padding: 12, background: '#fff', textAlign: 'center', borderRadius: 8, }}>
          <div style={{ display: 'flex', marginBottom: '24px', marginTop: '64px', alignItems: 'center', justifyContent: 'center' }}>
            <Col span={4}>
              <div style={{ textAlign: 'center' }}>
                {/* <Link to={`/post-status/${postIDparams}`}> */}
                <Link to={targetLink}>
                  <Button style={{ background: '#999999', color: 'white' }}>
                    กลับ
                  </Button>
                </Link>
              </div>
            </Col>
            <Col span={18}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>ประวัติความคืบหน้า</Title>
              </div>
            </Col>
            <Col span={4}>
            </Col>
          </div>
          <Table columns={columnnotify} dataSource={notify} />
        </div>
      </Content>
    </Layout>
  );
};

export default HistoryP;