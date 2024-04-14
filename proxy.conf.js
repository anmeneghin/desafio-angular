const PROXY_CONFIG = [
  {
    context: ["/Device"],
    target: "https://anmeneghin.github.io/gerencimento-dispositivos-iot",
    secure: false,
    logLevel: "debug",
    pathRewrite: { "^/api": "" },
  },
];

module.exports = PROXY_CONFIG;
