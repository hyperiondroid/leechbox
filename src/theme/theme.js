import { createGlobalStyle } from 'styled-components';
import RoobertRegularWoff2 from '../fonts/Roobert-Regular.woff2';
import RoobertSemiBoldWoff2 from '../fonts/Roobert-SemiBold.woff2';

// Create Global Style Component to inlcude in index.js
const GlobalStyles =  createGlobalStyle`
    @font-face {
        font-family: 'Roobert';
        src: local('Roobert'), local('Roobert'),
        url(${RoobertRegularWoff2}) format('woff2');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Roobert';
        src: local('Roobert'), local('Roobert'),
        url(${RoobertSemiBoldWoff2}) format('woff2');
        font-weight: 600;
        font-style: normal;
    }
    
    body{
        font-family: 'Roobert';
        font-weight: 600;
        background-color: #0e0e10;
        color: #fafafa;
    }
`;

export default GlobalStyles;