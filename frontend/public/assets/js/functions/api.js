export default {
  get: async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },

  post: async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  },
};
