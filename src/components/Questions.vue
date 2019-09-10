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
                            <h1 class="mb-10">Questions</h1>
                            <v-alert
                                    color="blue"
                                    dark
                                    transition="scale-transition"
                            >

                                <div v-if="operator === 'mix'" class="headline mt-10 mb-10">{{x}} {{operatorMutate}} {{y}} = ?</div>
                                <div v-else class="headline mt-10 mb-10">{{x}} {{operator}} {{y}} = ?</div>
                                <div class="text-center mb-10 mt-10 ">

                                    <v-btn
                                            color="primary"
                                            class="mr-2 mb-2"
                                            v-for="(item, idx) of answer"
                                            @click="onAnswer(item)"
                                            :key="idx"
                                    >
                                        {{item}}
                                    </v-btn>

                                </div>
                                <div class="text-center mb-10 mt-10">
                                    <v-badge
                                            v-model="showTime"
                                            :color="colorTimer"
                                            class="timer-block"
                                    >
                                        <template v-slot:badge>
                                            <span
                                                    :class="{'text-white': filterTime <= 3}"
                                                    class="timer-number"
                                            >:&nbsp;{{filterTime}}</span>
                                        </template>
                                    </v-badge>
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
        props:['settings', 'operator'],
        data() {
            return {
                operand: null,
                operatorMutate: null,
                showTime: true,
                randArr: [
                  '+',
                  '-',
                  '*',
                  '/'
                ],
                x: mtRand(this.settings.to, this.settings.from),
                y: mtRand(this.settings.to, this.settings.from),
                time: this.settings.time,
                filterTime: null
            }
        },
        filters: {},
        computed: {
            isOperator() {
              switch (this.operator) {
                case '+':
                  return this.x + this.y
                  break;
                case '-':
                  return this.x - this.y
                  break;
                case '*':
                  return this.x * this.y
                  break;
                case '/':
                  return this.x / this.y
                  break;
                case 'mix':
                  console.log('Mix MODE: ')
                  if(randomMethod(this.randArr) === '+'){
                    this.operatorMutate = '+'
                    console.log('MODE +')
                    return this.x + this.y
                  }
                  else if(randomMethod(this.randArr) === '-'){
                    this.operatorMutate = '-'
                    console.log('MODE -')
                    return this.x - this.y
                  }
                  else if(randomMethod(this.randArr) === '*'){
                    this.operatorMutate = '*'
                    console.log('MODE *')
                    return this.x * this.y
                  }
                  else if(randomMethod(this.randArr) === '/'){
                    this.operatorMutate = '/'
                    console.log('MODE /')
                    return this.x / this.y
                  } else {
                    this.operatorMutate = '+'
                    return this.x + this.y
                  }
                  break;
                default:
                  return this.x + this.y
              }
            },
            good() {
                return this.isOperator
            },
            answer() {
                let res = [this.good]
                while(res.length < this.settings.variants) {
                   let rand = mtRand(this.good - this.settings.range, this.good + this.settings.range)
                   if(res.indexOf(rand) === -1) res.push(rand)
                }
                return res.sort()
            },
            colorTimer() {
               switch (this.filterTime) {
                case 3:
                  return 'red accent-1'
                  break;
                case 2:
                  return 'red accent-3'
                  break;
                case 1:
                  return 'red accent-4'
                  break;
                default:
                  return 'white'
              }
            }
        },
        methods: {
            onAnswer(n) {
                (n == this.good)
                    ? this.$emit('success')
                    : this.$emit('error', `Неверно: ${this.x} ${(this.operator === 'mix' ? this.operatorMutate : this.operator)} ${this.y} = ${this.good} !!`)
            },

            tick() {
              setTimeout(()=>{
                this.$emit('endTime', `Нет ответа`)
              }, this.time)
              // повторить с интервалом 1 секунду
              let timerId = setInterval(() => this.filterTime--, 1000);
              // остановить вывод через 5 секунд
              setTimeout(() => { clearInterval(timerId) }, this.time);
            }
        },
        created() {
            this.filterTime = this.time / 1000
        },
        beforeMount() {
          this.tick()
        }
    }
    let mtRand = (min, max) => {
        let diff = max - min
        return Math.floor(Math.random() * (diff + 1)) + min
    }
    let randomMethod = (arr) => {
      return arr[Math.floor(Math.random() * 4)]
    }
</script>

<style>
    .timer-block .v-badge__badge{
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
    .timer-number {
        color: #000000;
        font-weight: bold;
        font-size: 1.4em;
    }
    .time-i {
        margin-right: 30px;
    }
    .text-white {
        color: #ffffff;
    }
</style>