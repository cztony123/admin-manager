<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    created(){
		this.$store.commit('initUser')
	}
}
</script>
<style lang="scss">
	html, body, #app{
		margin: 0;
		padding: 0;
	}
</style>