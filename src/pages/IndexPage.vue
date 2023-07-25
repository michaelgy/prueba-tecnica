<template>
  <q-page class="flex flex-center">
    <q-table
      title="Tablero principal"
      :rows="computedRows"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script setup>
// imports
import { computed, onMounted, ref } from "vue";
import { useCollection, useFirestore } from "vuefire";
import { collection, setDoc, doc } from "firebase/firestore";
import { useQuasar } from "quasar";

// firebase
const db = useFirestore();
const competitionData_collection = collection(db, "competitionData");

// quasar
const $q = useQuasar();

//data
const competitionData = useCollection(competitionData_collection);

const columns = [
  {
    name: "country",
    required: true,
    label: "Pais",
    align: "left",
    field: (row) => row.country,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "athlete",
    align: "center",
    label: "Nombre",
    field: "athlete",
    sortable: true,
  },
  {
    name: "arranque",
    align: "center",
    label: "Arranque (Kg)",
    field: "arranque",
    sortable: true,
  },
  {
    name: "envion",
    align: "center",
    label: "Envion (Kg)",
    field: "envion",
    sortable: true,
  },
  {
    name: "totalPeso",
    align: "center",
    label: "Total peso (Kg)",
    field: "totalPeso",
    sortable: true,
  },
];

// functions
const createData = () => {
  if (selectedAthlete.value) {
    $q.loading.show({});
    newData.value.weight = Number(newData.value.weight);
    setDoc(doc(competitionData_collection), {
      athlete: selectedAthlete.value.name,
      country: selectedAthlete.value.country,
      ...newData.value,
    }).finally(() => {
      $q.loading.hide();
    });
    newData.value = { mode: "", weight: 0 };
  }
};

// computed values
const computedRows = computed(() => {
  let r = {};
  competitionData.value.forEach((data) => {
    /*{
    country: "AUS",
    athlete: "Carlos Alviz",
    arranque: 134,
    envion: 177,
    totalPeso: 311,
  }, */
    if (!r[data.athlete]) {
      r[data.athlete] = {
        country: data.country,
        athlete: data.athlete,
        arranque: 0,
        envion: 0,
        totalPeso: 0,
      };
    }
    if (data.mode === "Envión" && r[data.athlete].envion < data.weight) {
      r[data.athlete].envion = data.weight;
    }
    if (data.mode === "Arranque" && r[data.athlete].arranque < data.weight) {
      r[data.athlete].arranque = data.weight;
    }
    r[data.athlete].totalPeso =
      r[data.athlete].envion + r[data.athlete].arranque;
  });
  r = Object.values(r);
  r.sort((d1, d2) => d2.totalPeso - d1.totalPeso);
  return r;
});

onMounted(() => {});
</script>
