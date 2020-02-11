import config from '../config';

const MedianApi = {
  postNumber(upperLimit) {
    return fetch(`${config.API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        upperLimit: upperLimit
      })
    });
  }
};

export default MedianApi;
