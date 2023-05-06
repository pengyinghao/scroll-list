<template>
    <div
        ref="refScrollList"
        class="scroll-list"
        :style="{ '--height': `${options.rowHeight}px` }"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseLevel"
    >
        <ul
            ref="refScrollListHead"
            v-if="options.showTitle"
            class="scroll-list-head"
        >
            <li>
                <div v-for="column in columns" :key="column.dataIndex">
                    {{ column.title }}
                </div>
            </li>
        </ul>
        <ul ref="refScrollListWrap" class="scroll-list-wrap" :style="pos">
            <li
                v-for="(item, index) in dataSource"
                :key="index"
                class="scroll-list-wrap--item"
            >
                <div v-for="column in columns">
                    <slot name="bodyCell" :record="item" :column="column">
                        {{ item[column.dataIndex] }}
                    </slot>
                </div>
            </li>
        </ul>
        <ul v-if="isClone" class="scroll-list-wrap" :style="pos">
            <li
                v-for="(item, index) in dataSource"
                :key="index"
                class="scroll-list-wrap--item"
            >
                <div v-for="column in columns">
                    <slot name="bodyCell" :record="item" :column="column">
                        {{ item[column.dataIndex] }}
                    </slot>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import {
    CSSProperties,
    computed,
    nextTick,
    onMounted,
    onUnmounted,
    ref,
    watchEffect,
} from 'vue';

import { ConfigOptions, props as ScrollListProps } from './types';

/** 默认配置 */
const defaultConfig: ConfigOptions = {
    rowHeight: 28,
    showTitle: true,
    hoverStop: true,
    second: 3000,
};

const props = defineProps(ScrollListProps);

/** 通过传递的配置和默认的配置合并 */
const options = computed(() => ({ ...defaultConfig, ...props.options }));

//定时器初始化
let timer = ref<number | undefined>(undefined);

const columnWidth = computed(() => {
    const result = [];
    for (const prop in props.columns) {
        const w = props.columns[prop].width;
        if (w) result.push(typeof w === 'number' ? w + 'px' : w);
        else result.push('1fr');
    }
    return result.join(' ');
});

const pos = computed<CSSProperties>(() => {
    let y = -currentIndex.value * (options.value.rowHeight as number);
    let transition = 'all 0.3s';
    if (currentIndex.value === props.dataSource.length) {
        y = 0;
        transition = 'none';
    }
    return {
        transform: `translateY(${y}px)`,
        transition,
    };
});

// 当前索引 ，通过索引 确定translateY的位置
const currentIndex = ref(0);
const start = () => {
    timer.value = setInterval(() => {
        currentIndex.value += 1;
        if (currentIndex.value > props.dataSource.length) {
            currentIndex.value = 1;
        }
    }, options.value.second);
};

const stop = () => {
    clearInterval(timer.value);
};

const onMouseenter = () => {
    if (options.value.hoverStop) stop();
};

const onMouseLevel = () => {
    if (options.value.hoverStop) start();
};

const refScrollList = ref<HTMLElement>();
const refScrollListHead = ref<HTMLElement>();
const refScrollListWrap = ref<HTMLElement>();
const isClone = ref(false);
const init = () => {
    nextTick(() => {
        stop();
        if (refScrollList.value) {
            let scrollListHeight = refScrollList.value.scrollHeight;
            const wrapHeight =
                props.dataSource.length * (options.value.rowHeight as number);

            // 判断是否有head，如果有，则减去head的高度
            if (refScrollListHead.value) {
                scrollListHeight =
                    scrollListHeight - refScrollListHead.value.offsetHeight;
            }

            // 判断是否需要滚动，如果需要滚动，则克隆一份html展示
            if (scrollListHeight <= wrapHeight) {
                isClone.value = true;
                start();
            }
        }
    });
};
onMounted(() => {
    init();
});

onUnmounted(() => {
    stop();
});

watchEffect(() => {
    if (props.dataSource.length > 0) {
        init();
    }
});
</script>
<style lang="less" scoped>
.scroll-list {
    overflow: hidden;
    &-head,
    &-wrap {
        padding: 0;
        margin: 0;
        position: relative;
        li {
            padding: 0 8px;
            display: grid;
            grid-template-columns: v-bind(columnWidth);
            list-style: none;
        }
    }
    &-head {
        z-index: 999;
        background-color: #fff;
    }
    &-wrap {
        transition: all 0.3s;
        &--item {
            line-height: var(--height);
            div {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>
