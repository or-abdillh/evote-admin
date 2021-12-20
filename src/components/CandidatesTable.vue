<script setup>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { mdiAccountEdit, mdiTrashCan, mdiEye, mdiBallot } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Field from  '@/components/Field.vue'
import Control from '@/components/Control.vue'

const props = defineProps({
  checkable: Boolean,
  fields: Array
})

const store = useStore()

const darkMode = computed(() => store.state.darkMode)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])


const itemsPaginated = computed(
  () => props.fields.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(props.fields.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }
  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []
  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })
  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === item.id)
  }
}

//Jobs
const jobs = [{ id: 0, label: 'Dosen' }, { id: 1, label: 'Mahasiswa' }]

//Update DPT handler
const updateForm = reactive({
	candidateNumber: 1,
	chairmanName: 'Fulan bin Fulan',
	chairmanImage: '/male.jpg',
	viceChairmanName: 'Fulanah binti fulah',
	viceChairmanImage: '/female.jpg'
})

</script>

<template>

<!-- Update Modal -->
  <modal-box
    v-model="isModalActive"
    title="Update Data Kandidat"
    has-cancel
  >
    <Field label="Nomor Pasangan Calon">
      <Control
        type="number"
        v-model="updateForm.candidateNumber"
        placeholder="Ubah nomor urut paslon"
        :icon="mdiAccountEdit" />
    </Field>

    <Field label="Calon Ketua Umum">
      <Control
       v-model="updateForm.chairmanName"
       placeholder="Ubah nama calon ketua umum"
       :icon="mdiAccountEdit" 
       class="mb-6"/>
    </Field>

    <Field label="Foto Calon Ketua Umum">
      <Control 
        v-model="updateForm.chairmanImage"
        placeholder="Ubah link upload foto"
        :icon="mdiAccountEdit"
        class="mb-6"/>
    </Field>
    
    <Field label="Calon Wakil Keta Umum">
      <Control 
        v-model="updateForm.viceChairmanName"
        placeholder="Ubah nama calon wakil ketua umum"
        :icon="mdiAccountEdit"
        class="mb-6"/>
    </Field>
    
    <Field label="Foto Wakil Keta Umum">
      <Control 
        v-model="updateForm.viceChairmanImage"
        placeholder="Ubah link upload foto"
        :icon="mdiAccountEdit"
        class="mb-6"/>
    </Field>
    
  </modal-box>

  <modal-box
    v-model="isModalDangerActive"
    large-title="Hapus data "
    button="danger"
    has-cancel
  >
    <p>Anda akan menghapus data secara <b>permanen</b></p>
  </modal-box>

  <div
    v-if="checkedRows.length"
    class="bg-gray-50 p-3 dark:bg-gray-800"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block bg-gray-100 px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
       <th>No. Paslon</th>
       <th>Ketua Umum</th>
       <th>Foto Ketum</th>
       <th>Wakil Ketua Umum</th>
       <th>Foto Waketum</th>
       <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in itemsPaginated"
        :key="item.username"
      >
        <td data-label="No. Paslon">
          {{ item.candidate_number }}
        </td>
        <td data-label="Ketua Umum">
          {{ item.chairman_name }}
        </td>
        <td data-label="Foto Ketum">
          <img class="rounded-full h-auto w-3/12 md:mx-auto" :src="item.chairman_image" :alt="item.chairman_name" />
        </td>
        <td data-label="Wakil Ketua Umum">
          {{ item.vice_chairman_name }}
        </td>
        <td data-label="Foto Waketum">
          <img class="rounded-full h-auto w-3/12 md:mx-auto" :src="item.vice_chairman_image" :alt="vice_chairman_name">
        </td>
        <td data-label="actions" class="actions-cell">
          <jb-buttons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <jb-button
              color="success"
              :icon="mdiAccountEdit"
              small
              @click="isModalActive = true"
            />
            <jb-button
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </jb-buttons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <level>
      <jb-buttons>
        <jb-button
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :outline="darkMode"
          small
          @click="currentPage = page"
        />
      </jb-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>
