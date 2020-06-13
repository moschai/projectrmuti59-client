const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,

    modifyVars: {
      '@primary-color': '#3B579B',
      '@warning-color': '#f8d00f',
      'font-size-base': '14px',
      'badge-font-size': '12px',
      'btn-font-size-lg': '@font-size-base',
      'menu-dark-bg': '#3B579B',
      'menu-dark-submenu-bg': '#3B579B',
      'layout-sider-background': '#3B579B',
      'layout-body-background': '#EBE9EF',
      'layout-trigger-background': '#f03970',
    },
  }),
);