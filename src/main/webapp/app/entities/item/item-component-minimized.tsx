import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {openFile} from "react-jhipster";


export const ItemCompMinimized = (itemEntity) =>{

  return (
    <Card>
      <Button color="link" tag={Link} to={`/search/${itemEntity.id}`}>
        <Grid container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
              {itemEntity.image && (
                <img src={`data:${itemEntity.imageContentType};base64,${itemEntity.image}`} height = '200' width=  '150' />
              )}
          </Grid>
          <Grid item>
            {itemEntity.title}
          </Grid>
        </Grid>
      </Button>
    </Card>
  );
}
