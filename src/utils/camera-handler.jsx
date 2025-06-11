import { useRef, useState, useEffect } from 'react';

export function CameraHandler(onCapture) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStream = useRef(null);

  const [streamActive, setStreamActive] = useState(false);
  const [error, setError] = useState('');
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const stopCamera = () => {
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((t) => t.stop());
      mediaStream.current = null;
    }
    setStreamActive(false);
    setSelectedDevice(null);
  };

  const openCamera = async () => {
    try {
      const constraints = selectedDevice
        ? { video: { deviceId: { exact: selectedDevice } } }
        : { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStream.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setStreamActive(true);
      setError('');
    } catch (err) {
      setError(`Gagal mengakses kamera: ${err.message}`);
      stopCamera();
    }
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((list) => {
      const videoDevices = list.filter(d => d.kind === 'videoinput');
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDevice(videoDevices[0].deviceId);
      } else {
        setError('Tidak ada kamera yang tersedia');
      }
    });
  }, []);

  const toggleCamera = () => {
    streamActive ? stopCamera() : openCamera();
  };

  const capturePhoto = () => {
    if (!streamActive) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    onCapture(dataUrl);
    stopCamera();
  };

  useEffect(() => {
    const onHide = () => document.hidden && stopCamera();
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('beforeunload', stopCamera);
    window.addEventListener('hashchange', stopCamera);
    return () => {
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('beforeunload', stopCamera);
      window.removeEventListener('hashchange', stopCamera);
      stopCamera();
    };
  }, []);

  return { videoRef, canvasRef, streamActive, error, toggleCamera, capturePhoto, devices, selectedDevice, setSelectedDevice  };
}