<template>
  <v-layout>
    <v-flex class="text-center">
      <v-container fluid>
        <v-btn @click="getPokemon('action')" color="yellow" icon>
          <v-icon size="45">fas fa-sync</v-icon>
        </v-btn>
        <v-row v-if="render">
          <v-col :class="stylePkOne" cols="6" sm="4">
            <v-card>
              <div class="title mb-1">{{fighterOne.name}}</div>
              <div class="subheading">{{fighterOne.types.map(res => res.type.name).join()}}</div>
              <v-img aspect-ratio="2" contain :src="imageFighterOne"></v-img>
              <v-card-text>
                <span>Lvl. {{fighterOne.base_experience}}</span>
                <v-progress-linear
                  v-for="(stat, i) in fighterOne.stats"
                  :key="i"
                  :value="stat.base_stat"
                  color="amber"
                  height="25"
                >
                  <strong>{{stat.stat.name }}</strong>
                </v-progress-linear>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="6" sm="4">
            <v-card-text style="margin-top: 25%" :class="styleVersus">
              <span v-if="!endTime">VS</span>

              <div v-if="endTime" style="margin-top: 10%;">
                <h4 style="margin-bottom: 4%" v-if="!Array.isArray(battleWinner)">Winner</h4>
                <span
                  class="headline"
                >{{Array.isArray(battleWinner) ? 'is a draw' : battleWinner.name}}</span>
              </div>
              <div v-if="start" style="margin-top: 10%">
                <CountdownTimer ref="countDown" :timeLimit="time" />
              </div>
            </v-card-text>
          </v-col>

          <v-col :class="stylePkTwo" cols="6" sm="4">
            <v-card>
              <div class="title mb-1">{{fighterTwo.name}}</div>
              <div class="subheading">{{fighterTwo.types.map(res => res.type.name).join()}}</div>
              <v-img aspect-ratio="2" contain :src="imageFighterTwo"></v-img>
              <v-card-text>
                <span>Lvl. {{fighterTwo.base_experience}}</span>
                <v-progress-linear
                  v-for="(stat, i) in fighterTwo.stats"
                  :key="i"
                  :value="stat.base_stat"
                  color="amber"
                  height="25"
                >
                  <strong>{{stat.stat.name }}</strong>
                </v-progress-linear>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div :class="stylePkTwo">
          <v-btn
            v-if="render && !start && !endTime"
            outlined
            @click="onStart()"
            color="dark"
            large
          >START</v-btn>
        </div>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import CountdownTimer from "@/components/CountdownTimer";
export default {
  components: { CountdownTimer },
  data() {
    return {
      render: false,
      stylePkOne: ["animate__animated"],
      stylePkTwo: ["animate__animated"],
      styleVersus: ["text-versus", "animate__animated"],
      knowledge: 1,
      start: false,
      time: 10,
      endTime: false
    };
  },
  mounted() {
    this.getPokemon();
  },
  watch: {
    fighterOne(val) {
      if (val) {
        setTimeout(async () => {
          this.render = true;
          const arrClass = [
            "animate__backInLeft",
            "animate__backInRight",
            "animate__zoomInUp"
          ];
          await this.arrProps(arrClass);
        }, 600);
      }
    }
  },
  computed: {
    fighterOne() {
      return this.$store.state.battle.fighter_one;
    },
    fighterTwo() {
      return this.$store.state.battle.fighter_two;
    },
    imageFighterOne() {
      return (
        this.fighterOne.sprites.front_default ||
        require(`../static/default_image.png`)
      );
    },
    imageFighterTwo() {
      return (
        this.fighterTwo.sprites.front_default ||
        require(`../static/default_image.png`)
      );
    },

    battleWinner() {
      const arrFighter = [this.fighterOne, this.fighterTwo];
      const stats = arrFighter.reduce((prev, curr) => [prev.stats, curr.stats]);
      let countHits = [];
      stats.reduce((prev, curr) => {
        let prevArr = prev.map(res => res.base_stat);
        let currArr = curr.map(res => res.base_stat);
        prevArr.forEach((val, index) => {
          let count = val > currArr[index];
          if (count) {
            countHits.push(count);
          }
        });
      });
      return countHits.length >= 4
        ? this.fighterOne
        : countHits.length < 3
        ? this.fighterTwo
        : arrFighter;
    }
  },
  methods: {
    async getPokemon(event) {
      if (event) {
        this.start = false;
        this.endTime = false;
        const arrClass = [
          "animate__backOutLeft",
          "animate__backOutRight",
          "animate__zoomOutDown"
        ];
        await this.arrProps(arrClass, "exit");
      }
      this.$store.dispatch("getPokemon");
    },
    arrProps(arrClass, out) {
      let arrAnimate = [this.stylePkOne, this.stylePkTwo, this.styleVersus];
      arrAnimate.forEach((res, i) => {
        res.push(arrClass[i]);
        setTimeout(() => {
          if (out) {
            this.render = false;
          }
          res.pop();
        }, 600);
      });
    },
    onStart() {
      this.start = !this.start;
      setTimeout(() => {
        this.timeLeft();
      }, 400);
    },
    timeLeft() {
      this.$watch(
        () => {
          return this.$refs.countDown ? this.$refs.countDown.timeLeft : 0;
        },
        val => {
          !val ? ((this.start = false), (this.endTime = true)) : "";
        }
      );
    }
  }
};
</script>
<style>
.text-versus {
  font-size: 42pt;
  color: #c0c0c0;
}
</style>
