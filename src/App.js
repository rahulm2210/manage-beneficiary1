import Navbar from "./components/navbar/navbar";
import { Provider } from 'react-redux';
import store from './store';
function App() {
  return (
    <Provider store={store}>
    <div className="container">
      <header>
        <div className ="row">
          <div className="col-md-12">
            <b className="logos">ABC Bank</b>
          </div>
        </div>
      </header>
    </div>
    <Navbar />
    </Provider>
  );
}

export default App;