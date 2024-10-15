import React, { useEffect, useState } from 'react';
import ThreeDModel from './ThreeDModel'; // Component để hiển thị ảnh 3D
import { API_ENDPOINT_SERVER, URL_ENDPOINT_SERVER } from '../constants/Constants';
import { useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
} from '@mui/material';

const View3DImage = ({ match }) => {
  const [modelUrl, setModelUrl] = useState(null);
  let { id } = useParams();

  useEffect(() => {

    // Gọi API để lấy dữ liệu ảnh 3D từ server
    const fetch3DImage = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT_SERVER}/get-content/${id}`);
        debugger
        const data = await response.json();
        console.log('data', data)
        setModelUrl(URL_ENDPOINT_SERVER + data.content.modelPath); // URL của ảnh 3D
      } catch (error) {
        console.error("Lỗi khi lấy ảnh 3D:", error);
      }
    };

    fetch3DImage();
  }, [match]);

  return (
    <Container>
      {console.log(modelUrl)}
      {modelUrl ? <ThreeDModel modelUrl={modelUrl} /> : <TextField>Đang tải ảnh 3D...</TextField>}
    </Container>
  );
};

export default View3DImage;
