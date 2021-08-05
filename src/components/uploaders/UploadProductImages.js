import { Button } from '@chakra-ui/react';
import React, { Component, useEffect } from 'react';

const UploadProductImages = () => {
  useEffect(() => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'djlbyjz2s',
        uploadPreset: 'l9l35ida',
        sources: ['local', 'facebook'],
        multiple: true,
        maxSize: 4,
        cropping: true,
        croppingAspectRatio: 1,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
        }
      }
    );
    document.getElementById('upload_widget').addEventListener(
      'click',
      function () {
        myWidget.open();
      },
      false
    );
  }, []);

  return <Button id="upload_widget">Upload</Button>;
};

export default UploadProductImages;
