const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
    // other configuration
    configureWebpack: {
        plugins: [
            new SentryWebpackPlugin({
                // sentry-cli configuration
                authToken: process.env.VUE_APP_SENTRY_CREDENTIAL,
                org: "code4community",
                project: "llb-vue-frontend",

                // webpack specific configuration
                include: ".",
                ignore: ["node_modules", "webpack.config.js"],
            }),
        ],
    },
};