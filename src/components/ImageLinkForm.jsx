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
  const handleOnChange = (e) => {
    dispatch(setImageUrl(e.target.value));
  };

  const handleClick = async () => {
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

  

  return (
    <div>
      <p className="f3 tc">
        This Magic Brain will detect faces in your pictures. Give it a try
      </p>
      <div className="center">
        <div className='form center pa4 br3 shadow-5'>
          <input type="text" className="f4 pa2 w-70 center" onChange={handleOnChange} />
          <button onClick={handleClick} className="w-30 grow f4 ph3 pv2 dib white bg-light-purple">Detect</button>
        </div>
      </div>
      {isValidImage && (
        <div className="center mt4">
          <img src={imageUrl} alt="Image preview" className="br3 shadow-5" style={{ width: '500px', height: 'auto' }} />
        </div>
      )}
      {/* {status === 'succeeded' && regions.map((region, index) => (
        <div key={index}>
          <p>BBox: {JSON.stringify(region.region_info.bounding_box)}</p>
          {region.data.concepts.map((concept, i) => (
            <p key={i}>{concept.name}: {concept.value.toFixed(4)}</p>
          ))}
        </div>
      ))} */}
    </div>
  );
};

export default ImageLinkForm;
