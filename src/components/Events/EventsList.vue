<template>
    <div>
        <slot name="header"></slot>
        <slot v-if="events.length === 0" name="NoEventsMsg"></slot>
        <div v-else class='pagination-wrapper'>
          <button
            class='pagination__btn'
            v-on:click='decrementCurrentPage'>Prev</button>
          <span><b>Page {{ currentPage + 1 }} of {{ maxPage + 1 }}</b></span>
          <button
            class='pagination__btn'
            v-on:click='incrementCurrentPage'>Next</button>
        </div>
        <div v-if="events.length > 0" class="events-container">
          <event v-for="event in pageOfEvents" :key="event.id" :event="event">
            <template v-slot:btn1="slotProps">
              <slot name="eventBtn1" :event="slotProps.event"/>
            </template>
            <template v-slot:btn2="slotProps">
              <slot name="eventBtn2" :event="slotProps.event"/>
            </template>
          </event>
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
      eventsPerPage: 5,
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
      return Math.floor(this.events.length / this.eventsPerPage);
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

  .pagination-wrapper {
    display: flex;
    justify-content: center;
  }

  .pagination-wrapper span {
    display: block;
  }

  .pagination__btn {
    margin-left: 1rem;
    margin-right: 1rem;
    background-color: @button-bg;
    color: @button-color;
    padding: 1em 3em 1em 3em;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
</style>
