<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn @click="toggle" icon>
        <v-icon>{{!$vuetify.theme.dark ? 'mdi-flashlight' : 'mdi-flashlight-off'}}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-overlay class="fill-height" :value="isLoading">
        <loading v-if="isLoading" />
      </v-overlay>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Loading from "@/components/Loading";
export default {
  components: { Loading },
  data() {
    return {
      title: "Rinha-mon"
    };
  },

  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    showBar() {
      return ["home", "login"].includes(this.$route.name);
    },
    avatar() {
      return require(`../static/icon.png`);
    },
    isMobile() {
      return this.$store.state.isMobile;
    }
  },

  methods: {
    toggle() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    onResize() {
      let isMobile = window.innerWidth < 600;
      this.$store.commit("CHECK_MOBILE", isMobile);
    },
    logout() {
      this.$router.push("/login");
      setTimeout(() => {
        this.$store.commit("LOGOUT");
      }, 300);
    }
  }
};
</script>
