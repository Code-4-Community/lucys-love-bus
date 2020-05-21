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
              <p class="event-title">{{ event.title }}</p>
              <p class="event-body">{{ event.details.description }}</p>
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
    grid-template-rows: 1fr;
    grid-template-areas: "img content actions";

    height: 150px;
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
    font-family: Raleway;
    font-weight: lighter;
    font-size: 1.3rem;
    color: white;

    position: absolute;
    bottom: 10px;
    left: 10px;
  }


  .event-content {
    grid-area: content;
    position: relative;
    overflow: hidden;
    font-family: Raleway;
    padding-right: 8px;
  }
  .event-content:after {
    content:"";
    top:0;
    left:0;
    position: absolute;
    width:100%;
    height:100%;
    background: linear-gradient(transparent 90px, white);
  }

  .event-title {
    font-size: 1.4rem;
    font-weight: bold;
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

  /* TODO: Do this without !important tag */
  button {
    padding-bottom: 4px !important;
    padding-top: 4px !important;
  }
</style>
