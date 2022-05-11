<template>
  <div class="weather-card" :class="{'weather-card--main' : !index}">
    <div class="weather-card__city">{{data.name}}</div>
    <div class="weather-card__contry">{{!index ? 'Your current location' : data.sys.country}}</div>
    <div class="weather-card__data weather-data">
      <div class="weather-data__field weather-field">
        <span>Weather</span>
        <span>{{data.weather[0].main}}</span>
      </div>
      <div class="weather-data__field weather-field">
        <span>Temperatute</span>
        <span>{{data.main.temp}} °C</span>
      </div>
      <div class="weather-data__field weather-field">
        <span>Humidity</span>
        <span>{{data.main.humidity}} %</span>
      </div>
    </div>
    <div class="weather-card__time">{{ data.timeLabel }}</div>
    <div class="weather-card__btn-wrapper" :class="{'weather-card__btn-wrapper--main' : !index}">
      <button @click="$emit('remove')" v-if="index" class="weather-card__btn">REMOVE</button>
      <button @click="$emit('reload')" class="weather-card__btn">RELOAD</button>
    </div>
  </div>
</template>

<script>
import { Duration } from 'luxon'

export default {
  name: 'WeatherCard',
  props: {
    data: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    }
  },
  methods: {
    checkTime () {
      setTimeout(() => {
        this.checkTime()
      }, 60000)
      const time = Duration.fromMillis(Date.now() - this.data.time).shiftTo('days', 'hours', 'minutes', 'seconds').toObject()
      if (time.days > 0) {
        this.$emit('updateTimeLabel', this.index, `${time.days} ${time.days === 1 ? 'day' : 'days'} ago`)
      } else if (time.hours > 0) {
        this.$emit('updateTimeLabel', this.index, `${time.hours} ${time.hours === 1 ? 'hour' : 'hours'} ago`)
      } else if (time.minutes > 0) {
        this.$emit('updateTimeLabel', this.index, `${time.minutes} ${time.minutes === 1 ? 'minute' : 'minutes'} ago`)
      } else {
        this.$emit('updateTimeLabel', this.index, 'Less than 1 minute ago')
      }
    }
  },
  mounted () {
    this.checkTime()
  }
}
</script>

<style lang="scss">
.weather-card {
  width: 350px;
  box-shadow: 0px 2px 10px rgba(10, 10, 10, 0.25);
  border-radius: 6px;
  background-color: #fff;
  padding: 24px;
  &--main {
    width: 824px;
  }
  &__city {
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 15px;
  }
  &__contry {
    font-size: 18px;
    margin-bottom: 40px;
  }
  &__time {
    color: #A8A8A8;
    font-size: 16px;
    text-align: right;
    margin-top: 8px;
  }
  &__btn-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
  &__btn-wrapper--main {
    justify-content: flex-end;
  }
  &__btn {
    color: #9B51E0;
    font-size: 16px;
    border: none;
    background-color: #fff;
    cursor: pointer;
    margin-top: 32px;
  }
}
.weather-field {
  display: flex;
  justify-content: space-between;
  padding: 16px 0 12px 0;
  border-bottom: 1px solid #C4C4C4;
}
@media (max-width: 1520px) {
  .weather-card {
    width: 100%;
    &--main {
      width: 824px;
    }
  }
}
@media (max-width: 991px) {
  .weather-card {
    &--main {
      width: 100%;
    }
  }
}
@media (max-width: 575px) {
  .weather-card {
    width: 100%;
    border-radius: 0;
  }
}
</style>
