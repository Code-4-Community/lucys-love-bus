<template>
    
</template>

<script>
import api from '../../api/api';

export default {
    name: 'RsvpTable',
    methods: {
        async getRSVP(event) {
            const resp = await api.getEventRSVP(this.eventId);
            const isErr = (resp == null) || (resp.response && resp.response.status !== 200);
            if (!isErr) {
                // do stuff
                const fileName = event.title ? `Event ${event.title} RSVPs` : `Event ${this.eventId} RSVPs`;
                this.forceFileDownload(resp, fileName);
            }
        },
    }
}
</script>

<style lang="less" scoped>
  @import '../../../assets/color-constants.less';
  @import '../../../assets/global-classes.less';


</style>