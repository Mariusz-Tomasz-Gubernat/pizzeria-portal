import React from 'react';
import styles from './Homepage.module.scss';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Homepage = () => {
  return (
    <div className={styles.component}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <h3>All statistics</h3>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <h3>Every bookings</h3>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <h3>Every events</h3>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Homepage;