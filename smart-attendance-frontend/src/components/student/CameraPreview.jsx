/**
 * Camera Preview Component
 * Purpose: Reusable camera preview with guidelines
 */

const CameraPreview = ({ videoRef, cameraActive }) => {
  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '4/2.7' }}>
      {!cameraActive ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-400">Camera not active</p>
          </div>
        </div>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <div className="absolute inset-0 border-4 border-green-500/50 rounded-lg pointer-events-none"></div>
        </>
      )}
    </div>
  );
};

export default CameraPreview;
