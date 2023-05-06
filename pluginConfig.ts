import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import Unocss from 'unocss/vite'

// TODO: 在package.json中生成用到的组件目录，但是测试没用 不知道为啥
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

import eslintPlugin from 'vite-plugin-eslint'
import { svgIconsPlugin } from './plugins/svgSprite'
import mockServerPlugin from './plugins/mockServer'
import { autoImport } from './plugins/autoComponent'

export function pluginsConfig(isBuild: boolean, envs: Record<string, string>) {
    const plugins: PluginOption[] = [vue(), vueJsx()]

    plugins.push(Unocss())

    plugins.push(autoImport())

    // 直接在script上写name
    plugins.push(vueSetupExtend())

    // 打包压缩
    plugins.push(viteCompression())

    // eslint未通过控制台输出报错信息
    plugins.push(eslintPlugin())

    // svg 转图标
    plugins.push(svgIconsPlugin(isBuild))

    // 本地mock数据
    plugins.push(mockServerPlugin(isBuild, envs.VITE_MOCK_SERVER === 'true'))

    plugins.push(OptimizationPersist())
    plugins.push(PkgConfig())

    return plugins
}
