// next.config.js

// You can choose which headers to add to the list
// after learning more below.
const securityHeaders = [
  {
    key: "Permissions-Policy",
    value: "geolocation=(), interest-cohort=()",
  },
];

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};