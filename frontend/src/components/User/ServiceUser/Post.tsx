import React, { useEffect, useState } from 'react';
import { Card, Avatar, Layout, Button, Modal, Col, Form, Input, Typography, DatePicker, Dropdown, Menu, Space, Tabs } from 'antd';
import {
  CreatePost,
  DeletePost,
  // GetPostStart,
  GetPostbyId,
  UpdatePost,
  // GetPostStartId,
  // CheckPost,
} from '../../../services/HttpServices';
// import { PostInterface, PostsInterface } from '../../models/Post';
import dayjs, { Dayjs } from 'dayjs';
// import MapCombinedComponent from './etc/MapCombined';
// import MapDisplayComponent from './etc/MapDisplay';
// import MapInteractionComponent from './etc/MapInteraction';
import personImage from './etc/person.jpg';
import { RangeValue } from 'rc-picker/lib/interface';
import { DashOutlined } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import { Content } from 'antd/es/layout/layout';

const Post: React.FC = () => {
  const { Title } = Typography;
  const { RangePicker } = DatePicker;
  const role = localStorage.getItem("role")
  const id = localStorage.getItem("id")
  const numId: number | undefined = id !== null ? parseInt(id, 10) : undefined;

  // แสดงทั้งหมด(ผู้ให้บริการ)
  // const [post, setPost] = useState<PostInterface[]>([]);
  // แสดงเฉพาะ(ผู้ใช้บริการ)
  // const [postId, setPostId] = useState<PostInterface[]>([]);

  // const [posts, setPosts] = useState<Partial<PostsInterface>>({});
  // const [poste, setPoste] = useState<Partial<PostsInterface>>({});

  const [postopen, setPostopen] = useState(false);
  const [postedit, setPostedit] = useState(false);

  // const getpoststartId = async () => {
  //   let res = await GetPostStartId(id);
  //   if (res) {
  //     setPostId(res);
  //   }
  // };

  // const getpoststart = async () => {
  //   let res = await GetPostStart();
  //   if (res) {
  //     setPost(res);
  //   }
  // };

  const MenuOptions = (id?: number) => (
    <Menu>
      <Menu.Item key="update" onClick={() => openEdit(id)}>
        อัพเดท
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(id)}>
        ลบ
      </Menu.Item>
    </Menu>
  );

  const openEdit = async (id?: number) => {
    let res = await GetPostbyId(id);
    if (res) {
      // setPoste(res);
    }
    setPostedit(true);
  }

  const handleEdit = async () => {
    let data = {
      // ID: poste.ID,
      // Descript: poste.Descript,
      // Lati: poste.Lati,
      // Long: poste.Long,
      // Start: poste.Start,
      // End: poste.End,
      // Price: poste.Price,
    };
    let res = await UpdatePost(data);
    if (res) {
      setPostedit(!postedit)
      // getpoststartId();
    }
  }

  const handleCancle = async () => {
    setPostedit(!postedit)
    // getpoststartId();
  }

  // const handleAccept = async (id?: number) => {
  //   let data = {
  //     ID: id,
  //     User2ID: numId,
  //   };
  //   let res = await CheckPost(data);
  //   if (res) {
  //     getpoststart();
  //   }
  // }

  const handleDelete = async (id?: number) => {
    await DeletePost(id);
    // getpoststartId();
  }

  const handleMapClick = (lat?: number, lng?: number) => {
    // setPosts(prevPost => {
    //   return { ...prevPost, Lati: lat, Long: lng };
    // });
  };

  const handleRangeDateChange = (dates: RangeValue<Dayjs> | null) => {
    if (dates) {
      const startFormatted = dates[0]?.toDate();
      const endFormatted = dates[1]?.toDate();
      // setPosts(prevPost => {
      //   return { ...prevPost, Start: startFormatted, End: endFormatted };
      // });
    }
  };

  const handleRangeDateChangee = (dates: RangeValue<Dayjs> | null) => {
    if (dates) {
      const startFormatted = dates[0]?.toDate();
      const endFormatted = dates[1]?.toDate();
      // setPoste(prevPost => {
      //   return { ...prevPost, Start: startFormatted, End: endFormatted };
      // });
    }
  };

  useEffect(() => {
    // getpoststartId();
    // getpoststart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async () => {
    let data = {
      // Descript: posts.Descript,
      // Lati: posts.Lati,
      // Long: posts.Long,
      // Start: posts.Start,
      // End: posts.End,
      // Price: posts.Price,
      // User1ID: numId
    };
    let res = await CreatePost(data);
    if (res) {
      setPostopen(!postopen)
      // getpoststartId();
    }
  };

  // if (role === "ผู้ใช้บริการ") {
  //   return (
  //     <Layout style={{ minHeight: '100vh' }}>
  //       <Content style={{ margin: '16px' }}>
  //         <div style={{ display: 'flex', marginBottom: '24px', marginTop: '64px', marginLeft: '24px', alignItems: 'start' }}>
  //           <Button onClick={() => setPostopen(true)}>
  //             สร้างโพส
  //           </Button>
  //         </div>
  //         <Tabs defaultActiveKey="1">
  //           <TabPane tab="โพสงาน" key="1">
  //             {postId.length > 0 ? (
  //               postId.map((postId) => {
  //                 const startDate = postId.Start instanceof Date ? postId.Start : new Date();
  //                 const starts: string = startDate.toLocaleDateString(undefined, {
  //                   day: 'numeric',
  //                   month: '2-digit',
  //                   year: 'numeric',
  //                 }).replace(/\//g, '-');

  //                 const part = starts.split('-');
  //                 const start = part[1] + '-' + part[0] + '-' + part[2];

  //                 const endDate = postId.End instanceof Date ? postId.End : new Date();
  //                 const ends: string = endDate.toLocaleDateString(undefined, {
  //                   day: 'numeric',
  //                   month: '2-digit',
  //                   year: 'numeric',
  //                 }).replace(/\//g, '-');
  //                 const parts = ends.split('-');
  //                 const end = parts[1] + '-' + parts[0] + '-' + parts[2];

  //                 return (
  //                   <Card style={{ marginTop: '8px' }}>
  //                     <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
  //                       <div style={{ margin: '12px' }}>
  //                         <Avatar size={'large'} src={personImage} />
  //                       </div>
  //                       <div>
  //                         <Input addonBefore="สถานะ" value={`${postId.Status?.Name}`} />
  //                       </div>
  //                       <div>
  //                         <Dropdown overlay={() => MenuOptions(postId.ID)} trigger={['click']}>
  //                           <Space>
  //                             <DashOutlined />
  //                           </Space>
  //                         </Dropdown>
  //                       </div>
  //                     </div>
  //                     <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
  //                       <Col span={12}>
  //                         <div style={{ margin: '24px' }}>
  //                           <Input value="รายละเอียดการใช้บริการ" />
  //                           <div style={{ marginBottom: '12px', marginTop: '12px' }}>
  //                             {/* <MapDisplayComponent initialLat={postId.Lati} initialLng={postId.Long} imageUrl="https://e7.pngegg.com/pngimages/457/630/png-clipart-location-logo-location-computer-icons-symbol-location-miscellaneous-angle-thumbnail.png" /> */}
  //                           </div>
  //                           <div>
  //                             <Input addonBefore="คำแนะนำ" value={`${postId.Descript}`} />
  //                             <Input addonBefore="วันที่" value={`${start} ถึงวันที่ ${end}`} />
  //                             <Input addonBefore="ราคา" value={`${postId.Price}`} />
  //                           </div>
  //                         </div>
  //                       </Col>
  //                       <Col span={12}>
  //                         <div style={{ margin: '24px' }}>
  //                           <Input value="รายละเอียดสัตว์เลี้ยง" />
  //                         </div>
  //                       </Col>
  //                     </div>
  //                   </Card>
  //                 );
  //               })
  //             ) : (
  //               <div style={{ textAlign: 'center', marginTop: '100px' }}>
  //                 <h2>ยังไม่มีโพสสำหรับการรับเลี้ยงของคุณ</h2>
  //               </div>
  //             )}

  //             <Modal
  //               centered
  //               open={postopen}
  //               onCancel={() => {
  //                 setPostopen(false);
  //               }}
  //               footer={null}
  //             >
  //               <Col>
  //                 <div style={{ textAlign: 'center' }}>
  //                   <Title level={2}>สร้างโพส</Title>
  //                 </div>
  //                 <Form
  //                   initialValues={{ remember: true }}
  //                   style={{ maxWidth: '300px', margin: 'auto' }}
  //                 >
  //                   <Input
  //                     placeholder="ข้อมูล"
  //                     onChange={(e) => {
  //                       setPosts({ ...posts, Descript: e.target.value });
  //                     }}
  //                   />
  //                   <div style={{ marginTop: '10px' }}>
  //                     <RangePicker
  //                       placeholder={['วันที่เริ่มต้น', 'วันที่สิ้นสุด']}
  //                       onChange={(date) => handleRangeDateChange(date)}
  //                     />
  //                   </div>
  //                   <div style={{ marginTop: '10px' }}>
  //                     {/* <MapInteractionComponent onMapClick={handleMapClick} /> */}
  //                   </div>
  //                   <div style={{ display: "flex", gap: "10px", marginTop: '10px' }}>
  //                     <Input
  //                       disabled
  //                       placeholder="latitude"
  //                       value={posts.Lati} />
  //                     <Input
  //                       disabled
  //                       placeholder="longtitude"
  //                       value={posts.Long} />
  //                   </div>
  //                   <Input
  //                     style={{ marginTop: '10px' }}
  //                     placeholder="ราคา"
  //                     onChange={(e) => {
  //                       const price = parseInt(e.target.value);
  //                       setPosts({ ...posts, Price: price });
  //                     }}
  //                   />
  //                   <Button
  //                     style={{ marginTop: '10px', width: '100%' }}
  //                     type="primary"
  //                     htmlType="submit"
  //                     onClick={submit}
  //                   >
  //                     โพส
  //                   </Button>
  //                 </Form>
  //               </Col>
  //             </Modal>

  //             <Modal
  //               centered
  //               open={postedit}
  //               onCancel={() => {
  //                 setPostedit(false);
  //               }}
  //               footer={null}
  //             >
  //               <Col>
  //                 <div style={{ textAlign: 'center' }}>
  //                   <Title level={2}>แก้ไข</Title>
  //                 </div>
  //                 <Form
  //                   initialValues={{ remember: true }}
  //                   style={{ maxWidth: '300px', margin: 'auto' }}
  //                 >
  //                   <Input
  //                     placeholder="ข้อมูล"
  //                     value={poste.Descript}
  //                     onChange={(e) => {
  //                       setPoste({ ...poste, Descript: e.target.value });
  //                     }}
  //                   />
  //                   <div style={{ marginTop: '10px' }}>
  //                     <RangePicker
  //                       placeholder={['วันที่เริ่มต้น', 'วันที่สิ้นสุด']}
  //                       value={[
  //                         poste.Start ? dayjs(poste.Start) : null,
  //                         poste.End ? dayjs(poste.End) : null,
  //                       ]}
  //                       onChange={(date) => handleRangeDateChangee(date)}
  //                     />
  //                   </div>
  //                   <div style={{ marginTop: '10px' }}>
  //                     {/* <MapCombinedComponent onMapClick={handleMapClick}
  //                       initialLat={poste.Lati} initialLng={poste.Long}
  //                       imageUrl="https://e7.pngegg.com/pngimages/457/630/png-clipart-location-logo-location-computer-icons-symbol-location-miscellaneous-angle-thumbnail.png"
  //                     /> */}
  //                   </div>
  //                   <div style={{ display: "flex", gap: "10px", marginTop: '10px' }}>
  //                     <Input
  //                       disabled
  //                       placeholder="latitude"
  //                       value={poste.Lati} />
  //                     <Input
  //                       disabled
  //                       placeholder="longtitude"
  //                       value={poste.Long} />
  //                   </div>
  //                   <Input
  //                     style={{ marginTop: '10px' }}
  //                     placeholder="ราคา"
  //                     value={poste.Price}
  //                     onChange={(e) => {
  //                       const price = parseInt(e.target.value);
  //                       setPoste({ ...poste, Price: price });
  //                     }}
  //                   />
  //                   <div>
  //                     <Button
  //                       style={{ marginTop: '10px', width: '100%' }}
  //                       type="primary"
  //                       htmlType="submit"
  //                       onClick={handleEdit}
  //                     >
  //                       แก้ไข
  //                     </Button>
  //                     <Button
  //                       style={{ marginTop: '10px', width: '100%' }}
  //                       type="primary" danger
  //                       htmlType="submit"
  //                       onClick={handleCancle}
  //                     >
  //                       ยกเลิก
  //                     </Button>
  //                   </div>
  //                 </Form>
  //               </Col>
  //             </Modal>
  //           </TabPane>

  //           <TabPane tab="เช็คการรับงาน" key="2">
  //             <Layout style={{ minHeight: '100vh' }}>
  //               <Content style={{ margin: '16px' }}>
  //                 <Card style={{ marginTop: '8px' }}>
  //                   <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>

  //                   </div>
  //                 </Card>
  //               </Content>
  //             </Layout>
  //           </TabPane>
  //         </Tabs>
  //       </Content >
  //     </Layout >
  //   );
  // };

  // return (
  //   <Layout style={{ minHeight: '100vh' }}>
  //     <Content style={{ margin: '16px' }}>
  //       {post.length > 0 ? (
  //         post.map((post) => {
  //           const startDate = post.Start instanceof Date ? post.Start : new Date();
  //           const starts: string = startDate.toLocaleDateString(undefined, {
  //             day: 'numeric',
  //             month: '2-digit',
  //             year: 'numeric',
  //           }).replace(/\//g, '-');

  //           const part = starts.split('-');
  //           const start = part[1] + '-' + part[0] + '-' + part[2];

  //           const endDate = post.End instanceof Date ? post.End : new Date();
  //           const ends: string = endDate.toLocaleDateString(undefined, {
  //             day: 'numeric',
  //             month: '2-digit',
  //             year: 'numeric',
  //           }).replace(/\//g, '-');
  //           const parts = ends.split('-');
  //           const end = parts[1] + '-' + parts[0] + '-' + parts[2];

  //           return (
  //             <Card style={{ marginTop: '72px' }}>
  //               <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
  //                 <div style={{ margin: '12px' }}>
  //                   <Avatar size={'large'} src={personImage} />
  //                 </div>
  //                 <div>
  //                   <Input addonBefore="สถานะ" value={`${post.Status?.Name}`} />
  //                 </div>
  //                 {/* <div>
  //                   <Button type="primary" onClick={() => handleAccept(post.ID)} >
  //                     รับงาน
  //                   </Button>
  //                 </div> */}
  //               </div>
  //               <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
  //                 <Col span={12}>
  //                   <div style={{ margin: '24px' }}>
  //                     <Input value="รายละเอียดการใช้บริการ" />
  //                     <div style={{ marginBottom: '12px', marginTop: '12px' }}>
  //                       {/* <MapDisplayComponent initialLat={post.Lati} initialLng={post.Long} imageUrl="https://e7.pngegg.com/pngimages/457/630/png-clipart-location-logo-location-computer-icons-symbol-location-miscellaneous-angle-thumbnail.png" /> */}
  //                     </div>
  //                     <div>
  //                       <Input addonBefore="คำแนะนำ" value={`${post.Descript}`} />
  //                       <Input addonBefore="วันที่" value={`${start} ถึงวันที่ ${end}`} />
  //                       <Input addonBefore="ราคา" value={`${post.Price}`} />
  //                     </div>
  //                   </div>
  //                 </Col>
  //                 <Col span={12}>
  //                   <div style={{ margin: '24px' }}>
  //                     <Input value="รายละเอียดสัตว์เลี้ยง" />
  //                   </div>
  //                 </Col>
  //               </div>
  //             </Card>
  //           );
  //         })
  //       ) : (
  //         <div style={{ textAlign: 'center', marginTop: '100px' }}>
  //           <h2>ยังไม่มีโพสที่คุณสามารถรับงานได้</h2>
  //         </div>
  //       )}
  //     </Content>
  //   </Layout>
  // );
  return (
    <>
      test
    </>
  )
};

export default Post;