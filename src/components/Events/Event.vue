<template>
  <div class="event-container">
      <div class="event-img">
        <div class="img-box-thumbnail">
          <img :src="event.thumbnail" />
          <span class="start-date">{{ toStringDate(event.details.start) }}</span>
        </div>
      </div>
      <div class="event-content">
          <div class="content-wrapper">
            <router-link
                    :to="{ name: 'single-event', params: { eventId: event.id }}"
                    class="event-title"
            >{{event.title}}</router-link>
              <br>
            <router-link
                    :to="{ name: 'single-event', params: { eventId: event.id }}"
                    class="event-body"
            >{{event.details.description}}</router-link>
          </div>
      </div>
       <div class="event-btns">
         <slot name="btns" :event="event"/>
      </div>
  </div>
</template>

<script>
import DateUtils from '../../utils/DateUtils';

export default {
  name: 'Event',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewRSVP(payload) {
      // TODO: Move to single event view
      // eslint-disable-next-line no-alert
      alert(`The users registered for ${payload.event.title} are ${payload.event.users}.`);
    },
    toStringDate(date) {
      return DateUtils.toStringDate(date);
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/global-classes.less';

  .event-container {
    display: grid;
    grid-template-columns: 2fr 8fr 1fr;
    grid-template-rows: 150px;
    grid-template-areas: "img content actions";
  }

  .event-img {
    grid-area: img;
  }
  .img-box-thumbnail {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #E5E5E5;
    overflow: hidden;
    border-radius: 4px;
  }
  .img-box-thumbnail > img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .start-date {
    /*font-family: Raleway;*/
    /*font-weight: lighter;*/
    font-size: 1.3rem;
    color: white;
    mix-blend-mode: difference;

    position: absolute;
    bottom: 10px;
    left: 10px;
  }

  .event-title {
    cursor: pointer;
  }

  .event-content {
    grid-area: content;
    position: relative;
    overflow: hidden;
    /*font-family: Raleway;*/
    padding-left: 1rem;
    padding-right: 8px;
    text-align: left;
  }
  .event-content:after {
    content:"";
    top: 50%;
    left:0;
    position: absolute;
    width:100%;
    height:50%;
    background: linear-gradient(transparent 10px, white);
  }

  .content-wrapper > a {
    color: black;
    text-decoration: none;
  }

  .event-title {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .event-body {
    cursor: pointer;
  }

  .event-btns {
    grid-area: actions;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
  }
</style>
