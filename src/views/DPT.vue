<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { mdiContentSaveMoveOutline, mdiInformation } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import Notification from '@/components/Notification.vue'
import ClientsTable from '@/components/ClientsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import ModalBox from '@/components/ModalBox.vue'
import ajax from '@/helper/ajax'

const titleStack = ref(['Admin', 'DPT'])

const store = useStore()
//Get data accounts to API
const users = ref([])
const isModalActive = ref(false)

const getAccounts = async () => {
   try {
      const res = await ajax.get('/admin/user', {
         headers: {
            token: localStorage.getItem('evote-himati:token') || 'YOUR_TOKEN_HERE'
         }
      })
      users.value = res?.data?.results
   } catch(err) {
      if (err?.response) {
         store.state.errorFromServer = err.response?.data?.results
         showNotif.value = true
         textNotif.value = err.response?.data?.results
         colorNotif.value = 'danger'
      }
   }
}

const deleteAllUser = async () => {
   try {
      await ajax.delete('/admin/user', {
         headers: {
            token: localStorage.getItem('evote-himati:token') || 'YOUR_TOKEN_HERE'
         }
      })
      deleteSuccess()
   } catch(err) {
      if (err?.response) {
         store.state.errorFromServer = err.response?.data?.results?.name
         showNotif.value = true
         textNotif.value = err.value
         colorNotif.value = 'danger'
      }
   }
}

const importToExcel = async () => {
   try {
      const res = await ajax.get('/admin/user/excel', {
         headers: {
            token: localStorage.getItem('evote-himati:token') || 'YOUR_TOKEN_HERE'
         }
      })
      console.log(res)
   } catch(err) {
      if (err?.response) {
         store.state.errorFromServer = err.response?.data?.results?.name
         showNotif.value = true
         textNotif.value = err.value
         colorNotif.value = 'danger'
      }
   }
}

//Get errorFromServer
const err = computed(() => store.state.errorFromServer)

//Notification handler
const showNotif = ref(false)
const textNotif = ref('')
const colorNotif = ref('')

const updateSuccess = () => {
   getAccounts()
   showNotif.value = true
   textNotif.value = 'Update data success'
   colorNotif.value = 'info'
}

const deleteSuccess = () => {
   getAccounts()
   showNotif.value = true
   textNotif.value = 'Delete data success'
   colorNotif.value = 'info'
}

const updateFail = () => {
   showNotif.value = true
   textNotif.value = err.value
   colorNotif.value = 'warning'
}

const deleteFail = () => {
   showNotif.value = true
   textNotif.value = err.value
   colorNotif.value = 'warning'
}

onMounted(() => {
   getAccounts()
})

</script>

<template>
   <title-bar :title-stack="titleStack" />
   <hero-bar>Daftar Pemilih Tetap</hero-bar>
   <main-section>
      <Notification 
         v-on:close="showNotif = false"
         v-if="showNotif"
         :color="colorNotif"
         :icon="mdiInformation">
            {{ textNotif }}
      </Notification>
      <section class="mb-6">
         <JbButtons type="justify-start lg:justify-start">
            <!-- Import to excel -->
            <JbButton label="Import to excel"
            color="info"
            @click="importToExcel"/>
            <!-- Delete all user -->
            <JbButton 
            @click="isModalActive = true"
            :icon="mdiContentSaveMoveOutline"
            label="Delete all user"
            color="danger" />
         </JbButtons>
      </section>
      <!-- Delete all confirm modal -->
      <modal-box
         v-on:confirm="deleteAllUser"
         v-model="isModalActive"
         title="Delete all user"
         button-label="Yes"
         button="danger"
         has-cancel
      >
      <p>All data from user will remove permanent from database, are you sure ?</p>
      </modal-box>
      <card-component
         class="mb-6"
         has-table
         >
         <clients-table 
         v-on:update-fail="updateFail()" 
         v-on:update-success="updateSuccess()"
         v-on:delete-success="deleteSuccess()"
         v-on:delete-fail="deleteFail()"
         :fields="users" />
      </card-component>
   </main-section>
</template>
