module.exports = {
  entry: __dirname + "/src",
  output: {
    filename: "bundle.js",
    path: __dirname + "/public"
  },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 25000, // Convert images < 8kb to base64 strings
                  name: 'images/[hash]-[name].[ext]'
              },
          }]
        }
      ]
    }
};