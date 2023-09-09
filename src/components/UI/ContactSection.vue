<template>
  <div class="contact-section">
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <div class="pa-5">
          <h1 class="all-caps display">Get In Touch</h1>
          <p>
            Drop us a message and let's start a conversation. We love hearing
            from you and will get back to you as soon as we can. And don't
            worry, your message is safe with us.
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="pa-5">
          <v-text-field
            variant="solo"
            bg-color="white"
            label="Name"
          ></v-text-field>
          <v-text-field
            variant="solo"
            bg-color="white"
            label="Email"
          ></v-text-field>
          <v-textarea
            variant="solo"
            bg-color="white"
            label="Message"
          ></v-textarea>
          <v-btn style="color: #313035" color="#f3d6d8">Send</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.contact-section {
  background-color: #313035;
  color: #f3d6d8;

  p {
    color: white;
  }
}
</style>
