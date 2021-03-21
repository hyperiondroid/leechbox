import React from 'react';
import { render } from 'react-dom';
import GlobalStyles from './fonts/fonts';
import 'normalize.css';

import LandingPage from './pages/LandingPage';

const documentRoot = document.getElementById('root');
render(<div><GlobalStyles/><LandingPage/></div>, documentRoot);