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

  const handleClick = async (e) => {
    e.preventDefault()
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
    <>
      <h1 class="f1 lh-title tc">Paste Your Image URL</h1>
      <div className="flex flex-column flex-row-ns items-center bg-light-red pa4 br2-ns ba b--black-10 w-75 center">
        <input
          type="text" 
          className="input-reset ba b--black-20 pa2 mb2 db w-100" 
          value={imageUrl} 
          onPaste={handlePaste} 
          placeholder='Paste Image Url'
          onKeyDown={handleKeyDown}                
          />
        <button onClick={() => dispatch(setImageUrl(''))} className="f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-red ml2">Clear</button>
        <button onClick={handleClick} className="f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-blue ml2">Detect</button>
      </div>
      {isValidImage && (
        <div className='mt4 w-40-ns w-100 center image-container'>              
          <img src={imageUrl} className="w-100" alt="night sky over water" ></img>
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
      )}
    </>
  );
};

export default ImageLinkForm;
