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
    // TODO: Capture image from video and send to backend with sessionId
    console.log('Marking attendance for session:', sessionId);
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
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center h-full">
        <div className="text-center mb-2">
          <h1 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">Face Recognition Attendance</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs">Secure biometric verification</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg mb-2 w-full max-w-md">
          <CameraPreview videoRef={videoRef} cameraActive={cameraActive} />

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-2 py-1.5 rounded-lg mb-2 flex items-start text-xs">
              <svg className="w-3 h-3 mr-1.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-2">
            {!cameraActive ? (
              <button onClick={startCamera} className="flex-1 bg-green-600 text-white py-1.5 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-1.5 shadow-lg hover:shadow-xl text-xs">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Activate Camera</span>
              </button>
            ) : (
              <>
                <button onClick={captureImage} disabled={capturing} className="flex-1 bg-green-600 text-white py-1.5 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-1.5 shadow-lg hover:shadow-xl disabled:hover:shadow-lg text-xs">
                  {capturing ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Capture & Submit</span>
                    </>
                  )}
                </button>
                <button onClick={stopCamera} className="px-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-1.5 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 shadow hover:shadow-md text-xs">
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1.5 w-full max-w-md">
          {[
            { icon: '💡', text: 'Good Light' },
            { icon: '🎯', text: 'Center Face' },
            { icon: '👓', text: 'No Glasses' },
            { icon: '👀', text: 'Look Direct' },
            { icon: '😐', text: 'Neutral' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-1.5 text-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/50 dark:hover:shadow-blue-500/30 hover:scale-105 hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-0.5 cursor-pointer">
              <div className="text-base mb-0.5">{item.icon}</div>
              <p className="text-[10px] text-blue-900 dark:text-blue-300 font-medium leading-tight">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarkAttendance;
