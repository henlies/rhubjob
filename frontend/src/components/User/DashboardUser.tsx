import React, { useEffect, useState } from 'react';
import { Col, Layout, Typography } from 'antd';
import { Column, Pie } from '@ant-design/charts';
import { ShowChart } from '../../services/HttpServices';
import { PostChartInterface } from '../../models/Post';

const DashboardUser: React.FC = () => {

  const { Content } = Layout;
  const { Title } = Typography;
  const [chart, setChart] = useState<PostChartInterface[]>([]);

  const getpostchart = async () => {
    let res = await ShowChart();
    if (res) {
      setChart(res);
    }
  };

  const datacolumn = chart;
  const configcolumn = {
    data: datacolumn,
    xField: 'status',
    yField: 'value',
    colorField: 'status',
    label: {
      style: {
        fill: '#FFFFFF',
      },
    },
    height: 404,
    width: 904,
  };
  const datapie = chart;
  const configpie = {
    appendPadding: 10,
    data: datapie,
    angleField: 'value',
    colorField: 'status',
    radius: 0.9,
    height: 404,
    width: 904,
    tooltip: {
      formatter: (datum: any) => `${datum.data.status}: ${datum.data.value}`,
    },
  };

  useEffect(() => {
    getpostchart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ display: 'flex', marginBottom: '24px', marginTop: '64px', marginLeft: '24px', alignItems: 'start' }}>
          <Col span={2}>
          </Col>
          <Col span={20}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3}>ข้อมูลการรับเลี้ยง</Title>
            </div>
          </Col>
          <Col span={2}>
          </Col>
        </div>
        <div style={{ display: 'flex', marginBottom: '24px', marginTop: '64px', marginLeft: '24px', alignItems: 'start' }}>
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <Pie {...configpie} />
            </div>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <Column {...configcolumn} />
            </div>
          </Col>
        </div>
      </Content>
    </Layout>
  );
};

export default DashboardUser;