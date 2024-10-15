import React, { useState } from 'react';
import { Container, Card, CardContent, Grid2, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#00897b',
    color: 'white',
    padding: 10,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20
  }
}));

function QrCode() {
  const classes = useStyles();
  const [url, setUrl] = useState('');
  const [qrImage, setQRImage] = useState('');

  const generateQrcode = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:5000/api/scanQrcode', {url:url})
    .then(response =>{
      console.log(response)
      setQRImage(response.data)
    })
  }

  return (
    <div>
      <Container className={classes.container}>
        <Card>
          <h2 className={classes.title}>Generate and Download QR code</h2>
          <CardContent>
              <Grid2 item xl={4} lg={4} md={6} sm={12} xs={12}>
                <TextField
                  label="Enter text here"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  // fullWidth
                />
                <Button
                  variant='contained'  // Sửa thành 'contained'
                  className={classes.btn}
                  color='primary'
                  onClick={generateQrcode}
                  // fullWidth
                >
                  Generate QR Code
                </Button>
              </Grid2>
              <Grid2 item xl={4} lg={4} md={6} sm={12} xs={12}>
                  {
                    url.length > 0 && qrImage ? (
                      <>
                        <a href="#"><img src={qrImage} alt="qrimage" /></a>
                      </>
                    ) : null
                  }
              </Grid2>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default QrCode;
