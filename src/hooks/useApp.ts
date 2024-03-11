import { useContext } from 'react';
import { AppContext } from './../context/app/index';

const useApp = () => useContext(AppContext);

export default useApp;
