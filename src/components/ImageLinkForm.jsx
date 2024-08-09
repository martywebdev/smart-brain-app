import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegions, fetchFaceDetection } from '../store/faceDetectionSlice'
import { isBase64, isValidImageUrl } from '../helper/validation';

const useImageValidation = (imageUrl, setIsValidImage) => {
  useEffect(() => {
    const validateImage = async () => {
      if (isBase64(imageUrl)) {
        setIsValidImage(true);
      } else if (await isValidImageUrl(imageUrl)) {
        setIsValidImage(true);
      } else {
        setIsValidImage(false);
      }
    };

    validateImage();
  }, [imageUrl, setIsValidImage]);
};

const useRegionsClearance = (imageUrl, dispatch) => {
  useEffect(() => {
    if (imageUrl !== '') {
      dispatch(clearRegions());
    }
  }, [imageUrl, dispatch]);
};

const useFaceDetectionAlert = (regions) => {
  useEffect(() => {
    if (regions === undefined) {
      alert('No Face Detected');
    }
  }, [regions]);
};

const ImageLinkForm = () => {

  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('')
  const regions = useSelector((state) => state.faceDetection.regions);
  const status = useSelector((state) => state.faceDetection.status);

  const [isValidImage, setIsValidImage] = useState(false);

  // Custom hooks
  useImageValidation(imageUrl, setIsValidImage);
  useRegionsClearance(imageUrl, dispatch);
  useFaceDetectionAlert(regions);

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

  const handleClick = async (e) => {
    e.preventDefault()
    if (isBase64(imageUrl)) {
      dispatch(fetchFaceDetection({ base64: imageUrl.replace(/^data:image\/[a-zA-Z]+;base64,/, '') }));
    } else if (await isValidImageUrl(imageUrl)) {
      dispatch(fetchFaceDetection({ url: imageUrl }));
    } else {
      console.error('Invalid image URL or Base64 data');
      alert('Invalid image URL or Base64 data')
    }
  };

  const handlePaste = e => {
    const pastedValue = e.clipboardData.getData('text');
    setImageUrl(pastedValue)
    e.preventDefault(); 
  }

  const handleChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleKeyDown = (e) => {
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 
      'Tab', 'Enter', 'Escape', 
      'Control', 'Shift', 'Meta', 'Alt'
    ];
    if (
      allowedKeys.includes(e.key) ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return; 
    }    
    e.preventDefault();
  };

  return (
    <>
      <h1 className="f1 lh-title tc">Paste Your Image URL</h1>
      <div className="flex flex-column flex-row-ns items-center bg-light-red pa4 br2-ns ba b--black-10 w-75 center">
        <input
          type="text" 
          className="input-reset ba b--black-20 pa2 mb2 db w-100" 
          value={imageUrl} 
          onPaste={handlePaste} 
          placeholder='Paste Image Url'
          onKeyDown={handleKeyDown}           
          onChange={handleChange}     
          />
        <button onClick={() => setImageUrl('')} className="f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-red ml2">Clear</button>
        <button onClick={handleClick} className="f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-blue ml2">Detect</button>
      </div>
      {isValidImage && (
        <div className='mt4 w-40-ns w-100 center image-container bg-black'>              
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
