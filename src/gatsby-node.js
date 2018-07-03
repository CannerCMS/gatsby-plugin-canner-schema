const resolve = module => require.resolve(module)

exports.onCreateWebpackConfig = (
  { actions }
) => {
  const { setWebpackConfig } = actions

  setWebpackConfig({
    module: {
      rules: [{
        test: /\.schema\.js|canner\.def\.js$/,
        use: [
          {loader: resolve('canner-schema-loader')},
          {
            loader: resolve('babel-loader'),
            options: {
              plugins: [
                [
                  require('babel-plugin-import').default,
                  {
                    libraryName: 'antd',
                    style: true,
                  },
                ],
              ],
              presets: [
                require('@babel/preset-env'),
                require('@babel/preset-react'),
                require('@babel/preset-stage-0'),
              ]
            }
          }
        ],
      }],
    },
  })
}