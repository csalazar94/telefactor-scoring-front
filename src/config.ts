const configuration = {
  backend: `${process.env.BACKEND_PROTOCOL}${process.env.BACKEND_HOST}${
    process.env.BACKEND_PORT ? ":" + process.env.BACKEND_PORT : ""
  }`,
};

export default configuration;
