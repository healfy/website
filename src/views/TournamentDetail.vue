<template>
  <v-container>
    <v-card class="pa-md-4">
      <div v-if="tournament">
        <tournament :tournament="tournament" />
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { ITournament } from "@/store/tournaments/types";
import Tournament from "@/components/tournaments/Tournament.vue";
import { useTournamentsStore } from "@/store/tournaments/store";

export default defineComponent({
  name: "TournamentDetail",
  components: {
    Tournament,
  },
  props: {
    tournamentId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const tournamentsStore = useTournamentsStore();
    const tournament: ComputedRef<ITournament | undefined> = computed((): ITournament | undefined => tournamentsStore.tournaments.find((t) => t.id === props.tournamentId));

    onMounted(async (): Promise<void> => {
      await tournamentsStore.retrieveTournaments();
    });

    return {
      tournament,
    };
  },
});
</script>
