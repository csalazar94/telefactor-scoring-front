const configuration = {
  backend: `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}${process.env.NEXT_PUBLIC_BACKEND_HOST}${
    process.env.NEXT_PUBLIC_BACKEND_PORT ? ":" + process.env.NEXT_PUBLIC_BACKEND_PORT : ""
  }`,
};

export default configuration;
