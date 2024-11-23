<script lang="ts" setup>
import { watch } from '#imports'
import { createBlurDom, removeBlurDom } from '../helper'
import _props from '../props/Modal'

const props = defineProps(_props)
const emits = defineEmits(['ok', 'close'])
const modelValue = defineModel()

watch(
  () => modelValue.value,
  () => {
    const modals = document.querySelectorAll('.glorious-scaffold-modal')
    if (modelValue.value && props.blur) {
      createBlurDom(() => (modelValue.value = false))
      setTimeout(() => {
        modals.forEach((el: any) => {
          el.classList.remove('animation')
        })
      }, 500)
    } else {
      modals.forEach((el: any) => {
        el.classList.add('animation')
      })
      removeBlurDom()
    }
  }
)
</script>

<template>
  <div
    class="glorious-scaffold-modal animation"
    :class="[modelValue ? 'open' : 'close', `size-${props.size}`]"
  >
    <!-- header -->
    <div
      v-show="props?.title !== ''"
      class="glorious-scaffold-modal-header"
    >
      <span class="font-medium">{{ props.title }}</span>
      <GButton
        class="flex justify-center items-center w-6 h-6"
        size="sm"
        color="red"
        @click="modelValue = false"
      >
        <GIcon
          name="glorious-x"
          color="#fff"
          :size="10"
        />
      </GButton>
    </div>
    <hr
      v-show="props.title !== ''"
      class="my-3"
    />
    <!-- end header -->

    <div class="glorious-scaffold-modal-content">
      <slot />
    </div>

    <!-- start footer -->
    <div
      v-show="props.okBtn !== ''"
      class="glorious-scaffold-modal-footer"
    >
      <GButton
        :color="props.colorBtn"
        :loading="props.okBtnLoading"
        @click="emits('ok')"
      >
        {{ props.okBtn }}
      </GButton>
      <GButton
        :color="props.colorBtn"
        v-show="props.closeBtn !== ''"
        outline
        @click="modelValue = false"
      >
        {{ props.closeBtn }}
      </GButton>
    </div>
    <!-- end footer -->
  </div>
</template>

<style lang="scss" src="../../assets/style/components/modal.scss" />
