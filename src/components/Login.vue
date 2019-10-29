<template>
  <v-container v-if="lang">
    <v-row
        align="start"
        justify="center"
    >
      <v-col
          cols="12"
          sm="6"
          md="5"
          lg="4"
          xl="3"
      >
        <v-card elevation="5">
          <v-toolbar
              color="primary"
              flat
          >
            <v-toolbar-title class="font-weight-light">
              <v-icon class="mr-2">mdi-settings</v-icon>
              {{ lang._category.login }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row
                align="center"
                justify="start"
                class="px-5 pt-1"
            >
              <v-col
                  cols="12"
                  class="mb-n8"
              >
                <v-alert
                    :value="!loginSuccess"
                    type="error"
                    transition="fade-transition"
                >
                  {{ lang._login.login_failure }}
                </v-alert>
                <v-text-field
                    v-model="username"
                    :placeholder="lang._login.username"
                    solo
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  class="mb-n8"
              >
                <v-text-field
                    v-model="password"
                    :placeholder="lang._login.password"
                    type="password"
                    solo
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="loginSuccess = $root.login(username, password)"
                color="primary"
                text
            >
              <v-icon left>mdi-login-variant</v-icon>
              {{ lang._login.login }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "Login",
        props: {
            lang: Object
        },
        data() {
            return {
                username: '',
                password: '',
                loginSuccess: true
            }
        }
    }
</script>

<style scoped>

</style>