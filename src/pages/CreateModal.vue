<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="newUser()" class="q-gutter-md">
        <q-input
          v-model="user.name"
          label="Nombre"
          lazy-rules
          :rules="[val => (val && val.length > 4) || 'Escriba algo']"
        />

        <q-input
          v-model="user.email"
          label="email"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Escriba email',
            val => /\S+@\S+\.\S+/.test(val) || 'ingresa un email valido'
          ]"
        />
        <q-select v-model="user.role" :options="options" label="Rol" />

        <div>
          <q-btn label="Registrar" type="submit" color="primary" />
          <q-btn label="cancelar" type="reset" color="primary" to="/" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script>
const { PrismaClient } = window
  .require("electron")
  .remote.require("./client/index.js");
const prisma = new PrismaClient();
export default {
  data() {
    return {
      user: { name: undefined, email: undefined, role: undefined },
      options: ["USER", "ADMIN"],
    };
  },

  methods: {
    async newUser() {
      let newdata = await prisma.user.create({
        data: this.user,
      });
      this.$router.push("/");
    },
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first",
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
      }
    },
  },
};
</script>
