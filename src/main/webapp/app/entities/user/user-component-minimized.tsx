import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Button} from 'reactstrap';
import { Link } from 'react-router-dom';


export const UserCompMinimized = (userEntity) =>{

  return (
    <Box width={80}>
      <Button color="link" tag={Link} to={`/user/${userEntity.login}`}>
        <Grid container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Box bgcolor="primary.main" color="primary.contrastText" width={60} height={60}/>
          </Grid>
          <Grid item>
            {userEntity.login}
          </Grid>
        </Grid>
      </Button>
    </Box>
  );
}
