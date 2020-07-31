import React from 'react';

import GridItem from 'Client/components/Grid/GridItem';
import Button from 'Client/components/CustomButtons/Button';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import './Database.css';

const Database = ({db}) => {
    return (
        <GridItem sm={4} md={4}>
            <div className="Database">
              <h4>Instance Name: {db.TableName}</h4>
              <p>Total Items: {db.ItemCount}</p>
              <p>Decreases Today: {db.ProvisionedThroughput.NumberOfDecreasesToday}</p>
              <p>Read Capacity Units: {db.ProvisionedThroughput.ReadCapacityUnits}</p>
              <p>Write Capacity Units: {db.ProvisionedThroughput.WriteCapacityUnits}</p>
              <p>Table Size: {(db.TableSizeBytes / 1000).toFixed(2)} KB</p>
              <p>Health Status: {db.TableStatus === 'ACTIVE' ? <Button color="success" size="sm" simple><Check/> {db.TableStatus}</Button> 
                                : <Button color="danger" size="sm"><Close/> {db.TableStatus}</Button>}</p>
            </div>
        </GridItem>
    )
}

export default Database;
