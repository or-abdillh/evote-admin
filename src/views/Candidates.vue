<script setup>
import { ref, onMounted } from 'vue'
import { mdiAccountGroup, mdiReload } from '@mdi/js'
import DataTables from '@/components/DataTables.vue'
import MainSection from '@/components/MainSection.vue'
import Notification from '@/components/Notification.vue'
import CandidatesTable from '@/components/CandidatesTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'
import http from '@/helper/http.js'

const titleStack = ref(['Admin', 'Pasangan Calon'])

//Get data from API
const candidates = ref([])
onMounted(() => {
   http.get('master/candidates', (data, status) => {
      if (status) candidates.value = data.response
   })
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Kandidat Calon Ketua dan Wakil Ketua Umum</hero-bar>
  <main-section>
  <card-component
      class="mb-6"
      has-table
    >
       <candidates-table checkable :fields="candidates" />
    </card-component>
  </main-section>
</template>
