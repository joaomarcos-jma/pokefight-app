<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <div class="center-block logo;">
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img v-if="avatar" :src="avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              class="font-weight-bold"
              style="font-size: 14pt;"
            >{{ 'USER DEFAULT' }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <div>
          <v-divider></v-divider>
        </div>

        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon color="#fff">mdi-exit-to-app</v-icon>
            <span class="font-weight-bold color-white" style="margin-left: 25px">Sair</span>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="!showBar" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      clipped: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      title: "Default Template",
    };
  },

  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },

  mounted() {
    if (this.isMobile) {
      this.miniVariant = true;
    }
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  computed: {
    showBar() {
      return ["home", "login"].includes(this.$route.name)
     // return this.$store.state.isAuthenticated;
    },
    avatar() {
      return require(`../static/icon.png`);
    },
    isMobile() {
      return this.$store.state.isMobile;
    },
  },

  methods: {
    onResize() {
      let isMobile = window.innerWidth < 600;
      this.$store.commit("CHECK_MOBILE", isMobile);
    },
    logout() {
      this.$router.push("/login");
      setTimeout(() => {
        this.$store.commit("LOGOUT");
      }, 300);
    },
  },
};
</script>
