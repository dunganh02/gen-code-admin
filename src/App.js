import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import QrCode from './Components/QrCode';
import Camera from './Components/Camera';
import View3DImage from './Components/View3DImage';
import UploadAndGenerateQR from './Components/UploadAndGenerateQR';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<QrCode />} /> */}
          <Route path="/" exact element={<UploadAndGenerateQR />} />
          
          {/* <Route path="*" element={<Error404 />} /> */}
          <Route path="/camera" element={<Camera />} />
          <Route path="/view-model/:id" element={<View3DImage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
