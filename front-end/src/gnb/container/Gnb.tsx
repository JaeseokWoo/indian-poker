import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function Gnb() {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      const result = await fetch('http://localhost:3001/login');
      const user = await result.json();
      setUserId(user.id);
    };

    getUserId();
  }, []);

  return (
    <>
      <Row>
        <Col span={6}>Indian-Pocker</Col>
        <Col span={6} offset={12}>
          <UserOutlined /> {userId}
        </Col>
      </Row>
    </>
  );
}
