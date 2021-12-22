<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { mdiAccountGroup, mdiReload } from '@mdi/js'
import DataTables from '@/components/DataTables.vue'
import MainSection from '@/components/MainSection.vue'
import Notification from '@/components/Notification.vue'
import ClientsTable from '@/components/ClientsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'
import http from '@/helper/http.js'

const titleStack = ref(['Admin', 'DPT'])

const store = useStore()
//Get data accounts to API
const users = ref([])
onMounted(() => {
   http.get('master/accounts', (data, status) => {
      if (status) users.value = data.response
   })
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Pemilih Tetap</hero-bar>
  <main-section>
  <card-component
      class="mb-6"
      has-table
    >
       <clients-table :fields="users" />
    </card-component>
  </main-section>
</template>
