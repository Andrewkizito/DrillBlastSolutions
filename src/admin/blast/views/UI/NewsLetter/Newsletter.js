import React, { useState } from 'react';

import GridContainer from 'Client/components/Grid/GridContainer';
import GridItem from 'Client/components/Grid/GridItem';
import { TextField } from '@material-ui/core';
import Button from 'Client/components/CustomButtons/Button';
import Loading from '../Loading/Loading';
import Notification from '../Notification/Notification';
import Axios from 'axios';
import { updateState } from 'admin/store/Utils/Update';


const Newsletter = () => {
    const [ form,setForm ] = useState({subject: '',message: ''});
    const [ ui,setUi ] = useState({loading: false,alert: null,error: null});

    const send = () => {
        updateState('loading',setUi,true);
        Axios.post('https://jvhr9wef76.execute-api.us-west-2.amazonaws.com/prod/subscribe-to-newsletter/publish',form)
        .then(res => {
            console.log(res);
            if(!res.data.error){
              setUi({loading: false,alert: res.data.data,error: null});
              setTimeout(() => updateState('alert',setUi,null), 7000);
              setForm({subject: '',message: ''});
            } else {
              setUi({loading: false,alert: null,error: res.data.error});
              setTimeout(() => updateState('error',setUi,null), 7000);
            }
          }).catch(error => {
            console.log(error);
            setUi({loading: false,alert: null,error: error.message});
            setTimeout(() => updateState('error',setUi,null), 7000)
        })
    }
    return (
        <div>
            <GridContainer style={{margin: "2rem auto"}}>
              <GridItem xs={6} sm={6}>
                { ui.loading && <Loading text="Publishing newsletter please wait..."/> }
                { ui.alert && <Notification color="success" text={ui.alert}/> }
                { ui.error && <Notification color="danger" text={ui.error}/> }
                { !ui.loading && <>
                    <h4 style={{fontWeight: 700}}>Publish Newsletter</h4>
                    <TextField label="Subject" variant="outlined" fullWidth margin="dense" value={form.subject} 
                    onChange={(e) => updateState('subject',setForm,e.target.value)}/>
                    <textarea value={form.message} onChange={(e) => updateState('message',setForm,e.target.value)}
                    style={{width: '100%',height: "200px",border: "1.2px solid #ccc",
                    padding: "0.4rem",marginTop: "0.4rem"}} placeholder="Message" value={form.message}>
                    </textarea>
                    <Button color="facebook" disabled={(form.subject !== '' && form.message !== '') ? false : true }
                    onClick={send}>Publish Newsletter</Button>
                    </> }
              </GridItem>
            </GridContainer>
        </div>
    )
}

export default Newsletter








