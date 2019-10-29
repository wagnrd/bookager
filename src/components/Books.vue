<template>
  <v-container
      v-if="lang"
      class="my-md-0 my-n2"
  >

    <v-row
        align="start"
        justify="start"
    >
      <v-col
          v-for="book in $root.books"
          :key="book.id"
          xs="12"
          sm="12"
          md="12"
          lg="12"
          xl="6"
      >
        <v-card class="my-md-n1 my-n2 px-md-4 px-2" @click.stop="bookClicked(book)">
          <v-row
              align="center"
              justify="start"
          >
            <v-col
                style="max-width: 80px"
                class="text-center"
            >
              <svg style="width:80px;height:80px" viewBox="0 0 24 24">
                <path fill="#777"
                      d="M21,5C19.89,4.65 18.67,4.5 17.5,4.5C15.55,4.5 13.45,4.9 12,6C10.55,4.9 8.45,4.5 6.5,4.5C4.55,4.5 2.45,4.9 1,6V20.65C1,20.9 1.25,21.15 1.5,21.15C1.6,21.15 1.65,21.1 1.75,21.1C3.1,20.45 5.05,20 6.5,20C8.45,20 10.55,20.4 12,21.5C13.35,20.65 15.8,20 17.5,20C19.15,20 20.85,20.3 22.25,21.05C22.35,21.1 22.4,21.1 22.5,21.1C22.75,21.1 23,20.85 23,20.6V6C22.4,5.55 21.75,5.25 21,5M21,18.5C19.9,18.15 18.7,18 17.5,18C15.8,18 13.35,18.65 12,19.5V8C13.35,7.15 15.8,6.5 17.5,6.5C18.7,6.5 19.9,6.65 21,7V18.5Z"/>
              </svg>
            </v-col>

            <v-col cols="7" class="ml-2">
              <v-row>
                <v-card-text>
                  <v-col
                      cols="12"
                      class="mb-n5 mt-n2"
                      style="font-size: large"
                  >
                    {{ book.title }}
                  </v-col>
                  <v-col
                      cols="12"
                      class="mb-n4 font-weight-light"
                      style="font-size: medium"
                  >
                    {{ book.author }}
                  </v-col>
                </v-card-text>
              </v-row>
            </v-col>

            <v-col class="text-right">
              <v-rating
                  v-model="book.rating"
                  half-increments
                  readonly
              ></v-rating>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
        v-model="showBook"
        max-width="900px"
    >
      <v-card>
        <v-btn
            @click="showBook = false"
            class="ma-4"
            icon
            absolute
        >
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
        <v-card-text class="mb-n8">
          <v-container>
            <v-row>
              <v-col
                  style="max-width: 250px"
                  class="text-center mr-8"
              >
                <svg style="width:250px;height:350px" viewBox="0 0 24 24">
                  <path fill="#777"
                        d="M21,5C19.89,4.65 18.67,4.5 17.5,4.5C15.55,4.5 13.45,4.9 12,6C10.55,4.9 8.45,4.5 6.5,4.5C4.55,4.5 2.45,4.9 1,6V20.65C1,20.9 1.25,21.15 1.5,21.15C1.6,21.15 1.65,21.1 1.75,21.1C3.1,20.45 5.05,20 6.5,20C8.45,20 10.55,20.4 12,21.5C13.35,20.65 15.8,20 17.5,20C19.15,20 20.85,20.3 22.25,21.05C22.35,21.1 22.4,21.1 22.5,21.1C22.75,21.1 23,20.85 23,20.6V6C22.4,5.55 21.75,5.25 21,5M21,18.5C19.9,18.15 18.7,18 17.5,18C15.8,18 13.35,18.65 12,19.5V8C13.35,7.15 15.8,6.5 17.5,6.5C18.7,6.5 19.9,6.65 21,7V18.5Z"/>
                </svg>
              </v-col>
              <v-col>
                <v-row>
                  <v-col
                      class="mb-n5"
                      cols="12"
                  >
                    {{ lang._book.title }}<br/>
                    <p style="font-size: large">
                      {{ selectedBook.title }}
                    </p>
                  </v-col>
                  <v-col
                      class="mb-n5"
                      cols="12"
                  >
                    {{ lang._book.author }}<br/>
                    <p style="font-size: large">
                      {{ selectedBook.author }}
                    </p>
                  </v-col>
                  <v-col
                      class="mb-n5"
                      cols="12"
                  >
                    {{ lang._book.year_read }}<br/>
                    <p style="font-size: large">
                      {{ selectedBook.year }}
                    </p>
                  </v-col>
                  <v-col
                      class="mb-n5"
                      cols="12"
                  >
                    {{ lang._book.genre }}<br/>
                    <p style="font-size: large">
                      {{ selectedBook.genre }}
                    </p>
                  </v-col>
                  <v-col
                      class="mb-n5"
                      cols="12"
                  >
                    {{ lang._book.status }}<br/>
                    <p style="font-size: large">
                      {{ selectedBook.status }}
                    </p>
                  </v-col>
                  <v-col
                      class="mb-n5"
                      cols="12"
                  >
                    {{ lang._book.rating }}
                    <v-rating v-model="selectedBook.rating"></v-rating>
                  </v-col>
                  <v-col
                      class="mb-n5"
                      cols="12"
                  >
                    {{ lang._book.description }}<br/>
                    <p style="font-size: large">
                      {{ selectedBook.description }}
                    </p>
                  </v-col>
                  <v-col cols="12">
                    {{ lang._book.comment }}<br/>
                    <p style="font-size: large">
                      {{ selectedBook.comment }}
                    </p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="bookDeleteClicked()">{{ lang._action.delete }}</v-btn>
          <v-btn color="primary" text @click="showBook = false">{{ lang._action.edit }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

</template>

<script>
    export default {
        name: "Bookshelves",
        props: {
            lang: Object,
            bus: Object
        },
        data() {
            return {
                selectedBook: {},
                showBook: false,
                category: {}
            }
        },
        methods: {
            forceRender() {
                this.renderComponent = false;
                this.renderComponent = true;
            },

            init(category) {
                this.category = category;

                if (category.name === this.lang._bookshelves.all_books)
                    this.$root.getAllBooks();
                else if (category.name === this.lang._book._status.read)
                    this.$root.getFilteredBooks(book => book.status === 'READ');
                else if (category.name === this.lang._book._status.unread)
                    this.$root.getFilteredBooks(book => book.status === 'UNREAD');
                else if (category.name === this.lang._book._status.reading)
                    this.$root.getFilteredBooks(book => book.status === 'READING');
                else if (category.name === this.lang._book._status.canceled)
                    this.$root.getFilteredBooks(book => book.status === 'CANCELED');
                else {
                    this.$root.getBookshelfBooks(category.id);
                }
            },

            bookClicked(book) {
                this.showBook = true;
                this.selectedBook = book;
            },

            async bookDeleteClicked() {
                await this.$root.deleteBook(this.selectedBook.id);
                this.showBook = false;
                this.init(this.category);
            }
        },
        mounted() {
            this.bus.$on('init', this.init);
        }
    }
</script>

<style scoped>

</style>