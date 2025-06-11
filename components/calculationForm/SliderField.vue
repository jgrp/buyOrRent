<template>
  <div class="mb-6">
    <label class="font-bold flex items-center mb-1">
      {{ label }}
      <i
        v-if="tooltip"
        class="pi pi-info-circle ml-1"
        v-tooltip="tooltip"
      />
    </label>
    <div class="flex items-center justify-between mb-2">
      <InputNumber
        v-model="modelValueProxy"
        :mode="mode"
        :currency="currency"
        :locale="locale"
        :suffix="suffix"
        :min="min"
        :max="max"
        :step="step"
        class="w-32"
        :inputStyle="{ textAlign: 'right' }"
      />
    </div>
    <Slider
      v-model="modelValueProxy"
      :min="min"
      :max="max"
      :step="step"
      :class="sliderClass"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'

const props = defineProps({
  label: { type: String, required: true },
  tooltip: { type: String, default: '' },
  modelValue: { type: [Number, String], required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  mode: { type: String, default: 'decimal' }, // 'decimal' or 'currency'
  currency: { type: String, default: 'EUR' },
  locale: { type: String, default: 'de-DE' },
  suffix: { type: String, default: '' },
  sliderClass: { type: String, default: '' },
  displayFormat: { type: Function, default: null }, // custom display function
})

const emit = defineEmits(['update:modelValue'])

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

function formatDisplay(val) {
  if (props.displayFormat) return props.displayFormat(val)
  if (props.mode === 'currency') {
    return Number(val).toLocaleString(props.locale, {
      style: 'currency',
      currency: props.currency,
      maximumFractionDigits: 0,
    })
  }
  if (props.suffix) {
    return `${val} ${props.suffix.trim()}`
  }
  return val
}
</script>