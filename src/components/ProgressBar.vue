<script setup>
   const props = defineProps({
      title: {
         type: String,
         default: 'Fulan bin Fulan dan Fulanah binti Fulan'
      },
      value: {
         type: Number,
         default: 45
      }
   })
</script>

<template>
   <div class="mb-3">
      <p class="mb-2">{{ props.title }}</p>
         <div data-label="Progress" class="flex items-center gap-3">
            <progress
               max="100"
               :value="props.value"
               class="w-full bg-green-300"
            ></progress>
            <small>{{ props.value }}%</small>
         </div>
   </div>
</template>