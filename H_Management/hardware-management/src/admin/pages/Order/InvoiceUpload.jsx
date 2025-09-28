import React, { useState } from 'react';
import styles from './UploadInvoice.module.css';

const UploadInvoice = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setUploadStatus('');
    }
  };

  const handleUpload = () => {
    if (!file) {
      setUploadStatus('❌ Please select a file first.');
      return;
    }

    // Simulate upload delay
    setTimeout(() => {
      setUploadStatus(`✅ "${file.name}" uploaded successfully.`);
      setFile(null);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h2>📤 Upload Purchase Order Invoice</h2>

      <div className={styles.form}>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
        />
        {file && (
          <div className={styles.preview}>
            <strong>Selected File:</strong> {file.name}
            {file.type.startsWith('image/') && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className={styles.image}
              />
            )}
          </div>
        )}

        <button onClick={handleUpload}>Upload</button>
        {uploadStatus && <p className={styles.status}>{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default UploadInvoice;
