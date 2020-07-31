import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "../../components/CustomButtons/Button.js";

import defaultImage from "../../assets/img/image_placeholder.jpg";
import defaultAvatar from "../../assets/img/placeholder.jpg";

import { Storage } from 'aws-amplify';

export default function ImageUpload(props) {
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.avatar ? defaultAvatar : defaultImage
  );
  let fileInput = React.createRef();
  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  // eslint-disable-next-line
  console.log(file,imagePreviewUrl);

   const handleClick = async() => {
    try { fileInput.current.click(); }
    catch (error){
      console.log(error)
    }
    try {
      await Storage.put(fileInput.name, file) 
      .then (result => console.log(result))

     }
    catch (error) {
      console.log(error)
    }
  };
  const handleRemove = async () => {
    try {
      setFile(null);
      setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
      fileInput.current.value = null;
    }
    catch (error){
        console.log(error)}
    try {await Storage.remove(fileInput.name, file) }
    catch (error) {
          console.log(error)
        }    
  };
  let { avatar, addButtonProps, changeButtonProps, removeButtonProps } = props;
  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button {...addButtonProps} onClick={() => handleClick()}>
            {avatar ? "Add Photo" : "Select image"}
          </Button>
        ) : (
          <span>
            <Button {...changeButtonProps} onClick={() => handleClick()}>
              Change
            </Button>
            {avatar ? <br /> : null}
            <Button {...removeButtonProps} onClick={() => handleRemove()}>
              <i className="fas fa-times" /> Remove
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};
