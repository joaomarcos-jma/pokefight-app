<template>
  <div class="fill-height">
    <div class="loader">
      <loader :animation-duration="2000" :size="60" color="#E3F2FD" />
    </div>
    <br />
    <div>
      <span class="text-center default font-weight-bold">{{'Aguarde, carregando...'}}</span>
    </div>
  </div>
</template>

<script>
import { FingerprintSpinner } from "epic-spinners";

export default {
  name: "loading",
  components: {
    loader: FingerprintSpinner,
  },
};
</script>
