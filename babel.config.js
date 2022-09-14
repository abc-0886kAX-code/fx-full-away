/*
 * @Author: maggot-code
 * @Date: 2021-02-28 13:25:16
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-15 10:31:12
 * @Description: babel config
 */
module.exports = {
    presets: ['@vue/cli-plugin-babel/preset', '@babel/preset-env'],
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk',
            },
        ],
        'lodash',
        [
            'import',
            {
                libraryName: 'vxe-table',
                style: true,
            },
        ],
    ],
};
