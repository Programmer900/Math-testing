<template>
    <div>
        <v-app id="inspire">
            <v-content>
                <v-container
                >
                    <v-layout
                            align-center
                            justify-center
                            text-center
                    >
                        <v-flex
                                xs12
                                sm8
                                md4
                        >
                            <h1 class="mb-10">Message</h1>
                            <v-alert
                                    :color="isType"
                                    dark
                                    transition="scale-transition"

                            >
                                <div class="headline mt-10 mb-10">{{ text }}</div>
                                <div class="text-center mb-10 mt-10">

                                    <v-btn
                                            color="primary"
                                            class="mr-2"
                                            @click="$emit('onNext')"
                                    >
                                        Continue
                                    </v-btn>

                                </div>
                                <div class="text-center mb-10 mt-10">
                                    Окно закроется через: {{filterTime}} секунд
                                </div>
                            </v-alert>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>
    export default {
        props: ['type', 'text'],
        data:() => ({
            time: 6000,
            filterTime: null
        }),
        filters: {
          seconds(val) {
              return val / 1000
          }
        },
        computed: {
            isType() {
                return (this.type === 'success' ? 'green' : 'red')
            },
        },
        created() {
            setTimeout(()=>{
                this.$emit('onNext')
            }, this.time)
            this.filterTime = this.time / 1000
        },
        beforeMount() {
            // повторить с интервалом 1 секунду
            let timerId = setInterval(() => this.filterTime--, 1000);
            // остановить вывод через 5 секунд
            setTimeout(() => { clearInterval(timerId) }, this.time);
        }
    }
</script>

<style scoped>

</style>