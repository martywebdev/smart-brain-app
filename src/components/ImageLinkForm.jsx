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
    // <div>
    //   <p className="f3 tc">
    //     This Magic Brain will detect faces in your pictures. Give it a try
    //   </p>
    //   <div className="center">
    //     <div className='form center pa4 br3 shadow-5'>
    //       <input 
    //         type="text" 
    //         className="f4 pa2 w-70 center" 
    //         value={imageUrl} 
    //         onPaste={handlePaste} 
    //         placeholder='Paste Image Url'
    //         onKeyDown={handleKeyDown}
    //       />
    //       <button onClick={() => dispatch(setImageUrl(''))} className="w-30 grow f4 ph3 pv2 dib white bg-light-red">Clear</button>
    //       <button onClick={handleClick} className="w-30 grow f4 ph3 pv2 dib white bg-light-purple">Detect</button>
    //     </div>
    //   </div>
    //   {isValidImage && (
    //     <div className="tc mt4">
    //     <div className="image-container" style={{width: '500px'}}>
    //     <img src={imageUrl} alt="Image preview" className="image" />
    //     {regions && regions.map((region) => (
    //       <div
    //         key={region.id}
    //         className="border"
    //         style={{
    //           top: `${region.region_info.bounding_box.top_row * 100}%`,
    //           left: `${region.region_info.bounding_box.left_col * 100}%`,
    //           width: `${(region.region_info.bounding_box.right_col - region.region_info.bounding_box.left_col) * 100}%`,
    //           height: `${(region.region_info.bounding_box.bottom_row - region.region_info.bounding_box.top_row) * 100}%`,
    //         }}
    //       />
    //     ))}
    //   </div>
    //   </div>
    //   )}
    // </div>

    <>
      <div className="mw5 mw7-ns center pa3 ph5-ns">
        <form className="bg-light-red mw7 center pa4 br2-ns ba b--black-10" onSubmit={handleClick}>
          <fieldset className="cf bn ma0 pa0">
            <legend className="pa0 f5 f4-ns mb3 black-80">Image Detection</legend>
            <div className="cf">
              <label className="clip" for="email-address">Email Address</label>
              <input 
                className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" 
                type="text"
                value={imageUrl} 
                onPaste={handlePaste} 
                placeholder='Paste Image Url'
                onKeyDown={handleKeyDown}
              />
              <input className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="submit" value="Subscribe" />
            </div>
          </fieldset>
        </form>
      </div>

      <section className="mw5 mw7-ns center  pa3 ">
      <img src={imageUrl} alt="Image preview" className="mw-100" />
        
      </section>
    </>

  );
};

export default ImageLinkForm;
