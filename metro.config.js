const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.watchFolders = [];
config.resolver.useWatchman = false;

module.exports = config;