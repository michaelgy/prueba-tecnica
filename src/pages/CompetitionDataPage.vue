<template>
  <q-page class="column items-center">
    <div class="q-pa-md row q-gutter-sm justify-center" style="min-width: 40%">
      <h5 class="col-12 q-ma-xs text-center">
        Lista de registros en la competencia
      </h5>
      <q-btn @click="createOpen = true" class="col-12" color="primary"
        >Agregar registro</q-btn
      >
      <q-list class="col-12" bordered separator>
        <q-item
          v-for="(data, index) in competitionData"
          :key="index"
          clickable
          v-ripple
        >
          <q-item-section>
            <q-item-label
              ><span class="text-bold">Nombre:</span>
              {{ data.athlete }}</q-item-label
            >
          </q-item-section>
          <q-item-section>
            <q-item-label
              ><span class="text-bold">Pais: </span>
              <q-badge :label="data.country"
            /></q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label
              ><span class="text-bold">Modalidad: </span>
              {{ data.mode }}</q-item-label
            >
          </q-item-section>

          <q-item-section>
            <q-item-label
              ><span class="text-bold">Peso (Kg): </span>
              {{ data.weight }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-dialog v-model="createOpen">
      <q-card>
        <q-card-section class="row q-gutter-sm">
          <q-select
            label="Atleta"
            :options="athletes"
            v-model="selectedAthlete"
            :option-label="(opt) => opt.name"
            class="col-12"
          />
          <q-select
            label="Modalidad"
            :options="['Arranque', 'Envión']"
            v-model="newData.mode"
            class="col-12"
          />
          <q-input
            class="col-12"
            label="Pais"
            type="number"
            v-model="newData.weight"
          ></q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="primary"
            v-close-popup
            @click="createData"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
// imports
import { onMounted, ref } from "vue";
import { useCollection, useFirestore } from "vuefire";
import { collection, setDoc, doc } from "firebase/firestore";
import { useQuasar } from "quasar";

// firebase
const db = useFirestore();
const competitionData_collection = collection(db, "competitionData");
const athletes_collection = collection(db, "athletes");

// quasar
const $q = useQuasar();

//data
const athletes = useCollection(athletes_collection);
const competitionData = useCollection(competitionData_collection);

const createOpen = ref(false);

const selectedAthlete = ref(null);
const newData = ref({ mode: "", weight: 0 });

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

onMounted(() => {});
</script>
