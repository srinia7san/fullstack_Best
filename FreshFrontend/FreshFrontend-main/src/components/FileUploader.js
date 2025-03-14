import React, { useRef, useState } from 'react';
import { uploadContractPdf } from '../services/api';
import './FileUploader.css';

function FileUploader({ onFileLoad }) {
  const fileInputRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState({
    isUploading: false,
    message: '',
    type: '' // 'success', 'error', or 'info'
  });
  const [uploadedItems, setUploadedItems] = useState([]);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file, updateStatus = true) => {
    if (file.type !== 'application/pdf') {
      if (updateStatus) {
        setUploadStatus({
          isUploading: false,
          message: 'Please upload a PDF file',
          type: 'error'
        });
      }
      return false;
    }

    if (updateStatus) {
      setUploadStatus({
        isUploading: true,
        message: 'Processing file...',
        type: 'info'
      });
    }

    try {
      const analysisResult = await uploadContractPdf(file);
      onFileLoad(analysisResult);
      
      if (updateStatus) {
        setUploadStatus({
          isUploading: false,
          message: 'File processed successfully',
          type: 'success'
        });
      }
      
      return analysisResult;
    } catch (error) {
      if (updateStatus) {
        setUploadStatus({
          isUploading: false,
          message: 'Error processing the PDF. Please try again.',
          type: 'error'
        });
      }
      throw error;
    }
  };

  const clearStatus = () => {
    setUploadStatus({
      isUploading: false,
      message: '',
      type: ''
    });
  };

  const clearUploadedItems = () => {
    setUploadedItems([]);
  };

  return (
    <div className="file-uploader">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      
      <div className="upload-buttons">
        <button className="upload-btn" onClick={handleFileButtonClick}>
          <span className="plus-icon">+</span>
          <span>Upload File</span>
        </button>
      </div>
      
      {uploadStatus.message && (
        <div className={`upload-status ${uploadStatus.type}`}>
          {uploadStatus.isUploading && <div className="loader"></div>}
          <p>{uploadStatus.message}</p>
          {!uploadStatus.isUploading && (
            <button className="close-btn" onClick={clearStatus}>×</button>
          )}
        </div>
      )}
      
      {uploadedItems.length > 0 && (
        <div className="uploaded-items-container">
          <div className="uploaded-items-header">
            <h3>Uploaded Items ({uploadedItems.length})</h3>
            <button className="clear-btn" onClick={clearUploadedItems}>Clear All</button>
          </div>
          <div className="uploaded-items-list">
            {uploadedItems.map((item, index) => (
              <div 
                key={index} 
                className={`uploaded-item ${item.status}`}
              >
                <div className="item-icon">
                  {item.status === 'success' && '✓'}
                  {item.status === 'error' && '⚠️'}
                  {item.status === 'skipped' && '⚠️'}
                </div>
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  {item.error && <div className="item-error">{item.error}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploader;