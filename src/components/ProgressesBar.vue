<template>
        <v-progress-linear
                v-if="state != 'start'"
                :value="power"
                :color="isColorBar"
                height="30"
        >
                <template v-slot="{ value }">
                        <strong :class="{'text-white': power >= 50}">{{ Math.ceil(value) }}%</strong>
                </template>
        </v-progress-linear>

</template>
<script>
    export default {
        props:['power', 'stats', 'state'],
        errorCount: null,
        computed: {
                isColorBar() {
                        if(this.power == 100) {
                                if(this.stats.error > 0 || this.stats.notPressed > 0) {
                                        return 'red'
                                } else {
                                        return 'green'
                                }
                        }
                },
                resQuest() {
                        return (this.stats.success + this.stats.error + this.stats.notPressed) - (this.stats.error + this.stats.notPressed)
                }
        },
        created() {}
    }
</script>