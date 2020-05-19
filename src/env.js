const dev = {
  GA_ACCOUNT: 'UA-161846587-2',
};

const prod = {
  GA_ACCOUNT: 'UA-161846587-1',
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
