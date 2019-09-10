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
                                sm12
                                md12
                        >
                            <!--<h1 class="mb-10">Complete</h1>-->
                            <v-alert
                                    :color="successColor"
                                    dark
                                    transition="scale-transition"

                            >
                                <div class="headline text-left mt-10 mb-10">Ваши результаты: </div>
                                <div class="text-left mb-10 mt-10">
                                    <div>Верных ответов: {{stats.success}}</div>
                                </div>
                                <div class="text-left mb-10 mt-10">
                                    <div>Не верных ответов: {{stats.error}}</div>
                                </div>
                                <div class="text-left mb-10 mt-10">
                                    <div>Не дали ответ на: {{stats.notPressed}}</div>
                                </div>
                                <div class="text-left mb-10 mt-10">
                                    <div>Итог: {{doneMessage}}</div>
                                </div>
                                <div class="text-center mb-10 mt-10">

                                    <v-btn
                                            color="primary"
                                            class="mr-2"
                                            @click="$emit('repeat')"
                                    >
                                        <v-icon>mdi-update</v-icon>
                                    </v-btn>
                                    <v-btn
                                            color="primary"
                                            class="mr-2"
                                            :disabled="disable"
                                            @click="$emit('nextLevel')"
                                    >
                                        {{ textButtonMode }}
                                    </v-btn>
                                </div>
                                <div v-if="disable">
                                    <v-btn
                                            color="primary"
                                            class="mr-2"
                                            :disabled="!disable"
                                            @click="$emit('restart')"
                                    >
                                        Начать заново
                                    </v-btn>
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
        props: ['stats', 'finish', 'checkFinish'],
        data:() => ({

        }),
        computed: {
            successColor() {
              return (this.stats.error == 0 && this.stats.notPressed == 0) ? 'green' :
                     (this.stats.error == 1 || this.stats.notPressed == 1) ? 'orange' :
                     (this.stats.error >= 2 || this.stats.notPressed >= 2) ? 'red accent-4' :'red accent-4'
            },
            doneMessage() {
                return (this.stats.error == 0 && this.stats.notPressed == 0) ? 'Отличный результат!' :
                  'Потренируйтесь еще!'
            },
            textButtonMode() {
                return (this.finish === this.checkFinish-1) ? 'Достаточно уже!' : 'Режим GodMode! +'
            },
            disable() {
                return (this.finish === this.checkFinish-1)
            }
        },
        created() {
        }
    }
</script>

<style scoped>

</style>