import React from 'react';
import styles from './Tables.module.scss';
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablesBtn from './TablesBtn';

const Tables = () => {
  return (
    <div className={styles.component}>
      <TablesBtn className={styles.button} name={'New Booking'} to={'/tables/booking/new'}></TablesBtn>
      <TablesBtn name={'New Event'} to={'/tables/events/new'}></TablesBtn>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Hour</TableCell>
              <TableCell align="center">Table 1</TableCell>
              <TableCell align="center">Table 2</TableCell>
              <TableCell align="center">Table 3</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow >
              <TableCell align="center">14:00</TableCell>
              <TableCell align="center"><Link className={styles.link} to='/tables/booking/:id' activeClassName='active'>Booking id=1</Link></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"><Link className={styles.link} to='/tables/events/:id' activeClassName='active'>Event id=2</Link></TableCell>
            </TableRow>
            <TableRow >
              <TableCell align="center">14:30</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"><Link className={styles.link} to='/tables/booking/:id' activeClassName='active'>Booking id=2</Link></TableCell>
              <TableCell align="center"><Link className={styles.link} to='/tables/events/:id' activeClassName='active'>Event id=2</Link></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tables;