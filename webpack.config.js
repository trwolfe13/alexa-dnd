const path = require('path')

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env']
  }
};

const tsLoader = {
  loader: 'ts-loader',
  options: {
    configFile: 'tsconfig.build.json'
  }
};

module.exports = {
  context: path.join(__dirname, './src'),
  target: 'node',
  mode: 'production',
  entry: './index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      { test: /\.ts$/, exclude: /node_modules/, use: tsLoader },
      { test: /\.js$/, exclude: /node_modules/, use: babelLoader }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [
      path.join(__dirname, 'node_modules')
    ],
  }
}