// create a file named "loginConfig.js" in the "public" folder. Replace the "Local_IP" field with your own IP.
// loginConfig.js file must be gitignored all the time at any situation. 
// Otherwise upon pulling, everyones local ip will be changed and development will stop.

const LoginData = {
  PROXY_URL: "http://localhost:5000/",
  LOCAL_IP: "192.168.20.136",
  APPLICATION_ID: "64",
  MODULE_ID: "25"
};

export { LoginData };

