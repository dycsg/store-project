<template>
    <div>
        
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: 'MoviE',

    data() {
        return {
            data: []
        };
    },
    mounted() {
        axios({
            method: "get",
            url: "https://api.apilyzy.com/api.php/provide/vod/",
        }).then(res => {
            this.data = res.data;
        })
    },
    methods: {
    },
};
</script>

<style lang="css" scoped>

</style>