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
    </v-app-bar>

    <v-spacer></v-spacer>

    <v-navigation-drawer
        v-model="drawer"
        clipped
        app
    >
      <v-treeview
          :items="drawerItems"
          :active.sync="selectedItem"
          @update:active="activeComponent = selectedItem[0].activatingComponent"
          expand-icon="mdi-chevron-down"
          class="ma-2"
          hoverable
          open-on-click
          transition
          activatable
          return-object
      >
        <template v-slot:prepend="{ item }">
          <v-icon v-if="item.name === lang._category.book_listings">mdi-view-list</v-icon>
          <v-icon v-if="item.name === lang._book._status.unread">mdi-layers</v-icon>
          <v-icon v-if="item.name === lang._book._status.reading">mdi-book-open-page-variant</v-icon>
          <v-icon v-if="item.name === lang._book._status.read">mdi-check-circle</v-icon>
          <v-icon v-if="item.name === lang._book._status.canceled">mdi-delete</v-icon>
          <v-icon v-if="item.name === lang._category.book_shelves">mdi-library-books</v-icon>
          <v-icon v-if="item.name === lang._category.settings">mdi-settings</v-icon>
        </template>
      </v-treeview>
    </v-navigation-drawer>

    <v-content app>
      <component
          :is="activeComponent"
          :lang="lang"
          @changedLanguage="languageSetting => this.lang = languageSetting"
      ></component>
      <Settings/>
    </v-content>
  </v-app>
</template>

<script>
    import Settings from './components/Settings';

    export default {
        name: 'App',
        components: {
            Settings,
        },
        data() {
            return {
                lang: require('./languages/de.json'),
                drawer: true,
                activeComponent: Settings,
                components: {
                    settings: Settings,
                },
                selectedItem: [],
            }
        },
        computed: {
            drawerItems() {
                return [
                    {
                        id: 1,
                        name: this.lang._category.book_listings,
                        children: [
                            { id: 2, name: this.lang._book._status.unread, activatingComponent: {} },
                            { id: 3, name: this.lang._book._status.reading, activatingComponent: {} },
                            { id: 4, name: this.lang._book._status.read, activatingComponent: {} },
                            { id: 5, name: this.lang._book._status.canceled, activatingComponent: {} },
                        ]
                    },
                    {
                        id: 6,
                        name: this.lang._category.book_shelves
                    },
                    {
                        id: 7,
                        name: this.lang._category.settings,
                        activatingComponent: this.components.settings,
                    },
                ]
            }
        },
    };
</script>
