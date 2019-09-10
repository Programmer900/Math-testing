<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>A.Chernenko </span>
        <span class="font-weight-light">Math Training. <span v-if="state != 'start'">Level {{ level + 1 }}</span></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
                  icon
                  @click.stop="dialog = true"
                  v-on="on"
                  v-if="state != 'start'"
          >
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </template>
        <span>Завершить тестирование!</span>
      </v-tooltip>
    </v-app-bar>
    <v-content>
      <div class="box">
        <progresses-bar
                :power="progressStyles"
                :stats="stats"
                :state="state"
        >
        </progresses-bar>
        <transition name="flip" mode="out-in">
          <start
                  v-if="state == 'start'"
                  @onStart="onStart"
                  @initStart="initStart"
                  :lengthlevel="levels"
          ></start>
          <questions
                  v-else-if="state == 'questions'"
                  @success="onQuestSuccess"
                  @error="onQuestError"
                  @endTime="endTime"
                  :settings="levels[level]"
                  :operator="operator"
          ></questions>
          <message
                  v-else-if="state == 'message'"
                  :text="message.text"
                  :type="message.type"
                  @onNext="onNext"
          ></message>
          <complete
                  v-else-if="state == 'complete'"
                  :stats="stats"
                  @repeat="repeat"
                  @nextLevel="nextLevel"
                  @restart="restart"
                  :finish="level"
                  :checkFinish="levels.length"
          ></complete>
          <div v-else class="error pt-10 pb-10 text-center text-uppercase font-weight-bold lighten-1">Not a status</div>
        </transition>
      </div>
    </v-content>
    <v-dialog
            v-model="dialog"
            max-width="500"
    >
      <v-card>
        <v-card-title class="headline">Вы действительно хотите завершить текущее тестирование?</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
          >
            Нет
          </v-btn>

          <v-btn
                  color="green darken-1"
                  text
                  @click="routerStart"
          >
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    components: {},
    data: () => ({
      th: this,
      dialog: false,
      state: "start",
      operator: '',
      message: {
        type: '',
        text: ''
      },
      status: 12,
      stats: {
        success: 0,
        error: 0,
        notPressed: 0
      },
      questMax: 4,
      level: 0,
      levels: [
        {
          variants: 2,
          from: 10,
          to: 50,
          range: 5,
          time: 8000
        },
        {
          variants: 4,
          from: 100,
          to: 200,
          range: 20,
          time: 10000
        },
        {
          variants: 6,
          from: 500,
          to: 1500,
          range: 40,
          time: 12000
        },
        {
          variants: 10,
          from: 100,
          to: 2000,
          range: 100,
          time: 15000
        },
        {
          variants: 14,
          from: 100,
          to: 10000,
          range: 600,
          time: 15000
        }
      ]
    }),
    computed: {
      questDone() {
        return this.stats.success + this.stats.error + this.stats.notPressed
      },
      progressStyles() {
        return (this.questDone / this.questMax * 100)
      }
    },
    methods: {
      routerStart() {
        this.dialog = false
        this.state = 'start'
        this.level = 0
        this.stats.success = 0
        this.stats.error = 0
        this.stats.notPressed = 0
      },
      initStart(l ,c, o) {
        if(l === null) {
          this.level = 0
          this.operator = o
          this.questMax = c
          this.state = "questions"
        } else {
          this.level = l - 1
          this.operator = o
          this.questMax = c
          this.state = "questions"
        }
      },
      onStart(){
        this.state = "questions"
      },
      onQuestSuccess() {
        this.state = 'message'
        this.message.text = 'Хорошая работа!'
        this.message.type = "success"
        this.stats.success++
      },
      onQuestError(msg) {
        this.state = 'message'
        this.message.text = msg
        this.message.type = "error"
        this.stats.error++
      },
      endTime(msg) {
        console.log('EndTime')
        this.state = 'message'
        this.message.text = msg
        this.message.type = "error"
        this.stats.notPressed++
      },
      onNext() {
        if(this.questDone < this.questMax) {
          this.onStart()
        } else {
          this.state = "complete"
        }
      },
      repeat() {
        this.onStart()
        this.stats.success = 0
        this.stats.error = 0
        this.stats.notPressed = 0
      },
      restart() {
        this.onStart()
        this.level = 0
        this.stats.success = 0
        this.stats.error = 0
        this.stats.notPressed = 0
      },
      nextLevel() {
        this.level++
        if(this.level === this.levels.length) {
          this.level = 0
          this.onStart()
          this.stats.success = 0
          this.stats.error = 0
          this.stats.notPressed = 0
        } else {
          this.onStart()
          this.stats.success = 0
          this.stats.error = 0
          this.stats.notPressed = 0
        }
      }
    },
    created() {
    },
    mounted() {
    }
  };
</script>
<style>
  .flip-enter {

  }

  .flip-enter-active {
    -webkit-animation: flipInX 0.3s linear;
    -o-animation: flipInX 0.3s linear;
    animation: flipInX 0.3s linear;
  }

  .flip-leave {

  }

  .flip-leave-active {
    -webkit-animation: flipOutX 0.3s linear;
    -o-animation: flipOutX 0.3s linear;
    animation: flipOutX 0.3s linear;
  }

  @keyframes flipInX {
    from{transform: rotateX(90deg)}
    to{transform: rotateX(0deg)}
  }

  @keyframes flipOutX {
    from{transform: rotateX(0deg)}
    to{transform: rotateX(90deg)}
  }

  .text-white {
    color: #fff;
  }

  .text-black {
    color: #000;
  }

</style>
