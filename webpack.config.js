const path = require('path');

module.exports = {
  // Prepara el juego para trabajar en la computadora.
  mode: 'development',
  // Aquí empieza el código principal.
  entry: './src/index.js',
  output: {
    // Guarda el resultado dentro de dist.
    path: path.resolve(__dirname, 'dist'),
    // Este es el archivo que carga la página.
    filename: 'bundle.js',
  },
  devServer: {
    // Muestra los archivos de la carpeta dist.
    static: './dist',
    // Dirección local del juego.
    port: 3000,
    // Abre el navegador y actualiza al guardar cambios.
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        // Prepara los archivos JavaScript.
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // Permite usar estilos SCSS.
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        // Carga los estilos CSS.
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // Incluye iconos y fuentes usados por la página.
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        type: 'asset/resource',
      }
    ]
  }
};
