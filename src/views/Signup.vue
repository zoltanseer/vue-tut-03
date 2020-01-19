<template>
  <div class="signup-wrap">
    <Signup />
  </div>
</template>

<script>
// @ is an alias to /src
import Signup from "@/components/auth/Signup.vue";

export default {
  name: "signup",
  components: {
    Signup
  }
};
</script>
