import React, { useEffect, useState } from 'react';

import GridContainer from 'Client/components/Grid/GridContainer';
import GridItem from 'Client/components/Grid/GridItem';
import { Card, TextField } from '@material-ui/core';
import Button from 'Client/components/CustomButtons/Button';
import Loading from '../Loading/Loading';
import Notification from '../Notification/Notification';
import Axios from 'axios';
import { updateState } from 'admin/store/Utils/Update';


const WelcomeText = () => {
    const [ form,setForm ] = useState({text: ''});
    const [ ui,setUi ] = useState({loading: false,alert: null,error: null});
    const [ WelcomeText,setText ] = useState(null);

    useEffect(() => {
        updateState('loading',setUi,'Initializing ...')
        Axios.get('https://jvhr9wef76.execute-api.us-west-2.amazonaws.com/prod/resources/welcome-text')
        .then(res => {
            if(!res.data.err){
                setUi({loading: false,alert: null,error: null});
                setText(res.data.data.Item);
            } else {
                setUi({loading: false,alert: null,error: res.data.error});
            }
        })
        .catch(err => setUi({loading: false,alert: null,error: err.message}));
    },[]);

    const send = () => {
        updateState('loading',setUi,'Publishing Welcome text please wait...');
        Axios.post('https://jvhr9wef76.execute-api.us-west-2.amazonaws.com/prod/resources/welcome-text',{text: form.text,timeCreated: `${new Date().getHours()}:${new Date().getMinutes() > 9 ? new Date().getMinutes() : '0'+new Date().getMinutes()}`})
        .then(res => {
            console.log(res);
            if(!res.data.error){
              setUi({loading: false,alert: res.data.data,error: null});
              setText({text: form.text,timeCreated: `${new Date().getHours()}:${new Date().getMinutes() > 9 ? new Date().getMinutes() : '0'+new Date().getMinutes()}`});
              setTimeout(() => updateState('alert',setUi,null), 5000);
              setForm({text: ''});
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
            { ui.loading && <Loading text={ui.loading}/> }
            { ui.alert && <Notification color="success" text={ui.alert}/> }
            { ui.error && <Notification color="danger" text={ui.error}/> }
            <GridContainer>
                { (!ui.loading && WelcomeText) && <GridItem xs={6} sm={6}>
                <Card className="Welcome-Text-Box">
                    <h5 style={{fontWeight: 700}}>Current Welcome Text</h5>
                    <p>{WelcomeText.text}</p>
                    <small>Time Created: {WelcomeText.timeCreated}</small><br/>
                    <Button color="github" round size="sm" onClick={() => updateState('text',setForm,WelcomeText.text)}>Edit Text</Button>
                </Card>
                </GridItem>}
                { !ui.loading && 
                    <GridItem xs={6} sm={6}>
                        <h4 style={{fontWeight: "700"}}>Publish Welcome Text</h4>
                        <textarea value={form.text} onChange={(e) => updateState('text',setForm,e.target.value)}
                        style={{width: '100%',height: "200px",border: "1.2px solid #ccc",
                        padding: "0.4rem",marginTop: "0.4rem"}} placeholder="Message">
                        </textarea>
                        <Button color="google" disabled={(form.text !== '') ? false : true }
                        onClick={send}>Save Text</Button>
                    </GridItem>}
            </GridContainer>
        </div>
    )
}

export default WelcomeText;


