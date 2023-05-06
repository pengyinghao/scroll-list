import {
    defineConfig,
    presetUno,
    presetAttributify,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss';

export default defineConfig({
    exclude: ['node_modules', '.git', 'dist'],
    presets: [presetUno(), presetAttributify()],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    shortcuts: {
        'wh-full': 'w-full h-full',
        'flex-center': 'flex justify-center items-center',
        'flex-x-center': 'flex justify-center',
        'flex-y-center': 'flex items-center',
        'nowrap-hidden': 'whitespace-nowrap overflow-hidden',
        'ellipsis-text': 'nowrap-hidden overflow-ellipsis text-ellipsis',
        'transition-base': 'transition-all duration-300 ease-in-out',
    },
    theme: {
        colors: {},
    },
    rules: [
        [/^flex-grow-(\d)$/, ([, d]) => ({ 'flex-grow': d })],
        [/^plr-(.*)$/, ([, p]) => ({ 'padding-left': p, 'padding-right': p })],
        [/^ptb-(.*)$/, ([, p]) => ({ 'padding-top': p, 'padding-bottom': p })],
    ],
});
