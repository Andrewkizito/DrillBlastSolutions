/*eslint-disable*/
import React,{ useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Edit from '@material-ui/icons/Edit';
import styles from "../../assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import Card from "admin/components/Card/Card";
import GridContainer from "Client/components/Grid/GridContainer.js";
import GridItem from "Client/components/Grid/GridItem.js";
import Button from "Client/components/CustomButtons/Button";

import imageplaceholder from "admin/assets/img/image_placeholder.jpg"
import { Storage } from "aws-amplify";
import LinearLoader from "./UI/LinearProgress/LinearProgress.js";
import Notification from "./UI/Notification/Notification.js";
import Axios from "axios";
import Loading from "./UI/Loading/Loading.js";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles(styles);

const ManageHome = () => {
  const [ currentBanner,setBanner ] = useState(null);
  const [ selectedImage,setImage ] = useState(null);
  const [ text,textChange ] = useState('');
  const [ uploadState,setState ] = useState({loading: false,alert: null,error: null});
  const [ uploadProgress,setProgress ] = useState(0);
  const [ ui,setUi ] = useState({loading: null,alert: null,error: null});
  const [ editMode,setMode ] = useState(null);
  const [ refetch,setRefetch ] = useState(null);

  const triggerUpload = () => document.getElementById("banner-input").click();

  useEffect(() => {
    setRefetch(false);
    const recentImage = JSON.parse(localStorage.getItem('selectedImage'));
    recentImage && setImage(recentImage);
    setUi({loading: "Fetching Current Banner",alert: null,error: null});
    Axios.get('https://jhjffbgkva.execute-api.ap-southeast-2.amazonaws.com/prod/home-banner')
    .then(res => {
      setBanner(res.data.data);
      setUi({loading: null,alert: null,error: null});
    }).catch(err => setUi({loading: null,alert: null,error: err.message}));
  },[refetch]);

  const resetUi = (resetHelper,duration) => {
    setTimeout(() => resetHelper({loading: null,alert: null,error: null}), duration);
  }

  const handleUpload = (e) => {
    setState({loading: true,alert: null,error: null});
    const file = e.target.files[0];
    Storage.put(file.name,file, {
      progressCallback(progress) {
        setProgress((progress.loaded / progress.total * 100).toFixed(1));
    }}).then(res => {
      const ObjectUrl = `https://blastimages160531-prod.s3.us-east-2.amazonaws.com/public/${res.key}`;
      const ObjectKey = res.key;
      setImage({url: ObjectUrl,key: ObjectKey});
      setState({loading: false,alert: "Image Attached Successfully",error: null});
      setProgress(0);
      localStorage.setItem('selectedImage', JSON.stringify({url: ObjectUrl,key: ObjectKey}));
      resetUi(setState,5000);
    }).catch(err => {
      setState(setState,{loading: null,alert: null,error: err.message});
      resetUi(7000);
    });
  }

  const remove = () => {
    setUi({loading: "Removing Image, wait a moment...",alert: null,error: null});
    Storage.remove(selectedImage.key)
    .then(() => {
      !editMode && localStorage.removeItem('selectedImage');
      setState({loading: false,alert: "Removed Successfully",error: null});
      setUi({loading: null,alert: null,error: null});
      setImage(null);
      !editMode && resetUi(setState,5000);
    }).catch(err => {
      setState({loading: null,alert: null,error: err.message});
      resetUi(7000);
    });
  }

  const edit = ({url,key,title}) => {
    console.log(url,key,title);
    setImage({url,key});
    textChange(title);
    setMode(true);
  }

  const deleteHomeBanner = (id,key) => {
    if(window.confirm("Are you sure, this is irreversible ?")){
      setUi({loading: "Deleting Banner, wait a second...",alert: null,error: null});
      Axios.delete('https://jhjffbgkva.execute-api.ap-southeast-2.amazonaws.com/prod/home-banner', { data: { id,key } })
      .then(res => {
        if(!res.data.error){
          setImage(null);
          textChange('');
          localStorage.removeItem('selectedImage');
          setUi({loading: null,alert: res.data.data,error: null});
          setRefetch(true);
          resetUi(setUi, 5000);
        } else {
          setUi({loading: null,alert: null,error: res.data.error});
          resetUi(setUi, 7000);
        }
      }).catch(err => {
        setUi({loading: null,alert: null,error: err.message});
        resetUi(setUi, 7000)
      });
    }
  }

  const uploadBanner = () => {
    setState({loading: false,alert: null,error: null});
    setUi({loading: "Uploading Banner, wait a moment",alert: null,error: null})
     Axios.post('https://jhjffbgkva.execute-api.ap-southeast-2.amazonaws.com/prod/home-banner', 
     { id: "homebanner",url: selectedImage.url,key: selectedImage.key,type: "Home banner",title: text })
     .then(res => {
        if(!res.data.error){
          setImage(null);
          textChange('');
          localStorage.removeItem('selectedImage');
          setUi({loading: null,alert: res.data.data,error: null});
          setRefetch(true);
          resetUi(setUi, 5000);
        } else {
          setUi({loading: null,alert: null,error: res.data.error});
          resetUi(setUi, 7000);
        }
     }).catch(err => {
      setUi({loading: null,alert: null,error: err.message});
      resetUi(setUi, 7000)
     });
  } 

  const cancel = () => {
    textChange('');
    if(selectedImage){
      remove();
    }
  }
  
  return (
    <>
      <Card className="Box">
        <h4 className="Box-Title">Manage The Home Banner</h4>
        { uploadState.alert && <Notification text={uploadState.alert} color="success"/> }
        { uploadState.error && <Notification text={uploadState.error} color="danegr"/> }
        { ui.loading && <Loading text={ui.loading}/> }
        { ui.alert && <Notification text={ui.alert} color="success"/> }
        { ui.error && <Notification text={ui.error} color="danger"/> }
        { !ui.loading && 
          <>
            <GridContainer id="edit">
              <GridItem sm={6} md={6} className="Align-Center">
                  { uploadState.loading && 
                    <div style={{padding: "100px auto"}}>
                      <LinearLoader progress={uploadProgress}/>
                    </div> }
                  { !uploadState.loading && <>
                      <img src={selectedImage ? selectedImage.url : imageplaceholder} alt="img here..." className="Home-Image" onClick={() => triggerUpload()}/>
                      <input type="file" style={{display: "none"}} id="banner-input" onChange={(e) => handleUpload(e)}/>
                    </>}
                  { (!selectedImage && !uploadState.loading ) && <Button round onClick={() => triggerUpload()}>Upload Image</Button>}
                  { selectedImage && <Button round color="danger" onClick={() => remove()}>Remove Image</Button> }
                </GridItem>
                <GridItem sm={6} md={6} className="Align-Center">
                  <label className="Banner-Label">Banner Text</label>
                  <textarea className="Banner-Text-Area" value={text} onChange={(e) => textChange(e.target.value)}></textarea>
                </GridItem>
            </GridContainer>
            <Button color="facebook" round disabled={(text === '' || !selectedImage) && true } onClick={() => uploadBanner()}>Save Banner</Button>
            <Button round onClick={() => cancel()}>Cancel</Button>
          </>
          }
        <hr/>
        { currentBanner && 
          !ui.loading &&
          <div className="Banner-Box">
           <h4 className="Box-Title">Current Banner</h4>
           <div className="Home-Preview" 
             style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.397),rgba(0, 0, 0, 0.376)),url(${currentBanner.url})`,
              backgroundSize: "cover",backgroundPosition: "center"
            }}>
            <img src={require('Client/assets/images/header.png')} className="Preview-Header-Img"/>
            <h4>{currentBanner.title}</h4>
           </div>
           <div className="Details-Box">
             <p>Time Created: {currentBanner.timeCreated}</p>
             <p>Date: {`${currentBanner.date}/ ${currentBanner.month} / ${currentBanner.year}`}</p>
             <Button round color="github" href="/admin/manage-home#edit" size="sm" onClick={() => edit(currentBanner)}><Edit/> Edit</Button>
             <Button round color="google" href="/admin/manage-home#edit" size="sm" onClick={() => deleteHomeBanner(currentBanner.id,currentBanner.key)}><Delete/> Delete</Button>
           </div>
          </div>}
      </Card>
    </>
  );
}

export default ManageHome;
