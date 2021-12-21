<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
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
import http from '@/helper/http.js'

const titleStack = ref(['Admin', 'Dashboard'])

const store = useStore()

const darkMode = computed(() => store.state.darkMode)

//Fetch data dashboard from API every 30s
const dashboard = reactive({
   participants: 0,
   incomingVote: 0,
   participations: 0,
   haventVoted: 0,
   candidates: 0
})

const fillDashboard = res => {
   dashboard.participants = res.participants
   dashboard.participations = res.participations
   dashboard.incomingVote = res.incomingVote
   dashboard.haventVoted = res.haventVoted
   dashboard.candidates = res.candidates
}

const lastUpdated = ref('')
const fillLastUpdated = () => lastUpdated.value = `Update terakhir pada ${new Date().toLocaleString('id')}`

const getDashboard = () => {
   http.get('master/dashboard', (data, status) => {
      if (status) {
         const res = data.response
         fillDashboard(res)
         fillLastUpdated()
      }
   })
}

onMounted(() => getDashboard())

setInterval(() => {
   getDashboard()
}, 60000)

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
        :number="dashboard.candidates"
        label="Kandidat Paslon"
        suffix=" paslon"
      />
      
      <!-- DPT -->
      <card-widget
        trend-type="up"
        color="text-green-500"
        :icon="mdiAccountGroup"
        :number="dashboard.participants"
        label="DPT"
        suffix=" orang"
      />
      
      <!-- Suara masuk -->
      <card-widget
        trend="12%"
        trend-type="up"
        color="text-blue-500"
        :icon="mdiVote"
        :number="dashboard.incomingVote"
        suffix=" suara"
        label="Suara Masuk"
      />
      
      <!-- Belum memilih -->
      <card-widget
        trend="5%"
        trend-type="down"
        color="text-red-500"
        :icon="mdiAccountAlert"
        :number="dashboard.haventVoted"
        suffix=" orang"
        label="Belum memilih"
      />
      
      <!-- Partisipasi Pemilih -->
      <card-widget
        trend="2%"
        trend-type="up"
        color="text-blue-500"
        :icon="mdiChartTimelineVariant"
        :number="dashboard.participations"
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
      :title="lastUpdated"
      :icon="mdiReload"
      class="mb-6"
      @click="getDashboard"
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
