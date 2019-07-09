module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: __dirname + 'dist',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  module: {},
  plugins: [],
  decServer: {}
}