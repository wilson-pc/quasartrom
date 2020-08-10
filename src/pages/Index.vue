<template>
  <div class="q-pa-md">
    <q-table title="Usuarios" :data="data" :columns="columns" row-key="name" :filter="filter">
      <template v-slot:top-left>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <q-icon slot="append" name="search" />
        </q-input>
      </template>
      <template v-slot:top-right>
        <div class="q-pa-md q-gutter-sm">
          <q-btn :to="{ name: 'Create' }" color="positive" icon="add_box" />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import creteModal from "./CreateModal";
const { PrismaClient } = window
  .require("electron")
  .remote.require("./client/index.js");
const prisma = new PrismaClient();
export default {
  name: "PageIndex",
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "name",
          required: true,
          label: "Nombre",
          align: "center",
          sortable: true,
          field: "name",
        },
        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
          sortable: true,
        },
        { name: "role", label: "Rol", field: "role", sortable: true },
      ],
      data: [],
    };
  },
  methods: {
    async newUser() {
      let newdata = await prisma.user.create({
        data: {
          name: "Alice",
          email: "alice@prisma.io",
          role: "USER",
        },
      });
    },
    async openModal() {},
  },
  async mounted() {
    let aa = await prisma.user.findMany();
    this.data = aa;
  },
};
</script>
