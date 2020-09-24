<template>
  <div class="app on">
    <img src="/img/test.jpg" width="50">
    <div v-for="(d, i) in data" :key="i">
      <div v-if="d.le">{{ d.le }}</div>
      <div v-else><em>{{i}}</em> {{d.group_name}}</div>
    </div>
  </div>
</template>
<script>
import msort from '../src/index'
export default {
  data () {
    return {
      data: [{"user_id":"072a4ede","ml_id":"M090326823","user_name":"vv01","user_alias":"","is_mute":"0","is_top":"0","status":"1","is_blacklist":"0"},{"user_id":"1d54ec43","ml_id":"M816148621","user_name":"密聊二","user_alias":"","is_mute":"0","is_top":"0","status":"1","is_blacklist":"0"},{"user_id":"92fe94ed","ml_id":"M216270212","user_name":"密聊四","user_alias":"","is_mute":"0","is_top":"0","status":"1","is_blacklist":"0"}]
    }
  },
  mounted () {
    this.data = msort(this.data, ['user_alias', 'user_name'], 1, 'user_id')
  }
}
</script>
<style lang="less">
@import './less/public.less';
.app{
  background: #eee;
}
</style>