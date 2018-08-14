const { injectBabelPlugin ,getLoader } = require('react-app-rewired');

const fileLoaderMatcher = function (rule) {
  return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
}

module.exports = function override(config,dev){
	config = injectBabelPlugin(['import',{libraryName:'antd-mobile',style:'css'}],config);
	
	
	
	
	// css-modules  cssModule  +antd mobile 样式冲突解决
	config.module.rules[1].oneOf.unshift({
		test: /\.css$/,
		exclude: /node_modules|antd-mobile\.css/,
		use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]'
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
      ]
	});
	
	 // file-loader exclude
	let l = getLoader(config.module.rules, fileLoaderMatcher);
	l.exclude.push(/\.less$/);
	
	return config;
	
}