import React,{ useState, useEffect } from "react";

import GridContainer from "Client/components/Grid/GridContainer.js";
import GridItem from "Client/components/Grid/GridItem.js";
import Button from "Client/components/CustomButtons/Button";
import imageplaceholder from "admin/assets/img/image_placeholder.jpg"
import LinearLoader from "admin/blast/views/UI/LinearProgress/LinearProgress";
import { TextField } from "@material-ui/core";
import { updateState } from "admin/store/Utils/Update";
import { Storage } from "aws-amplify";
import Axios from "axios";
import Loading from "./UI/Loading/Loading";
import Notification from "./UI/Notification/Notification";
import Card from 'Client/components/Card/Card';
import CardBody from 'Client/components/Card/CardBody';

import styles from "Client/assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.js";
import { makeStyles } from '@material-ui/core';
import { Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles(styles);

const ManageSlides = () => {
  const classes = useStyles();
  const [ form,setForm ] = useState({id: null,title: '',description: ''});
  const [ explorerItems,setItems ] = useState(null);
  const [ selectedImage,setImage ] = useState(null);
  const [ uploadState,setState ] = useState({loading: false,alert: null,error: null});
  const [ uploadProgress,setProgress ] = useState(0);
  const [ ui,setUi ] = useState({loading: null,alert: null,error: null});
  const [ editMode,setMode ] = useState(null);
  const [ refetch,setRefetch ] = useState(null);

  useEffect(() => {
    setRefetch(false);
    const recentImage = JSON.parse(localStorage.getItem('selectedImage2'));
    recentImage && setImage(recentImage);
    setUi({loading: "Fetching Current Explorer Items...",alert: null,error: null});
    Axios.get('https://jhjffbgkva.execute-api.ap-southeast-2.amazonaws.com/prod/explorer')
    .then(res => {
      setItems(res.data.data);
      setUi({loading: null,alert: null,error: null});
    }).catch(err => setUi({loading: null,alert: null,error: err.message}))
  },[refetch]);

  const resetUi = (resetHelper,duration) => {
    setTimeout(() => resetHelper({loading: null,alert: null,error: null}), duration);
  }

  const triggerUpload = () => {
    if(!selectedImage){
      document.getElementById("file-upload").click();
    }
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
      localStorage.setItem('selectedImage2', JSON.stringify({url: ObjectUrl,key: ObjectKey}));
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

  const uploadExplorerItem = () => {
    setState({loading: false,alert: null,error: null});
    setUi({loading: "Uploading Explorer Item, wait a moment",alert: null,error: null})
     Axios.post('https://jhjffbgkva.execute-api.ap-southeast-2.amazonaws.com/prod/explorer', 
     { id: form.id ? form.id : "" + Math.random(),url: selectedImage.url,key: selectedImage.key,type: "Explorer Item",title: form.title,description: form.description })
     .then(res => {
        if(!res.data.error){
          setImage(null);
          setForm({title: '',description: ''});
          localStorage.removeItem('selectedImage2');
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

  const deleteExplorerItem = (id,key) => {
    if(window.confirm("Are you sure, this is irreversible ?")){
      setUi({loading: "Deleting Item, wait a second...",alert: null,error: null});
      Axios.delete(' https://jhjffbgkva.execute-api.ap-southeast-2.amazonaws.com/prod/explorer', { data: { id,key } })
      .then(res => {
        if(!res.data.error){
          setImage(null);
          setForm({title: '',description: ''});
          localStorage.removeItem('selectedImage2');
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

  const edit = (item) => {
    console.log(item);
    setImage({url: item.url,key: item.key});
    setForm({id: item.id,title: item.title,description: item.description});
    setMode(true);
  }

  const cancel = () => {
    setForm({id: null,title: '',description: ''});
    if(selectedImage){
      remove();
    }
  }

  console.log(explorerItems);

  return (
    <div>
       <Card className="Box" id="my-box">
         <h4 className="Box-Title">Manage Explorer</h4>
         { ui.loading && <Loading text={ui.loading}/> }
         { ui.alert && <Notification text={ui.alert} color="success"/> }
         { ui.error && <Notification text={ui.error} color="danger"/> }
         { !ui.loading &&
          <>
          <GridContainer>
           <GridItem ms={6} md={6} className="Align-Center">
              <TextField label="Title" value={form.title} onChange={(e) => updateState('title',setForm,e.target.value)} fullWidth/>
              <textarea className="Banner-Text-Area" placeholder="Description Text" value={form.description} 
               onChange={(e) => updateState('description',setForm,e.target.value)}></textarea>
           </GridItem>
           <GridItem ms={6} md={6} className="Align-Center">
              { uploadState.loading && 
                <div style={{padding: "100px auto"}}>
                  <LinearLoader progress={uploadProgress}/>
                </div> }
              { !uploadState.loading && <>
                  <img src={selectedImage ? selectedImage.url : imageplaceholder} alt="img here..." className="Home-Image" onClick={() => triggerUpload()}/>
                  <input type="file" style={{display: "none"}} id="banner-input" onChange={(e) => handleUpload(e)}/>
              </>}
              <input type="file" style={{display: "none"}} id="file-upload" onChange={e => handleUpload(e)}/>
              { !selectedImage && <Button round onClick={() => triggerUpload()}>Upload Image</Button> }
              { selectedImage && <Button round color={"google"} onClick={() => remove()}>Remove Image</Button> }
           </GridItem>
         </GridContainer>
         <Button color="facebook" round disabled={(form.title === '' || form.description === '' || selectedImage === null) && true}
          onClick={() => uploadExplorerItem()}>Save</Button>
         <Button round disabled={(form.title !== '' || form.description !== '' || selectedImage !== null) ? false : true}
          onClick={() => cancel()}>Cancel</Button>
        </>}
          { explorerItems && 
          <div className="Banner-Box">
           <h4 className="Box-Title">Current Explorer Items({explorerItems.length})</h4>
            {explorerItems.map(item => {
              return (
                <GridContainer className="Showcase">
                  <GridItem sm={6} md={6}>
                    <h4 className="Preview-Text">Preview</h4>
                    <Card background style={{ backgroundImage: `url(${item.url})` }}>
                      <CardBody background className="Justify">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <h3 className={classes.cardTitleWhite}>{item.title}</h3>
                        </a>
                        <Button round color="facebook">
                          Discover More
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem sm={6} md={6}>
                    <div className="Item-Details">
                      <h4>Explore Item Details.</h4>
                      <h6>{item.description}.</h6>
                      <div className="Control-Box">
                        <p>Time Created: {item.timeCreated}</p>
                        <p>Date: {`${item.date}/ ${item.month} / ${item.year}`}</p>
                        <Button color="github" href="/admin/manage-explorer#my-box" size="sm" onClick={() => edit(item)}><Edit/> Edit</Button>
                        <Button color="google" href="/admin/manage-explorer#my-box" size="sm" onClick={() => deleteExplorerItem(item.id,item.key)}><Delete/> Delete</Button>
                      </div>
                    </div>
                  </GridItem>
                </GridContainer>
              )
            })}
          </div> }
       </Card>
    </div>
  );
}

export default ManageSlides;
