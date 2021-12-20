<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { mdiAccountGroup, mdiReload } from '@mdi/js'
import candidates from '@/candidates.js'
import DataTables from '@/components/DataTables.vue'
import MainSection from '@/components/MainSection.vue'
import Notification from '@/components/Notification.vue'
import CandidatesTable from '@/components/CandidatesTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'

const titleStack = ref(['Admin', 'Pasangan Calon'])

const store = useStore()

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
