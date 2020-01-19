<template>
  <div class="login-wrap">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/auth/Login.vue";

export default {
  name: "login",
  components: {
    Login
  }
};
</script>
