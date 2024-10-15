import React, { useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { API_ENDPOINT_SERVER, URL_CLIENT } from '../constants/Constants';
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
} from '@mui/material';

const UploadAndGenerateQR = () => {
  const [userId, setUserId] = useState('');
  const [text, setText] = useState('');
  const [scale, setScale] = useState({ x: 1, y: 1, z: 1 });
  const [files, setFiles] = useState([]);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const url = API_ENDPOINT_SERVER;

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const filesArray = Array.from(selectedFiles); // Chuyển đổi thành mảng

    setFiles(filesArray); // Lưu các file vào state

    // Duyệt qua các file và in tên file ra console
    filesArray.forEach((file) => {
      console.log(file.name); // Xử lý từng file
    });
    
  };


  const handleGenerateQR = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('text', text);
    formData.append('scale', JSON.stringify(scale));
   // formData.append('files', file); // Sử dụng file đã lưu trong state
    console.log(formData);
     // Gắn tất cả các file từ thư mục
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
  debugger
    try {

      const response = await axios.post(`${url}/save-content`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      debugger
      console.log("response: " + JSON.stringify(response));
      const qrUrl = `${URL_CLIENT}/view-model/${response.data.result._id}`;
      console.log("qrUrl: " + qrUrl);
      setQrCodeUrl(qrUrl); // URL mã QR trả về từ server
    } catch (error) {
      console.error('Lỗi khi upload và tạo mã QR:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tải lên mô hình 3D và tạo mã QR
      </Typography>
      <form onSubmit={handleGenerateQR}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Text mô tả"
              value={text}
              onChange={(e) => setText(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Tỷ lệ (scale):</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="X"
                  type="number"
                  value={scale.x}
                  onChange={(e) => setScale({ ...scale, x: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Y"
                  type="number"
                  value={scale.y}
                  onChange={(e) => setScale({ ...scale, y: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Z"
                  type="number"
                  value={scale.z}
                  onChange={(e) => setScale({ ...scale, z: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              webkitdirectory="true"
              onChange={handleFileChange}
              required
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="contained" component="span">
                Tải lên mô hình 3D
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Tạo mã QR
            </Button>
          </Grid>
        </Grid>
      </form>

      {qrCodeUrl && (
        <div>
          <Typography variant="h6" gutterBottom>
            Mã QR của bạn
          </Typography>
          <QRCodeCanvas value={qrCodeUrl} />
        </div>
      )}
    </Container>
  );
};

export default UploadAndGenerateQR;
