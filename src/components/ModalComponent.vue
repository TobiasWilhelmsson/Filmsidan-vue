<script setup>
//Typsäkra props för att fylla ut modals
// eslint-disable-next-line
const props = defineProps({
  modalInfo: {
    type: Object,
    default: () => ({
      open: false,
      title: '',
      description: ''
    })
  }
})

//Emitta stängt ruta
const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div class="modal" :class="{ open: modalInfo.open }" @click.self="handleClose">
    <div class="modal-content">
      <h2>{{ modalInfo.title }}</h2>
      <p>{{ modalInfo.description }}</p>
      <a href="#" @click.prevent="handleClose">Stäng</a>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #192226ab;
  transition: all 0.35s ease 0s;
}

.modal.open {
  display: block;
}

.modal-content {
  margin: 15% auto;
  padding: 20px;
  width: 40%;
  text-align: center;
  background-color: #222b31;
}

@media only screen and (max-width: 768px) {
  .modal-content {
    width: 85%;
  }
}

.modal h2 {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.modal img {
  max-width: 100%;
  margin: 10px 0;
}

.modal p {
  font-size: 16px;
  margin: 10px 0;
}

.modal a {
  text-decoration: none;
  margin-top: 10px;
  color: purple;
  color: #fff;
  display: block;
  font-size: 17px;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.modal a:hover {
  color: black;
  background-color: white;
}
</style>
