<template>
  <div>
    <!-- Your component's content -->
    <h3>CALLBACK PAGE</h3>
  </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
export default {
  data() {
    return {
      message: "hi",
      user: this.$auth0.user,
    };
  },
  watch: {
    user() {
      // TODO: setup role based reroute
      //   console.log("user changed", this.user);
    },
  },
  mounted() {
    this.$router.push("/admin");
  },
};
</script>
