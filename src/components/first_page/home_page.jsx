import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home_page.css';

const HomePage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`paren-conainer ${isPopupVisible ? 'blr' : ''}`}>
      {/* Header Section */}
      <div className="heder">
        <h1>Welcome to CNN Classifier v1.0</h1>
        <p>Explore our state-of-the-art deep learning model!</p>
      </div>

      {/* Main Model Info Section */}
      <div className={`mdl-bx ${isPopupVisible ? 'pup' : ''}`}>
        <h2 className="mdl-nm">Model Name: CNN Classifier Model_v-03</h2>
        <h3 className="description-title">Description:</h3>
        <p className="model-description">
          This CNN classifier model is a deep learning model specifically trained to distinguish between images of cats and dogs. 
          It was developed from scratch and trained on a dataset comprising over 20,000 images of both cat and dog breeds.
        </p>

        <h3 className="description-title">Model Architecture:</h3>
        <p className="model-description">
          The model employs a robust architecture consisting of 5 convolutional layers. These layers extract intricate features 
          from the input images, enabling the model to accurately classify them.
        </p>

        <h3 className="description-title">Training and Optimization:</h3>
        <p className="model-description">
          The model was rigorously trained using a carefully selected optimization technique and hyperparameter tuning. 
          This process involved fine-tuning various parameters to achieve the best possible performance.
        </p>

        <h3 className="description-title">Performance:</h3>
        <p className="model-description">
          Through meticulous training and optimization, the model has achieved an impressive accuracy of 87% on the given dataset. 
          This indicates its ability to reliably classify new, unseen images of cats and dogs.
        </p>

        <h3 className="description-title">Model Management with MLflow:</h3>
        <p className="model-description">
          To ensure efficient model management and continuous improvement, this model is integrated with MLflow. MLflow facilitates:
        </p>
        <ul className="model-list">
          <li>Experiment Tracking: Recording and comparing different model runs, hyperparameters, and metrics.</li>
          <li>Model Registry: Centralized storage and version control of trained models.</li>
          <li>Model Deployment: Seamless deployment of models to various environments.</li>
        </ul>
        <p className="model-description">
          By leveraging MLflow, we can effectively monitor the model's performance over time, identify areas for improvement, 
          and retrain the model as needed to maintain high accuracy and reliability.
        </p>

        {/* Buttons Section */}
        <div className="button-section">
          <a href="https://github.com/shardsnaik/Dog_vs_Cat_Classifier/blob/main/artifacts/trained_model/model_v-03_cpy.h5" download className="btn download-btn"> Download Model
          </a>
          <Link to="/pred" className="btn test-btn">
            Test Model
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
