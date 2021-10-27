import React from 'react';
import { useState } from 'react';
import ProgressBar from './ProgressBar';

// import { firebaseApp } from '../firebase/config';

const UploadForm = () => {
  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    const selected = e.target.files[0];
    if (selected && types.includes(selected.type) && selected.size < 5000000) {
      setFile(selected);
      setError(null);
    } else {
      setFile(null);
      setError('Please select an image file (png or jpeg)');
    }
  };

  // console.log(file);

  return (
    <form>
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
