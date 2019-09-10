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
                            <div>
                                <v-alert
                                        :value="alert"
                                        color="blue"
                                        dark
                                        transition="scale-transition"

                                >
                                    <div class="headline mt-5 mb-2">Вы готовы к тестированию? :)</div>
                                    <div class="text-center mb-5 mt-5">
                                        <p>Выберите тип операции: </p>
                                        <v-select
                                                :items="operator"
                                                label="Тип операции"
                                                v-model="operatorChange"
                                                filled
                                        >
                                        </v-select>
                                        <p>Выберите уровень сложности: </p>
                                        <v-select
                                                :items="lengthLevel"
                                                label="Сложность"
                                                v-model="selectLevel"
                                                filled
                                        ></v-select>
                                        <p>Выберите количество примеров: </p>
                                        <v-select
                                                :items="countExample"
                                                label="Кол-во примеров"
                                                v-model="selectExample"
                                                filled
                                        ></v-select>

                                        <v-btn
                                                color="primary"
                                                @click="$emit('initStart', selectLevel, selectExample, operatorChange)"
                                        >
                                            Поехали
                                        </v-btn>

                                    </div>
                                </v-alert>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>
    export default {
        props: ['lengthlevel'],
        data() {
            return {
                alert: true,
                operator: [
                  {
                    text: 'Сложение',
                    value: '+'
                  },
                  {
                    text: 'Вычитание',
                    value: '-'
                  },
                  {
                    text: 'Умножение',
                    value: '*'
                  },
                  {
                    text: 'Деление',
                    value: '/'
                  },
                  {
                    text: 'Смешанное',
                    value: 'mix'
                  }
                ],
                operatorChange: '+',
                lengthLevelArr: [],
                selectLevel: null,
                selectExample: 3,
                countExample: [3,4,5,6,7,8,9,10]
            }
        },
        computed: {
            lengthLevel() {
                for(let i = 0; i < this.lengthlevel.length; i++) {
                    //this.lengthLevelArr.push(i+1)
                    this.lengthLevelArr.push({
                        text: i+1 + ' уровень',
                        value: i+1
                    })
                }
                return this.lengthLevelArr
            },
        },
        methods: {},
        beforeMount() {
            console.log(this.lengthlevel)
        }
    }
</script>

<style scoped>

</style>