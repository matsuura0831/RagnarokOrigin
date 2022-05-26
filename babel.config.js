const plugins = []

if(process.env.NODE_ENV === 'production') {
  plugins.push(["transform-remove-console", { "exclude": ["error", "warn"] }])
}

module.exports = {
  plugins: plugins,
  presets: ["@vue/cli-plugin-babel/preset"],
};