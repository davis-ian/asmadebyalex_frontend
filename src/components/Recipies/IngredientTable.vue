<template>
  <div v-if="ingredients">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Amount</th>
          <th class="text-left">Unit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in ingredients">
          <td>{{ item.Ingredients_id.ingredient }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.Units_id.unit }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script>
export default {
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang=""></style>
