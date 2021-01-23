import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainLayout from '../src/components/layout/MainLayout/MainLayout';
import Homepage from './components/views/Homepage/Homepage';
import Kitchen from './components/views/Kitchen/Kitchen';
import Login from './components/views/Login/Login';
import Tables from './components/views/Tables/Tables';
import TablesBooking from './components/views/TablesBooking/TablesBooking';
import TablesEvents from './components/views/TablesEvents/TablesEvents';
import TablesNewBooking from './components/views/TablesNewBooking/TablesNewBooking';
import TablesNewEvent from './components/views/TablesNewEvent/TablesNewEvent';
import Waiter from './components/views/Waiter/Waiter';
import WaiterNewOrder from './components/views/WaiterNewOrder/WaiterNewOrder';
import WaiterOrder from './components/views/WaiterOrder/WaiterOrder';
import { StylesProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette:{
    primary: { main: '#2B4C6F' },
    // secondary: { main:'#llcb5f' },
  },
});

function App() {
  return (
    <BrowserRouter basename={'/panel'}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Switch>
              {/* <Route exact path={process.env.PUBLIC_URL + '/'} component={Homepage} /> */}
              <Route exact path="/" component={Homepage} />
              {/* <Route exact path={process.env.PUBLIC_URL + '/login'} component={Login} /> */}
              <Route exact path="/login" component={Login} />
              {/* <Route exact path={process.env.PUBLIC_URL + '/kitchen'} component={Kitchen} /> */}
              <Route exact path="/kitchen" component={Kitchen} />
              {/* <Route exact path={process.env.PUBLIC_URL + '/Tables'} component={Tables} /> */}
              <Route exact path="/tables" component={Tables} />
              {/* <Route exact path={process.env.PUBLIC_URL + '/tables/booking:id'} component={TablesBooking} /> */}
              <Route exact path="/tables/booking:id" component={TablesBooking} />
              {/* <Route exact path={process.env.PUBLIC_URL + '/tables/booking/new'} component={TablesNewBooking} /> */}
              <Route exact path="/tables/booking/new" component={TablesNewBooking} />
              {/* <Route exact path={process.env.PUBLIC_URL + '/tables/events:id'} component={TablesEvents} /> */}
              <Route exact path="/tables/events:id" component={TablesEvents} />
              {/* <Route exact path={process.env.PUBLIC_URL + '/tables/events/new'} component={TablesNewEvent} /> */}
              <Route exact path="/tables/events/new" component={TablesNewEvent} />
              {/* <Route exact path={process.env.PUBLIC_URL + '/waiter'} component={Waiter} /> */}
              <Route exact path="/waiter" component={Waiter} />
              {/* <Route exact path={process.env.PUBLIC_URL + '/waiter/order/new} component={WaiterNewOrder} /> */}
              <Route exact path="/waiter/order/new" component={WaiterNewOrder} />
              {/* <Route exact path={process.env.PUBLIC_URL + '/waiter/order:id} component={WaiterOrder} /> */}
              <Route exact path="/waiter/order:id" component={WaiterOrder} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
}

export default App;