<script setup lang="ts">
import ScrollList from './components/ScrollList.vue';

const columns = [
    { title: '名称', dataIndex: 'jobName' },
    { title: '状态', dataIndex: 'jobStatusName', width: '25%', key: 'state' },
    { title: '作业集群', dataIndex: 'clusterName', width: '25%' },
];

const statusColor: Record<string, string> = {
    TERMINATED: 'rgb(156,163,175)',
    FAILED: 'rgb(248,113,113)',
    COMPLETED: 'rgb(74,222,128)',
};

const options = {
    showTitle: false,
    hoverStop: true,
};

const dataSource = [
    {
        jobName: '1',
        jobStatusName: '已终止',
        jobStatus: 'TERMINATED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '2',
        jobStatusName: '运行结束',
        jobStatus: 'COMPLETED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '3',
        jobStatusName: '运行结束',
        jobStatus: 'COMPLETED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '4',
        jobStatusName: '运行结束',
        jobStatus: 'COMPLETED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '5',
        jobStatusName: '运行结束',
        jobStatus: 'COMPLETED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '6',
        jobStatusName: '运行结束',
        jobStatus: 'COMPLETED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '7',
        jobStatusName: '运行结束',
        jobStatus: 'COMPLETED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '8',
        jobStatusName: '运行结束',
        jobStatus: 'COMPLETED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '9',
        jobStatusName: '运行结束',
        jobStatus: 'COMPLETED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '10',
        jobStatusName: '已终止',
        jobStatus: 'TERMINATED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '11',
        jobStatusName: '运行结束',
        jobStatus: 'COMPLETED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '12',
        jobStatusName: '运行结束',
        jobStatus: 'COMPLETED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '13',
        jobStatusName: '已终止',
        jobStatus: 'TERMINATED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '14',
        jobStatusName: '运行结束',
        jobStatus: 'COMPLETED',
        clusterName: '上海超级计算中心',
    },
    {
        jobName: '15',
        jobStatusName: '运行结束',
        jobStatus: 'COMPLETED',
        clusterName: '上海超级计算中心',
    },
    // {
    //     jobName: '16',
    //     jobStatusName: '运行失败',
    //     jobStatus: 'FAILED',
    //     clusterName: '上海超级计算中心',
    // },
    // {
    //     jobName: '17',
    //     jobStatusName: '运行结束',
    //     jobStatus: 'COMPLETED',
    //     clusterName: '雁塔超算中心',
    // },
    // {
    //     jobName: '18',
    //     jobStatusName: '运行结束',
    //     jobStatus: 'COMPLETED',
    //     clusterName: '雁塔超算中心',
    // },
    // {
    //     jobName: '19',
    //     jobStatusName: '运行结束',
    //     jobStatus: 'COMPLETED',
    //     clusterName: '上海超级计算中心',
    // },
    // {
    //     jobName: '20',
    //     jobStatusName: '运行结束',
    //     jobStatus: 'COMPLETED',
    //     clusterName: '雁塔超算中心',
    // },
];
</script>

<template>
    <div>
        <ScrollList
            :options="options"
            :columns="columns"
            :data-source="dataSource"
            class="w-500px h-400px"
        >
            <template #bodyCell="{ record, column }">
                <template v-if="column.dataIndex === 'jobName'">
                    <span class="c-red">{{ record.jobName }}</span>
                </template>
                <template v-else-if="column.dataIndex === 'jobStatusName'">
                    <span :style="{ color: statusColor[record.jobStatus] }">{{
                        record.jobStatusName
                    }}</span>
                </template>
            </template>
        </ScrollList>
    </div>
</template>

<style scoped>
ul {
    padding: 0;
    margin: 0;
    position: relative;
}
.thead,
.tbody {
    display: grid;
    grid-template-columns: 1fr 120px 120px;
    list-style: none;
}

.thead {
    position: sticky;
    top: 0;
    background-color: #fff;
}

.thead li,
.tbody li {
    padding: 0 8px;
}

.tbody li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
