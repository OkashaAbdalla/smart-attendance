/**
 * Mark Attendance Page
 * Purpose: Capture student face for attendance verification
 */

import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import CameraPreview from '../../components/student/CameraPreview';
import { ROUTES } from '../../utils/constants';

const MarkAttendance = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [error, setError] = useState('');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setError('');
      }
    } catch (err) {
      setError('Unable to access camera. Please grant camera permissions.');
    }
  };

  const captureImage = async () => {
    setCapturing(true);
    // TODO: Capture image from video and send to backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate(ROUTES.ACTIVE_SESSIONS, { state: { message: 'Attendance marked successfully!' } });
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Mark Attendance</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Position your face in the frame and capture</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <CameraPreview videoRef={videoRef} cameraActive={cameraActive} />

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg mb-3 text-sm">
              {error}
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
            <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-1 text-sm">Guidelines:</h3>
            <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-0.5">
              <li>• Ensure good lighting</li>
              <li>• Center your face in the frame</li>
              <li>• Remove glasses if possible</li>
              <li>• Look directly at the camera</li>
            </ul>
          </div>

          <div className="flex gap-3">
            {!cameraActive ? (
              <button onClick={startCamera} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition text-sm">
                Start Camera
              </button>
            ) : (
              <>
                <button onClick={captureImage} disabled={capturing} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 text-sm">
                  {capturing ? 'Processing...' : 'Capture & Submit'}
                </button>
                <button onClick={stopCamera} className="px-5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2.5 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm">
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarkAttendance;
