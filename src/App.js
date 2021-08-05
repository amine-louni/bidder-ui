import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

import Home from './views/Home';
import Login from './views/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { UserProvider } from './context/UserContext';
import Register from './views/Register';
import Product from './views/Product';
import Sell from './views/Sell';
import './style.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function App() {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <div className="App">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            style={{ borderRadius: 60, fontWeight: 'bold' }}
          />

          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/sell" component={Sell} />
              <Route exact path="/products/:id" component={Product} />
            </Switch>
          </BrowserRouter>
        </div>
      </ChakraProvider>
    </UserProvider>
  );
}

export default App;
