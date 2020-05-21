<template>
  <div class="scroll-container">
    <slot v-if="events.length === 0" name="NoEventsMsg"></slot>
    <div v-else>
      <event v-for="event in events" :key="event.id" :event="event" >
        <template v-slot:btns="slotProps">
          <slot name="eventBtns" :event="slotProps.event" />
        </template>
      </event>
    </div>
  </div>
</template>

<script>
import Event from './Event.vue';

export default {
  name: 'EventsListCheckout',
  components: {
    Event,
  },
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
};

</script>

<style lang="less" scoped>
  @import '../../../assets/color-constants.less';
  @import '../../../assets/global-classes.less';
</style>
