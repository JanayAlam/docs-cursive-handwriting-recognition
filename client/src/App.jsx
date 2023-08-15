import { Route, Routes } from 'react-router-dom';
import Header from './components/ui/header';

import Profile from './pages/account/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Homepage from './pages/home/Homepage';
import ImageContainer from './pages/prediction/ImageContainer';

import { Provider } from 'react-redux';
import styles from './app.module.css';
import AlertList from './components/ui/alert-list';
import PredictionResults from './pages/prediction/PredictionResults';
import store from './store';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route
                        path="/image-cropping"
                        element={<ImageContainer />}
                    />
                    <Route
                        path="/predictions"
                        element={<PredictionResults />}
                    />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <div className={styles.alertList}>
                    <AlertList />
                </div>
            </div>
        </Provider>
    );
}

export default App;

