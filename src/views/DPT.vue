<script setup>
import { ref, reactive } from 'vue'
import { mdiAccountGroup, mdiReload } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import Notification from '@/components/Notification.vue'
import ClientsTable from '@/components/ClientsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'

const titleStack = ref(['Admin', 'DPT'])

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Pemilih Tetap</hero-bar>
  <main-section>
  	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
		 <card-component
			title="Update terakhir pada 12-12-2021 12:00 AM"
			:icon="mdiReload"
			class="mb-6"
		 >
		 </card-component>
  	</div>
  </main-section>
</template>
