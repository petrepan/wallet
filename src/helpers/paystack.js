const axios = require("axios");

 exports.chargePayment = async (form) => {
  const options = {
    url: "https://api.paystack.co/charge",
    headers: {
      authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
    method: "POST",
    data: form,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.request(options);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

 exports.verifyChargePayment = async (form) => {
  const options = {
    url: "https://api.paystack.co/charge/submit_pin",
    headers: {
      authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
    method: "POST",
    data: form,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.request(options);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

exports.initializePayment = async (form) => {
  const options = {
    url: "https://api.paystack.co/transaction/initialize",
    headers: {
      authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
    method: "POST",
    data: form,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.request(options);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

exports.verifyPayment = async (ref) => {
  console.log(ref)
  const options = {
    url: "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
    headers: {
      authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
    method: "GET",
  };
  return new Promise(async (resolve, reject) => {
    try {
      const data = await axios.request(options);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};