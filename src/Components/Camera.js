import React, { useRef, useEffect } from 'react';

const Camera = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                // const stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: {exact: 'environment'}} });
                const stream = await navigator.mediaDevices.getUserMedia({ video: true});
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error('Có lỗi xảy ra khi truy cập camera:', error);
            }
        };

        startCamera();

        // Dọn dẹp khi component unmount
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Bật Camera</h1>
            <video ref={videoRef} autoPlay style={{ border: '2px solid #333', width: '100%', maxWidth: '600px' }} />
        </div>
    );
};

export default Camera;