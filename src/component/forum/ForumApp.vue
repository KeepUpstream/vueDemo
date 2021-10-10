<template>
    <div>
        <header class="site-header jumbotron">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h1>请发表对Vue的评论</h1>
                    </div>
                </div>
            </div>
        </header>
        <div class="container">
            <Add/>
            <List/>
        </div>
    </div>
</template>

<script>
import Add from './Add.vue'
import List from './List.vue'

export default {
    //将组件映射成标签
    components:{
        Add,
        List
    }
}
</script>

<style>

</style>
