import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImageUrl, fetchFaceDetection } from '../store/faceDetectionSlice'
import { isBase64, isValidImageUrl } from '../helper/validation';

const ImageLinkForm = () => {
  const dispatch = useDispatch();
  const imageUrl = useSelector((state) => state.faceDetection.imageUrl);
  const regions = useSelector((state) => state.faceDetection.regions);
  const status = useSelector((state) => state.faceDetection.status);

  const [isValidImage, setIsValidImage] = useState(false);

  useEffect(() => {
    validateImage(imageUrl);
  }, [imageUrl]);

  const validateImage = async (url) => {
    if (isBase64(url)) {
      setIsValidImage(true);
    } else if (await isValidImageUrl(url)) {
      setIsValidImage(true);
    } else {
      setIsValidImage(false);
    }
  };

  useEffect(() => {
    if (regions === undefined) {      
      alert('No Face Detected')
    }
  }, [regions])

  const handleClick = async () => {
    if (regions === undefined) {      
      alert('No Face Detected')
    }
    if (isBase64(imageUrl)) {
      console.log('Base64 valid');
      dispatch(fetchFaceDetection({ base64: imageUrl.replace(/^data:image\/[a-zA-Z]+;base64,/, '') }));
    } else if (await isValidImageUrl(imageUrl)) {
      console.log('Image URL valid');
      dispatch(fetchFaceDetection({ url: imageUrl }));
    } else {
      console.error('Invalid image URL or Base64 data');
      alert('Invalid image URL or Base64 data')
    }
  };

  const handlePaste = e => {
    const pastedValue = e.clipboardData.getData('text');
    dispatch(setImageUrl(pastedValue))
    e.preventDefault(); 
  }


  const handleKeyDown = (e) => {
    // Prevent typing but allow navigation keys and backspace
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Control', 'Shift', 'Meta'];
    
    if (!allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <p className="f3 tc">
        This Magic Brain will detect faces in your pictures. Give it a try
      </p>
      <div className="center">
        <div className='form center pa4 br3 shadow-5'>
          <input 
            type="text" 
            className="f4 pa2 w-70 center" 
            value={imageUrl} 
            onPaste={handlePaste} 
            placeholder='Paste Image Url'
            onKeyDown={handleKeyDown}
          />
          <button onClick={() => dispatch(setImageUrl(''))} className="w-30 grow f4 ph3 pv2 dib white bg-light-red">Clear</button>
          <button onClick={handleClick} className="w-30 grow f4 ph3 pv2 dib white bg-light-purple">Detect</button>
        </div>
      </div>
      {isValidImage && (
        <div className="tc mt4">
        <div class="image-container" style={{width: '500px'}}>
        <img src={imageUrl} alt="Image preview" className="image" />
        {regions && regions.map((region) => (
          <div
            key={region.id}
            className="border"
            style={{
              top: `${region.region_info.bounding_box.top_row * 100}%`,
              left: `${region.region_info.bounding_box.left_col * 100}%`,
              width: `${(region.region_info.bounding_box.right_col - region.region_info.bounding_box.left_col) * 100}%`,
              height: `${(region.region_info.bounding_box.bottom_row - region.region_info.bounding_box.top_row) * 100}%`,
            }}
          />
        ))}
      </div>
      </div>
      )}
    </div>
  );
};

export default ImageLinkForm;
