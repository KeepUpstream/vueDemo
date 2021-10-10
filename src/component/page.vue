<template>
    <div class="page-container">
        <span v-for="(item,index) in pageSize" :key="item.id">
            <span>{{index}}</span>
        </span>
    </div>
</template>

<script>
export default {
    name: 'page',
    props: {
        currentPage: Number,
        totalPage: Number,
        pageSize: Number,
        total: Number,
        disabled: Boolean,
        currentChange: Function,
        sizeChange: Function,
        prevClick: Function,
        nextClick: Function
    },
    data: function(){
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>>

</style>