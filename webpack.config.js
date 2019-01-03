const path = require('path'),
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
      HtmlWebpackPlugin = require('html-webpack-plugin'), // Create html file in dist folder with same props which is in src folder 
      CleanWebpackPlugin= require('clean-webpack-plugin'), // Delete dist folder and after it create new dist folder with new files 
      CopyWebpackPlugin = require('copy-webpack-plugin'), // Copy files for one folder to another (used for fonts)
      //ImageminWebpackPlugin = require('imagemin-webpack-plugin').default // Minimize image ,
      OptimezeCssPlugin = require('optimize-css-assets-webpack-plugin'); // Minimize css 


            // Extract scss files from src folder to dist folder in css format 
const ETP = new ExtractTextPlugin('css/style.css'); 

/** Webpack Config  */
const conf = {

    context:path.resolve(__dirname , 'src'),
    entry:{
        app:[
            './js/index.js', // Entry point of js files 
            './scss/style.scss' // Entry point of scss files 
        ]
    },
    output:{
        path:path.resolve(__dirname , './dist'), // Output on the folder which is specified in the second argument 
        filename:'js/bundle.js', // Output for js file 
        publicPath:'dist' // Public path for browser (the folder will be created for browser even if the folder dose`t exist )
    },
    module:{
        rules:[
            // Js (use: babel-loader)
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader' 
            },
            /**
             *  Scss (use:  css-loader , 
             *              style-loader , 
             *              postcss-loader[used for autoprefix plugin], 
             *              sass-loader )
             **/
            {
                test: /\.scss$/,
                use:  ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'postcss-loader' , 'sass-loader']
                }))
            },
            // Image (use: file-loader , img-loader)
            {
                test:/\.(png|gif|jpe?g)$/,
                loaders:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'[path][name].[ext]',
                        },
                    },
                    'img-loader'
                ]
            },
            // Svg (use: svg-url-loader)
            {
                test:/\.svg$/,
                use:{
                    loader:'svg-url-loader'
                }
            },
            
            // Font (use: file-loader)
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'fonts[name].[ext]'
                        }
                    }
                ]
            }
        ],
    },
    devServer:{
        contentBase:path.resolve(__dirname , 'src'),
        port: 9000,
        watchContentBase: true,
        compress: true,
        hot: true,
        open: true // Enter point for webpack-dev-server 
    },
    plugins:[
        ETP,
        new HtmlWebpackPlugin({
            filename:'./index.html', // File which will be created  in dist folder 
            template:'./index.html', 
            inject:false,
        }),
    ]
}


module.exports = (env , opt) => {
    

    let isProduction = opt.mode === 'production';

    /**
     * Plugins which used only from production mode 
     */
    if(isProduction){

        conf.plugins.push( new CleanWebpackPlugin(['dist']) ) 

        conf.plugins.push(
            new CopyWebpackPlugin(
                [
                    {from:'./img' , to: './img'},
                    {from:'./fonts' , to: './fonts'}
                ],
                
                {
                    ignore:[{glob:'svg/*'}]
                }
            ),
        )
        conf.plugins.push(
            // new ImageminWebpackPlugin({
            //     test:/\.(png|gif|jpe?g)$/i,
            // }),
        )
 
        conf.plugins.push(
            new OptimezeCssPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true
            })
        )

    }

    return conf;
}
