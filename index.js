import { Provider } from 'react-redux';
import App from './App';
import { AppRegistry } from 'react-native';
import { store } from './redux/store';
import { ModalPortal } from 'react-native-modals';
import "./global.css"

const ReduxApp = () => (
    <Provider store={store}>
        <App />
      <ModalPortal/>
    </Provider>
  );
AppRegistry.registerComponent('main', () => ReduxApp);