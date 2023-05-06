import { PropType } from 'vue';

export interface Column {
    /** 标题 */
    title: string;
    /** 数据列 */
    dataIndex: string;
    /** 宽度 */
    width?: number | string;
}

export interface ConfigOptions {
    /** 间隔秒数(单位：毫秒) */
    second?: number;
    /** 是否显示标题 */
    showTitle?: boolean;
    /** 每行高度 */
    rowHeight?: number;
    /** 是否启用hover控制 */
    hoverStop?: boolean;
}
export const props = {
    /** 数据列 */
    columns: {
        type: Array as PropType<Column[]>,
        required: true,
        default: () => [],
    },
    /** 数据源 */
    dataSource: {
        type: Array as any,
        required: true,
        default: () => [],
    },
    /** 配置项 */
    options: {
        type: Object as PropType<ConfigOptions>,
        default: () => {},
    },
};
