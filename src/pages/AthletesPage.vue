<template>
  <q-page class="column items-center">
    <div class="q-pa-md row q-gutter-sm justify-center" style="min-width: 40%">
      <h5 class="col-12 q-ma-xs text-center">Lista de atletas</h5>
      <q-btn @click="createOpen = true" class="col-12" color="primary"
        >Agregar atleta</q-btn
      >
      <q-list class="col-12" bordered separator>
        <q-item
          v-for="(athlete, index) in athletes"
          :key="index"
          clickable
          v-ripple
        >
          <q-item-section>
            <q-item-label
              ><span class="text-bold">Nombre:</span>
              {{ athlete.name }}</q-item-label
            >
          </q-item-section>
          <q-item-section>
            <q-item-label
              ><span class="text-bold">Pais: </span>
              <q-badge :label="athlete.country"
            /></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-dialog v-model="createOpen">
      <q-card>
        <q-card-section class="row q-gutter-sm">
          <q-input
            class="col-12"
            label="Nombre"
            v-model="newAthlete.name"
          ></q-input>
          <q-input
            class="col-12"
            label="Pais"
            v-model="newAthlete.country"
          ></q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="primary"
            v-close-popup
            @click="createAthlete"
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
const athletes_collection = collection(db, "athletes");

// quasar
const $q = useQuasar();

//data
const athletes = useCollection(athletes_collection);
const createOpen = ref(false);
const newAthlete = ref({ name: "", country: "" });

// functions
const createAthlete = () => {
  $q.loading.show({});
  setDoc(doc(athletes_collection), newAthlete.value).finally(() => {
    $q.loading.hide();
  });
  newAthlete.value = { name: "", country: "" };
};

onMounted(() => {});
</script>
