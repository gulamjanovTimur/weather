<template>
  <div class="main">
    <h1 class="main__title">World Weather</h1>
    <div class="main__subtitle">Watch weather in your current location</div>
    <WeatherCard @updateTimeLabel="updateTimeLabel" :index="0" v-if="data[0]"  @reload="reloadWeatherMain" :data="data[0]" class="main__weather-card--main"/>
    <div class="main__weather-cards weather-cards">
      <template :key="index" v-for="(item, index) in data">
        <WeatherCard @updateTimeLabel="updateTimeLabel" :index="index" v-if="index !== 0" @remove="removeCard(index)" @reload="reloadWeather(index)" :data="item" />
      </template>
    </div>
    <button v-show="!isModalOpen" @click="openModal" class="main-add-weather main__add-weather">+</button>
  </div>
  <Modal :notFound="notFound" @submit="submitModal" @close="closeModal" v-if="isModalOpen"/>
</template>

<script>
import WeatherCard from './components/WeatherCard.vue'
import Modal from './components/Modal.vue'
import { getWeatherFromCoords, getWeatherFromCity } from './api'

export default {
  name: 'App',
  components: {
    WeatherCard,
    Modal
  },
  data () {
    return {
      isModalOpen: false,
      data: [],
      notFound: false
    }
  },
  methods: {
    openModal () {
      this.isModalOpen = true
    },
    closeModal () {
      this.isModalOpen = false
    },
    reloadWeatherMain () {
      this.getCurrentPosition()
    },
    reloadWeather (index) {
      getWeatherFromCity(this.data[index].name)
        .then(res => {
          this.data[index] = {
            ...res,
            time: Date.now(),
            timeLabel: 'Less than 1 minute ago'
          }
          localStorage.setItem('data', JSON.stringify(this.data))
        })
        .catch(err => {
          throw err
        })
    },
    updateTimeLabel (index, str) {
      this.data[index].timeLabel = str
      localStorage.setItem('data', JSON.stringify(this.data))
    },
    removeCard (index) {
      this.data.splice(index, 1)
      localStorage.setItem('data', JSON.stringify(this.data))
    },
    submitModal (city) {
      getWeatherFromCity(city)
        .then(res => {
          if (res.cod === 200) {
            this.data.push({
              ...res,
              time: Date.now(),
              timeLabel: 'Less than 1 minute ago'
            })
            localStorage.setItem('data', JSON.stringify(this.data))
            this.notFound = false
            this.closeModal()
          } else {
            this.notFound = true
          }
        })
        .catch(err => {
          throw err
        })
    },
    getCurrentPosition () {
      navigator.geolocation.getCurrentPosition((pos) => {
        getWeatherFromCoords(pos.coords).then(res => {
          this.data[0] = {
            ...res,
            time: Date.now(),
            timeLabel: 'Less than 1 minute ago'
          }
          localStorage.setItem('data', JSON.stringify(this.data))
        })
      }, () => {
        getWeatherFromCity('Moscow').then(res => {
          this.data[0] = {
            ...res,
            time: Date.now(),
            timeLabel: 'Less than 1 minute ago'
          }
          localStorage.setItem('data', JSON.stringify(this.data))
        })
      })
    }
  },
  mounted () {
    this.getCurrentPosition()
    if (localStorage.getItem('data')) {
      this.data = JSON.parse(localStorage.getItem('data'))
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: "Lato";
  font-weight: normal;
  src: url("assets/fonts/Lato-Regular.ttf");
}
@font-face {
  font-family: "Lato";
  font-weight: 300;
  src: url("assets/fonts/Lato-Light.ttf");
}
@font-face {
  font-family: "Lato";
  font-weight: 700;
  src: url("assets/fonts/Lato-Bold.ttf");
}
@font-face {
  font-family: "Lato";
  font-weight: 500;
  src: url("assets/fonts/Lato-Medium.ttf");
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  color: #1B1B1B;
  font-family: Lato;
}
.main {
  padding: 24px 0 34px 0;
  &__title {
    font-size: 70px;
    text-align: center;
    font-weight: 300;
  }
  &__subtitle {
    font-size: 24px;
    text-align: center;
    font-weight: 400;
    color: #767676;
  }
  &__weather-card--main {
    margin: 20px auto 0 auto;
  }
  &__weather-cards {
    margin: 80px auto 0 auto;
    width: fit-content;
  }
}
.weather-cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 40px;
}
.main-add-weather {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9B51E0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: #fff;
  font-size: 26px;
  position: fixed;
  bottom: 34px;
  right: 45px;
  border: none;
  cursor: pointer;
}
@media (max-width: 1520px) {
  .main {
    padding: 16px;
  }
  .weather-cards {
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }
}
@media (max-width: 991px) {
  .main {
    padding: 16px 16px 80px 16px;
  }
  .weather-cards {
    grid-template-columns: 1fr 1fr;
  }
  .main-add-weather {
    bottom: 10px;
    right: 10px;
  }
}
@media (max-width: 575px) {
  .main {
    padding: 0 0 80px 0;
  }
  .weather-cards {
    grid-template-columns: 1fr;
  }
}
</style>
