import './styles/styles.scss'
import {addAction, getTravelDate} from './js/app';
 
document.getElementById('generate').addEventListener('click', addAction);

document.getElementById('submit').addEventListener('click', getTravelDate);