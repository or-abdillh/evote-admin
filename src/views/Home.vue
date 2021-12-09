<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import {
  mdiAccountGroup,
  mdiAccountAlert,
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiVote,
  mdiClock
} from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import CardWidget from '@/components/CardWidget.vue'
import CardComponent from '@/components/CardComponent.vue'
import ClientsTable from '@/components/ClientsTable.vue'
import Notification from '@/components/Notification.vue'
import JbButton from '@/components/JbButton.vue'
import CardTransactionBar from '@/components/CardTransactionBar.vue'
import CardClientBar from '@/components/CardClientBar.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'
import ProgressBar from '@/components/ProgressBar.vue'

const titleStack = ref(['Admin', 'Dashboard'])

const store = useStore()

const darkMode = computed(() => store.state.darkMode)
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Dashboard</hero-bar>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      
      <!-- Kandidat Paslon -->
      <card-widget
        color="text-green-500"
        :icon="mdiAccountMultiple"
        :number="4"
        label="Kandidat Paslon"
        suffix=" paslon"
      />
      
      <!-- DPT -->
      <card-widget
        trend-type="up"
        color="text-green-500"
        :icon="mdiAccountGroup"
        :number="88"
        label="DPT"
        suffix=" orang"
      />
      
      <!-- Suara masuk -->
      <card-widget
        trend="12%"
        trend-type="up"
        color="text-blue-500"
        :icon="mdiVote"
        :number="56"
        suffix=" suara"
        label="Suara Masuk"
      />
      
      <!-- Belum memilih -->
      <card-widget
        trend="5%"
        trend-type="down"
        color="text-red-500"
        :icon="mdiAccountAlert"
        :number="32"
        suffix=" orang"
        label="Belum memilih"
      />
      
      <!-- Partisipasi Pemilih -->
      <card-widget
        trend="2%"
        trend-type="up"
        color="text-blue-500"
        :icon="mdiChartTimelineVariant"
        :number="84.14"
        suffix="%"
        label="Partisipasi pemilih"
      />
      
      <!-- Countdown -->
      <card-widget
        color="text-green-500"
        :icon="mdiClock"
        text="3j 45m 22s"
        label="Countdown"
      />
      
    </div>
   
   <!-- Quick Count -->
    <title-sub-bar
      :icon="mdiChartPie"
      title="Perhitungan Suara"
    />

    <card-component
      title="Update terakhir pada 12:00 12-12-2021"
      :icon="mdiReload"
      class="mb-6"
    >
       <ul class="list-style-none">
         <li>
            <ProgressBar 
               :value="35"
               title="Sandhika dan Galih"
               bgColor="bg-green-400"
            />
         </li>
         <li>
            <ProgressBar 
               :value="55"
               title="Sandhika dan Galih"
               bgColor="bg-blue-400"
            />
         </li>
         <li>
            <ProgressBar 
               :value="55"
               title="Sandhika dan Galih"
               bgColor="bg-yellow-400"
            />
         </li>
       </ul>
    </card-component>
  </main-section>
</template>
