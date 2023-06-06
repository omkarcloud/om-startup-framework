import fetchAdapter from './fetch-adapter';
import Config from '../config';
import axios from 'axios';

const baseURL = Config.IS_PRODUCTION
  ? 'http://backend-srv:8000/backend'
  : 'http://127.0.0.1:8000/backend';


const BackendAxios = axios.create({
  baseURL,
  adapter: fetchAdapter as any,
});

export default BackendAxios;
