<template>
    <div>
      <slot name="header"></slot>
      <slot v-if="events.length === 0" name="NoEventsMsg"></slot>
      <div v-else class="events-container">
        <event v-for="event in pageOfEvents" :key="event.id" :event="event">
          <!-- Note that event buttons passed should be wrapped in an access control
            or a div when being passed to get the desired flex styling -->
          <template v-slot:btns="slotProps">
            <slot name="eventBtns" :event="slotProps.event" />
          </template>
        </event>
        <div class='pagination-wrapper'>
          <div>
            <div
                v-if="!firstPage"
                class='btn--tertiary pagination__btn'
                v-on:click='decrementCurrentPage'>
              Previous Page
            </div>
          </div>
          <span>{{ currentPage + 1 }} of {{ maxPage }}</span>
          <div>
            <div
                v-if="!lastPage"
                class='btn--tertiary pagination__btn'
                v-on:click='incrementCurrentPage'>
              Next Page
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Event from './Event.vue';

export default {
  name: 'EventsList',
  components: {
    Event,
  },
  data() {
    return {
      eventsPerPage: 20,
      currentPage: 0,
    };
  },
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // list of a single page's worth of items
    pageOfEvents() {
      // pages are 0-indexed
      const firstEvent = this.currentPage * this.eventsPerPage;
      const lastEvent = firstEvent + this.eventsPerPage;
      // slice truncates any out-of-bounds indices, so that's not a concern here
      return this.events.slice(firstEvent, lastEvent);
    },
    // page number of the last page
    maxPage() {
      return Math.ceil(this.events.length / this.eventsPerPage);
    },
    firstPage() {
      return this.currentPage === 0;
    },
    lastPage() {
      return this.currentPage === this.maxPage - 1;
    },
  },
  methods: {
    incrementCurrentPage() {
      if (this.currentPage < this.maxPage) {
        this.currentPage += 1;
      }
    },
    decrementCurrentPage() {
      if (this.currentPage > 0) {
        this.currentPage -= 1;
      }
    },
  },
};

</script>

<style lang="less">
  @import '../../../assets/color-constants.less';

  .events-container {
    margin: 0 auto;
  }

  .events-container > div {
    margin: 5px 0;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .pagination__btn {
    margin: 0;
    padding: 6px 3px;
    border-radius: 6px;
    cursor: pointer;
  }
</style>
