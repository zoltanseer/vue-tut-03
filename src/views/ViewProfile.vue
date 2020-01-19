<template>
  <div class="profile-wrap">
    <ViewProfile />
  </div>
</template>

<script>
// @ is an alias to /src
import ViewProfile from "@/components/profile/ViewProfile.vue";

export default {
  name: "viewprofile",
  components: {
    ViewProfile
  }
};
</script>
