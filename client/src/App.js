import './App.css';
import XRoutes from "./routes"
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <body>
        <XRoutes />
      </body>
    </Provider>
  );
}

export default App;
