import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';

import Home from './views/Home';
import Login from './views/Login';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
