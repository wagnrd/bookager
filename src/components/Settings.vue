<template>
  <v-container
      v-if="lang"
  >
    <v-row
        align="start"
        justify="center"
    >
      <v-col
          cols="12"
          sm="8"
          md="4"
      >
        <v-card
            elevation="5"
        >
          <v-toolbar
              color="primary"
              flat
          >
            <v-toolbar-title class="font-weight-light">
              <v-icon class="mr-2">mdi-settings</v-icon>
              {{ lang._category.settings }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row
                align="center"
                justify="start"
                class="px-5 pt-1"
            >

              <v-divider class="mr-2" style="max-width: 10px"></v-divider>{{ lang._setting._category.general }}<v-divider class="ml-2"></v-divider>
              <v-col
                  cols="12"
                  class="mb-n4"
              ></v-col>

              <!-- Language settings -->
              <v-col
                  class="mb-n4"
                  cols="12"
                  sm="12"
                  md="6"
              >
                <v-select
                    :items="languages"
                    :label="lang._setting.language"
                    @change="changedLanguage()"
                    v-model="languageSetting"
                    solo
                >
                  <template v-slot:item="{ item }">{{ lang._setting._language[item] }}</template>
                  <template v-slot:selection="{ item }">{{ lang._setting._language[item] }}</template>
                </v-select>
              </v-col>

              <!-----------------
                   Appearance
              ------------------>

              <v-col cols="12"></v-col>
              <v-divider class="mr-2" style="max-width: 10px"></v-divider>{{ lang._setting._category.appearance }}<v-divider class="ml-2"></v-divider>

              <!-- Dark mode -->
              <v-col
                  class="mt-n4"
                  cols="12"
              >
                <v-switch
                    v-model="darkModeSetting"
                    @change="changedDarkMode()"
                    :label="lang._setting.dark_mode"
                ></v-switch>
              </v-col>

              <!-- Color settings -->
              <template v-for="(theme) in themes">
                <v-col
                    :key="theme"
                    class="mt-n4"
                    cols="12"
                >
                  {{ lang._setting._color._theme[theme] }}
                </v-col>
                <v-col
                    v-for="(colorType) in colorTypes"
                    :key="theme + colorType"
                    class="mt-n4 mb-2"
                    cols="auto"
                >
                  <v-dialog max-width="300">
                    <template v-slot:activator="{ on }">
                      <v-btn
                          v-on="on"
                          :color="$vuetify.theme.themes[theme][colorType]"
                          large
                      >
                        {{ lang._setting._color._type[colorType] }}
                      </v-btn>
                    </template>
                    <v-color-picker
                        v-model="$vuetify.theme.themes[theme][colorType]"
                        swatches-max-height="300px"
                        hide-inputs
                        show-swatches
                    ></v-color-picker>
                  </v-dialog>
                </v-col>
              </template>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "Settings",
        props: {
            lang: Object,
            darkMode: Boolean,
        },
        data() {
            return {
                darkModeSetting: false,
                languages: ['de', 'en'],
                languageSetting: "",
                themes: ['light', 'dark'],
                colorTypes: [ 'primary', 'secondary', 'accent' ],
            }
        },
        methods: {
            changedDarkMode() {
                this.$vuetify.theme.dark = this.darkModeSetting;
            }
            ,
            changedLanguage() {
                let newLanguage = require('../languages/' + this.languageSetting + '.json');
                this.$emit('changedLanguage', newLanguage);
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>