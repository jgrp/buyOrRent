<template>
  <div class="p-4">
    <!-- Allgemeine Angaben -->
    <h2 class="font-bold text-xl mb-2">Allgemeine Angaben</h2>
    <SliderField
      label="Eigenkapital"
      tooltip="Eigenkapital ist das verfügbare Startkapital."
      v-model="form.equity"
      :min="0"
      :max="1000000"
      mode="currency"
      currency="EUR"
      locale="de-DE"
    />

    <!-- Mieten und Anlegen -->
    <h2 class="font-bold text-xl mt-8 mb-2">Mieten und Anlegen</h2>
    <SliderField
      label="Aktuelle monatliche Kaltmiete"
      tooltip="Miete ohne Nebenkosten."
      v-model="form.rent"
      :min="0"
      :max="5000"
      mode="currency"
      currency="EUR"
      locale="de-DE"
    />
    <SliderField
      label="Mietsteigerung pro Jahr"
      tooltip="Jährlicher Prozentsatz der Mietsteigerung."
      v-model="form.rentIncrease"
      :min="0"
      :max="10"
      :step="0.1"
      suffix="%"
    />
    <SliderField
      label="Rendite bei angelegtem Eigenkapital"
      tooltip="Erwartete Jahresrendite des Eigenkapitals."
      v-model="form.equityReturn"
      :min="0"
      :max="20"
      :step="0.1"
      suffix="%"
    />

    <!-- Immobilie kaufen -->
    <h2 class="font-bold text-xl mt-8 mb-2">Immobilie kaufen</h2>
    <SliderField
      label="Kaufpreis (ohne Nebenkosten)"
      tooltip="Der reine Kaufpreis der Immobilie."
      v-model="form.purchasePrice"
      :min="0"
      :max="2000000"
      mode="currency"
      currency="EUR"
      locale="de-DE"
    />
    <SliderField
      label="Kaufnebenkosten"
      tooltip="Summe aus Notar, Grunderwerbsteuer, Makler etc."
      v-model="form.additionalCosts"
      :min="0"
      :max="20"
      :step="0.1"
      suffix="%"
    />
    <SliderField
      label="Wertsteigerung pro Jahr"
      tooltip="Erwartete jährliche Wertsteigerung der Immobilie."
      v-model="form.appreciation"
      :min="0"
      :max="10"
      :step="0.1"
      suffix="%"
    />
    <SliderField
      label="Instandhaltungskosten pro Jahr"
      tooltip="Prozentuale jährliche Kosten für Instandhaltung."
      v-model="form.maintenance"
      :min="0"
      :max="10"
      :step="0.1"
      suffix="%"
    />
    <SliderField
      label="Gesamte Kreditlaufzeit"
      tooltip="Gesamtdauer der Finanzierung."
      v-model="form.loanTerm"
      :min="1"
      :max="35"
      :step="1"
      suffix="Jahre"
    />

    <!-- Details zur Finanzierung (optional ein/ausklappbar) -->
    <div class="mb-2 mt-6">
      <a href="#" @click.prevent="showFinanceDetails = !showFinanceDetails" class="text-indigo-600 font-semibold">
        Details zur Finanzierung
        <i :class="['pi', showFinanceDetails ? 'pi-chevron-up' : 'pi-chevron-down', 'ml-1']"></i>
      </a>
    </div>
    <div v-if="showFinanceDetails" class="mt-2">
      <SliderField
        label="Kreditzins zu Beginn"
        tooltip="Zinssatz zu Beginn der Finanzierung."
        v-model="form.initialInterestRate"
        :min="0"
        :max="10"
        :step="0.1"
        suffix="%"
      />
      <SliderField
        label="Erste Zinsbindung"
        tooltip="Dauer der ersten Zinsbindung."
        v-model="form.fixedInterestPeriod"
        :min="1"
        :max="20"
        :step="1"
        suffix="Jahre"
      />
      <SliderField
        label="Kreditzins restliche Kreditlaufzeit"
        tooltip="Zinssatz nach Ende der ersten Zinsbindung."
        v-model="form.followUpInterestRate"
        :min="0"
        :max="10"
        :step="0.1"
        suffix="%"
      />
    </div>

    <div class="mt-8 p-4 border rounded bg-gray-50">
      <h2 class="font-bold text-lg mb-2">Ergebnis</h2>
      <div>
        <strong>Mieten & Anlegen:</strong>
        <span>{{ futureValueRenting.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }}</span>
      </div>
      <div>
        <strong>Immobilie kaufen:</strong>
        <span>{{ futureValueBuying.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }}</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref , computed } from 'vue'
import SliderField from './SliderField.vue'

const showFinanceDetails = ref(true)

const form = ref({
  equity: 100000,
  rent: 1000,
  rentIncrease: 2.2,
  equityReturn: 6,
  purchasePrice: 400000,
  additionalCosts: 10,
  appreciation: 2,
  maintenance: 1.2,
  loanTerm: 25,
  initialInterestRate: 4,
  fixedInterestPeriod: 10,
  followUpInterestRate: 4,
});

</script>