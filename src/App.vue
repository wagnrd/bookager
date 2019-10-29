<template>
  <v-app>
    <v-app-bar
        clipped-left
        app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon
          class="mx-1 ml-5"
          large
      >
        mdi-book
      </v-icon>
      <v-toolbar-title class="headline font-weight-light">
        Bookager
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
          @click="activeComponent = Login"
          text
      >
        <v-icon left>mdi-account</v-icon>
        <span class="hidden-xs-only">
          {{ $root.authKey === '' ? lang._category.login : lang._category.account }}
        </span>
      </v-btn>
    </v-app-bar>


    <v-navigation-drawer
        v-model="drawer"
        clipped
        app
    >
      <v-treeview
          :items="$root.authKey === '' ? drawerItemsLoggedOff : drawerItems"
          :active.sync="selectedItem"
          @update:active="changeComponent()"
          expand-icon="mdi-chevron-down"
          class="ma-2"
          hoverable
          open-on-click
          transition
          activatable
          return-object
      >
        <template v-slot:prepend="{ item }">
          <v-icon v-if="item.name === lang._category.dashboard">mdi-view-dashboard</v-icon>
          <v-icon v-if="item.name === lang._category.book_listings">mdi-view-list</v-icon>
          <v-icon v-if="item.name === lang._book._status.unread">mdi-layers</v-icon>
          <v-icon v-if="item.name === lang._book._status.reading">mdi-book-open-page-variant</v-icon>
          <v-icon v-if="item.name === lang._book._status.read">mdi-check-circle</v-icon>
          <v-icon v-if="item.name === lang._book._status.canceled">mdi-delete</v-icon>
          <v-icon v-if="item.name === lang._category.bookshelves">mdi-library-books</v-icon>
          <v-icon v-if="item.name === lang._category.settings">mdi-settings</v-icon>
          <v-icon v-if="item.name === lang._category.login">mdi-login-variant</v-icon>
          <v-icon v-if="item.name === lang._category.registration">mdi-account-plus</v-icon>
          <v-icon v-if="item.name === lang._bookshelves.all_books">mdi-book-multiple</v-icon>
        </template>
      </v-treeview>
    </v-navigation-drawer>

    <v-content app>
      <component
          :is="activeComponent"
          :lang="lang"
          :bus="childBus"
          @changedLanguage="languageSetting => this.lang = languageSetting"
      ></component>
      <Settings/>
    </v-content>
  </v-app>
</template>

<script>
    import Vue from 'vue'
    import Bookshelves from './components/Books';
    import Login from './components/Login';
    import Settings from './components/Settings';
    import Books from "@/components/Books";

    export default {
        name: 'App',
        components: {
            Bookshelves,
            Login,
            Settings,
        },
        data() {
            return {
                lang: require('./languages/de.json'),
                drawer: true,
                activeComponent: Books,
                selectedItem: [],
                childBus: new Vue()
            }
        },
        computed: {
            drawerItemsLoggedOff() {
                return [
                    {
                        id: 1,
                        name: this.lang._category.login,
                        activatingComponent: Login

                    },
                    {
                        id: 2,
                        name: this.lang._category.registration
                    }
                ]
            },

            drawerItems() {
                return [
                    {
                        id: 1,
                        name: this.lang._category.dashboard,
                    },
                    {
                        id: 2,
                        name: this.lang._category.book_listings,
                        children: [
                            {id: 3, name: this.lang._book._status.unread, activatingComponent: Books},
                            {id: 4, name: this.lang._book._status.reading, activatingComponent: Books},
                            {id: 5, name: this.lang._book._status.read, activatingComponent: Books},
                            {id: 6, name: this.lang._book._status.canceled, activatingComponent: Books},
                        ]
                    },
                    {
                        id: 7,
                        name: this.lang._category.bookshelves,
                        activatingComponent: Bookshelves,
                        children: [
                            {name: this.lang._bookshelves.all_books, activatingComponent: Books}
                        ].concat(this.$root.bookshelves)
                    },
                    {
                        id: 8,
                        name: this.lang._category.settings,
                        activatingComponent: Settings,
                    },
                ]
            }
        },
        mounted() {
            this.$root.getAllBookshelves();
        },
        methods: {
            changeComponent() {
                if (this.selectedItem[0]) {
                    this.activeComponent = this.selectedItem[0].activatingComponent;
                    this.childBus.$emit('init', this.selectedItem[0]);

                    // hide drawer on click if drawer switches to temporary (as of size md)
                    if (window.innerWidth < 1264)
                      this.drawer = false;
                }
            }
        }
    };
</script>
