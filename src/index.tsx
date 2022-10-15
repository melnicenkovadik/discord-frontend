import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { BrowserRouter } from 'react-router-dom';
import { ComponentPreviews, useInitial } from './dev';
import App from 'modules/common/app/App';
import { store } from './app/store';
import { ToastContainer } from 'react-toast';
import 'app/styles/index.css';
import { ThemeProvider } from '@material-tailwind/react';


const container = document.getElementById('root')!;
const root = createRoot(container);


root.render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
          <Provider store={store}>
            <App />
          </Provider>
        </DevSupport>
        <ToastContainer delay={5000} position="top-right" />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
