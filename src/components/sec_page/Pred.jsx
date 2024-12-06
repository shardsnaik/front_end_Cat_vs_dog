import React, { useState } from 'react'
import './pred_page.css'
import { dockerlink, githublink, flasklink } from './links'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCat } from '@fortawesome/free-solid-svg-icons'
import { faDog } from '@fortawesome/free-solid-svg-icons'

import {ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Pred = () => {


  const [selectfile, setselectedFile] = useState(null)
  const [prediction, setprediction] = useState(null)
  const [loading, setloading] = useState(false)
  const [showimage, setshowimage] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

const tostmes =()=>{
    toast.info('Backend API not curently available!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      } )
  }
  const options = () => {
    toast.warn(`Important Notice:
       Backend Server Issues

We are currently experiencing issues with our backend server hosted on Render due to the large size of our model. To ensure uninterrupted service, we kindly request your cooperation in using our Docker public image. You can find the Docker image and additional details on our GitHub repository.




Thank you for your understanding and cooperation.`, {
      position: "top-center",
      autoClose: 15000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };


  const handlefilechange = (event) =>{
    console.log('clicked upload')
    const file = event.target.files[0];
    if(file){
    setselectedFile(file)
   
  }
}

  const handlepred = async () =>{
    if (!selectfile) {
      alert('please upload an image first..')
      return;

    }


    setshowimage(URL.createObjectURL(selectfile))

    const formData = new FormData();
    formData.append('file', selectfile);

  setloading(true)
  try{
    const response = await fetch('http://127.0.0.1:5000/predict',{
      method: 'POST',
      body: formData,
    })

    const data = await response.json();
        setprediction(data);

    } catch (error) {
      console.error('Error:', error);
      tostmes()
      options()
      togglePopup()
    } finally {
      setloading(false);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
<ToastContainer />
    <div className="main_div">

        <div className='md_name md_nm'>model_v-03.h5</div>
    </div>
    <div className="pred">
        <div className='wid'>

        <div className='clas'>
            <div className="ct_block">

            <div className='namee'>cat</div>
            <div className={prediction?.class === 'Cat' ? 'bck_div ct_bck_div' : 'xj'}></div>
            <div className='img ct_img'>
              {prediction?.class === 'Cat' && showimage ? (
                <img src={showimage} alt='cat' className='preview-img'></img>
              ) : (
                <FontAwesomeIcon icon={faCat} size="2xl" />) }
            </div>
            </div>

            <div className='txt_div'>

            <div  className='md_name cl_nm'>
              <div >CNN</div>
              <div>CLASSIFIER</div>
            </div>
            <div className='md_name name2'>
              The Image is : {prediction && <> {prediction.class}</>}
            </div>

            </div>

            <div className="dg_block">
            <div className='namee'>dog</div>
            <div className={prediction?.class === 'Dog' ? 'bck_div dg_bck_div' : 'xj'}></div>
            <div className='img dg_img'>{prediction?.class === 'Dog' &&showimage ? (<img src={showimage} alt='dog' className='preview-img'></img>
              ) : (
                <FontAwesomeIcon icon={faDog} size="2xl" />
              )}</div>
            </div>

        </div>

        <div class="button-container">
          

  
      
      <div class="button upload-button" data-hover-text="Upload Image to get prediction..." ><input className="upld_functn"
      type='file'
      accept='image/*'
      onChange={handlefilechange}
      />
      </div>
   

    <div class="button predict-button" onClick={handlepred} >Predict</div>
    <div className='blur__div blur_div_sz'></div>
   
</div>
<div>
      {showPopup &&  (<div className="popup">
          <div className="popup-inner">
            <h2>Important Notice: Backend Server Issues</h2>
            <p>
              We are currently experiencing issues with our backend server hosted on Render due to the large size of our model. To ensure uninterrupted service, we kindly request your cooperation in using our Docker public image. You can find the Docker image and additional details on our GitHub repository.
            </p>
            <p className='lnk_f' >
              <strong onClick={dockerlink} >Click Here for Docker Image Link</strong> 
            </p>
            <p className='lnk_f' >
              <strong onClick={flasklink}>Click Here for Flask Backend Repository</strong>
            </p>
            <p className='lnk_f' >
              <strong onClick={githublink}>Click Here for GitHub Repository</strong>
            </p>
            
          </div>
        </div>
      )}



    </div>

{loading && <p>Loading...</p>}
          {prediction && (
            <div className="result">
              <p className='last_test'>Prediction: {prediction.class}</p>
              {/* <p>confidence: {prediction.confidence.toFixed(2)}</p> */}
            </div>
          )}
        </div>
    </div>
    
    </div>
  )
}

export default Pred


