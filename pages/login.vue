<template>
  <v-lazy>
    <div>
      <v-overlay class="fill-height" :value="isLoading">
        <loading v-if="isLoading" />
      </v-overlay>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <div class="text-center">
              <logo />
            </div>
            <v-card class="elevation-12 transparent" style="border-radius: 35px">
              <v-card-text style="text-align: center">
                <v-form @submit.prevent="onSubmit" novalidate class="needs-validation">
                  <v-text-field
                    label="Usuário"
                    v-model="username"
                    class="text-white font-weight-bold"
                  >
                    <template v-slot:label>
                      <!-- <v-icon style="vertical-align: middle;color: #fff">far fa-user</v-icon> -->
                      <strong style="font-size:15pt;color: #fff">Usuário</strong>
                    </template>
                  </v-text-field>
                  <v-text-field
                    v-model="password"
                    type="password"
                    class="text-white font-weight-bold"
                  >
                    <template v-slot:label>
                      <!-- <v-icon style="vertical-align: middle;color: #fff">fas fa-lock</v-icon> -->
                      <strong style="font-size:15pt;color: #fff">Senha</strong>
                    </template>
                  </v-text-field>
                  <v-btn
                    color="white"
                    class="font-weight-bold"
                    text
                    to="/esqueci-minha-senha"
                  >Esqueceu sua senha?</v-btn>

                  <div class="mr-2" style="text-align: right;margin-top: 13px">
                    <v-btn type="submit" color="blue" dark large>
                      <span style="margin-left: 10px">Entrar</span>
                      <!-- <v-icon style="margin-left: 10px">fas fa-arrow-right</v-icon> -->
                    </v-btn>
                  </div>
                </v-form>
              </v-card-text>
              <v-divider />
              <v-card-text style="text-align: center">
                <strong
                  style="color: white;font-size: 13pt"
                  class="font-weight-bold"
                >Ainda não tem cadastro?</strong>
                <div class="mr-2" style="text-align: center;margin-top: 10px">
                  <v-btn to="/cadastro" color="purple" rounded dark large>
                    <span style="margin-left: 10px;margin-right: 10px">Cadastre-se</span>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-lazy>
</template>
<script>
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
export default {
  components: { Loading, Logo },
  data: () => ({
    username: "",
    password: "",
  }),
  mounted() {
    if (this.$store.state.isAuthenticated) {
      this.$router.push("/");
    }
  },
  //   watch: {
  //     isLoading(value) {
  //       setTimeout(() => {
  //         if (this.$store.state.isAuthenticated) {
  //           this.$router.push('/inspire')
  //         }
  //         // if (this.$store.state.forgotten) {
  //         //   return this.$functions.goTo("recuperar-senha");
  //         // }
  //         this.$swal.fire({
  //           title: "Ops!",
  //           text: "Clique em voltar para continuar",
  //           icon: "error",
  //           confirmButtonText: "Voltar",
  //         });
  //       }, 300);
  //     },
  //   },
  methods: {
    onSubmit() {
      if (!this.username || !this.password) {
        return;
      }
      //   let form = { username: this.username, password: this.password };
      //   this.$store.dispatch("login", form);
      this.$store.commit('SET_LOADING', true)
      this.$router.push("/inspire");
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>
