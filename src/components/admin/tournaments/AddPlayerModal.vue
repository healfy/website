<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Add Player</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="12">
            <v-text-field v-model="battleTag" label="Battletag" autofocus></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="12">
            <v-select
              :items="races()"
              v-model="race"
              item-text="raceName"
              item-value="raceId"
              label="Race"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="cancel">
        {{ $t(`views_admin.cancel`) }}
      </v-btn>
      <v-btn color="primary" class="w3-race-bg--text" @click="save" :disabled="saving || battleTag.length === 0">
        {{ $t(`views_admin.save`) }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { ITournament } from "@/store/tournaments/types";
import { ERaceEnum } from "@/store/types";
import { races } from "@/helpers/general";

export default defineComponent({
  name: "AddPlayerModal",
  components: {},
  props: {
    tournament: {
      type: Object as PropType<ITournament>,
      required: true,
    },
    saving: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props, context) {
    const battleTag = ref<string>("");
    const race = ref<string>(ERaceEnum.RANDOM.toString());

    function cancel() {
      context.emit("cancel");
    }

    function save() {
      context.emit("save", battleTag.value, +race.value);
    }

    return {
      battleTag,
      race,
      races,
      cancel,
      save,
    };
  },
});
</script>
