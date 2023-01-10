import axios from 'axios';

export const backendApi = axios.create({
  baseURL: 'http://compositecare-env.eba-hcsyxnmg.us-west-1.elasticbeanstalk.com',
  headers: {
    "Content-Type":"application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
