<template>
    <div class="modal">
      <transition appear name="slide">
      <form @submit.prevent.stop="submit" @reset.prevent.stop="clear" class="modal__main">
        <div class="modal__header modal-header">
          <div class="modal-header__title">Choose a city</div>
          <div class="modal-header__subtitle">To find city start typing and pick one from the suggestions</div>
        </div>
        <div class="modal__content modal-content">
          <div class="modal-content__field-wrapper">
            <input v-model="city" placeholder="Search city" class="modal-content__field" :class="{'modal-content__field--validate' : v$.city.$error || notFound}" type="text">
            <!-- <div class="modal-content__field-error" v-if="v$.city.$error">{{v$.city.required.$message}}</div> -->
            <template v-if="v$.city.$error">
              <div class="modal-content__field-error" :key="err.$uid" v-for="err in v$.city.$errors">{{err.$message}}</div>
            </template>
            <div class="modal-content__field-error" v-if="notFound">City not found</div>
          </div>
        </div>
        <div class="modal__footer modal-footer">
          <div class="modal-footer__left">
            <button type="reset" class="modal-footer__btn">CLEAR</button>
          </div>
          <div class="modal-footer__right">
            <button @click="close" type="button" class="modal-footer__btn modal-footer__btn--negative">CANCEL</button>
            <button type="submit" class="modal-footer__btn">ADD</button>
          </div>
        </div>
      </form>
      </transition>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const onlyLat = helpers.regex(/^[a-zA-Z]*$/)

export default {
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  props: {
    notFound: {
      type: Boolean,
      default: false
    }
  },
  validations () {
    return {
      city: {
        required,
        onlyLat: helpers.withMessage('Only latin characters are allowed', onlyLat)
      }
    }
  },
  name: 'Modal',
  data () {
    return {
      city: ''
    }
  },
  methods: {
    async submit () {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        this.$emit('submit', this.city)
      }
    },
    close () {
      this.$emit('close')
    },
    clear () {
      this.city = ''
    }
  }
}

</script>
<style lang="scss" scoped>
.slide-enter-active {
  transition: all .3s ease-out;
}

.slide-leave-active {
  transition: all .3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  background: rgba(11, 11, 11, 0.5);

  &__main {
    background: #fff;
    border-radius: 4px;
    padding: 24px;
    overflow: auto;
    width: 751px;
  }

  &__header {
    margin-bottom: 20px;
  }
  &__content {
    margin-bottom: 140px;
  }
}
.modal-content {
  &__field-wrapper {
    width: 100%;
  }
  &__field {
    width: 100%;
    border: none;
    border-bottom: 1px solid #1B1B1B;
    padding: 16px 0;
    font-size: 24px;
    font-weight: 500;
    &:focus-visible {
      outline: none;
    }
    &::placeholder {
      color: #C1C1C1;
    }
    &--validate {
      border-bottom: 1px solid #FF0101;
    }
  }
  &__field-error {
    margin-top: 12px;
    color: #FF0101;
    font-size: 16px;
  }
}

.modal-header {
  &__title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  &__subtitle {
    font-size: 24px;
    color: #767676;
  }
}
.modal-footer {
  display: flex;
  justify-content: space-between;
  &__right {
    display: flex;
    gap: 31px;
  }
  &__btn {
    cursor: pointer;
    border: none;
    font-weight: 700;
    font-size: 16px;
    color: #C1C1C1;
    background-color: #fff;
    &--negative {
      color: #9B51E0;
    }
  }
}

@media (max-width: 575px) {
  .modal {
    align-items: flex-end;
    &__main {
      border-radius: 0;
      width: 100vw;
      height: 100vh;
      padding: 16px;
      max-height: 100%;
      display: flex;
      flex-flow: column;
      min-width: 0;
    }
    &__content {
      flex: 1;
      flex-flow: column;
      display: flex;
      overflow-x: hidden;
    }
    &__header {
      margin-bottom: 10px;
    }
    &-header__title {
      font-size: 22px;
    }
  }
}

</style>
