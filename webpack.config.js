const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//获取html-webpack-plugin参数的方法
const getHtmlConfig = function(name, title) {
	return {
		template: './src/view/' + name + '.html',
		filename: 'view/' + name + '.html',
		title: title,
		inject: true,
		hash: true,
		chunks: ['common', 'vendor', 'commons', name]
	}
};
//每次生成dist目录前先删除旧的dist目录
const CleanWebpackPlugin = require('clean-webpack-plugin');

//将webpack-dev-server打包的文件输出到磁盘
const WebpackDevServerOutput = require('webpack-dev-server-output');

const config = {
	//入口
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
		'user-login': ['./src/page/user-login/index.js'],
		'user-register': ['./src/page/user-register/index.js'],
		'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
		'user-center': ['./src/page/user-center/index.js'],
		'user-center-update': ['./src/page/user-center-update/index.js'],
		'user-pass-update': ['./src/page/user-pass-update/index.js'],
		'result': ['./src/page/result/index.js']
	},

	//出口
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/mmall_fe/dist/'
	},

	//配置开发环境服务器
	devServer: {
		//告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
		contentBase: path.resolve(__dirname, 'dist'),
		//设置服务器的ip地址，可以为localhost
		host: 'localhost',
		//设置端口
		port: 8088,
		//设置自动拉起浏览器
		open: true,
		//设置热更新
		hot: true,

		inline: true,
		//打包文件在内存中的输出路径,可以通过http://localhost:8088/mmall_fe/dist/访问
		publicPath: '/mmall_fe/dist/'
	},

	//各种文件和loader
	module: {
		rules: [
			//css-loader
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader"
				]
			},
			//处理图片、字体，url-loader
			{
				test: /\.(gif|png|jpg|jpeg|woff|svg|eot|ttf)\??.*$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 100,
						name: 'image/[name].[ext]'
					}
				}]
			},
			//加载 .string文件
			{
				test: /\.string$/,
				use: {
					loader: 'html-loader'
				}
			}
		]
	},

	//配置别名
	resolve: {
		alias: {
			node_modules: __dirname + '/node_modules',
			util: __dirname + '/src/util',
			page: __dirname + '/src/page',
			service: __dirname + '/src/service',
			image: __dirname + '/src/image',
		}
	},

	//插件
	plugins: [
		//生成dist目录前先删除旧的dist目录。传入数组，指定要删除的目录
		new CleanWebpackPlugin(['dist']),

		//webpack 单独打包css，通过link的方式引入
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),

		//Html模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人中心')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
		new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),

		//调用webpack的热更新插件
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()

		//将webpack-dev-server打包的文件输出到指定位置
// 		new WebpackDevServerOutput({
// 			path: path.resolve(__dirname, 'dist'),
// 			//重新编译时删除之前的文件
// 			isDel: true
// 		})
	],

	//webpack提取公共模块
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				},
				vendor: {
					chunks: "all",
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					minChunks: 1,
					maxInitialRequests: 5,
					minSize: 0,
					priority: 100
				},
				commons: {
					name: 'commons',
					chunks: 'initial',
					minSize: 0,
					priority: 2,
					minChunks: 2,
				},
			}
		}
	}
};

module.exports = config;
