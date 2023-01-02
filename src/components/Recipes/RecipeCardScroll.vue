<template>
  <div>
    <div>recipe card scroll</div>
    <div class="container">
      <div v-for="(item, index) in recipes" class="card">
        <h3 class="title">{{ item.name }}</h3>
        <div v-if="item.images[0]">
          <span style="opacity: 0">
            {{ item.images[0].directus_files_id.id }}</span
          >
          <v-img
            v-if="item.images[0]"
            aspect-ratio="1"
            cover
            :src="`https://gncc41fw.directus.app/assets/${item.images[0].directus_files_id.id}`"
            :lazy-src="`https://gncc41fw.directus.app/assets/${item.images[0].directus_files_id.id}`"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </div>
        <!-- <div class="bar">
          <div class="emptybar"></div>
          <div class="filledbar"></div>
        </div> -->
        <!-- <div class="circle">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="stroke" cx="60" cy="60" r="50" />
          </svg>
        </div> -->
      </div>

      <!-- <div class="card">
        <h3 class="title">Card 2</h3>
        <div class="bar">
          <div class="emptybar"></div>
          <div class="filledbar"></div>
        </div>
        <div class="circle">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="stroke" cx="60" cy="60" r="50" />
          </svg>
        </div>
      </div> -->
      <!-- <div class="card">
        <h3 class="title">Card 3</h3>
        <div class="bar">
          <div class="emptybar"></div>
          <div class="filledbar"></div>
        </div>
        <div class="circle">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="stroke" cx="60" cy="60" r="50" />
          </svg>
        </div>
      </div> -->
      <!-- <div class="card">
        <h3 class="title">Card 4</h3>
        <div class="bar">
          <div class="emptybar"></div>
          <div class="filledbar"></div>
        </div>
        <div class="circle">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="stroke" cx="60" cy="60" r="50" />
          </svg>
        </div>
      </div>
    </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recipes: [],
    };
  },
  methods: {
    getRecipes() {
      console.log("gettting recipes");
      this.$axios
        .get(import.meta.env.VITE_APP_API + "/Recipes?fields=*.*.*.*.*images.*")
        .then((res) => {
          console.log(res.data.data, "articles");
          this.recipes = res.data.data;
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
  },
  mounted() {
    this.getRecipes();
  },
};
</script>
<style land="scss">
.container {
  height: 300px;
  width: 600px;
  top: 60px;
  left: calc(50% - 300px);
  display: flex;
}

.card {
  display: flex;
  height: 280px;
  width: 200px;
  background-color: #17141d;
  border-radius: 10px;
  box-shadow: -1rem 0 3rem #000;
  /*   margin-left: -50px; */
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;
}

.card:not(:first-child) {
  margin-left: -50px;
}

.card:hover {
  transform: translateY(-20px);
  transition: 0.4s ease-out;
}
.card:hover ~ .card {
  position: relative;
  left: 50px;
  transition: 0.4s ease-out;
}
.title {
  color: white;
  font-weight: 300;
  position: absolute;
  left: 20px;
  top: 15px;
}
.bar {
  position: absolute;
  top: 100px;
  left: 20px;
  height: 5px;
  width: 150px;
}
.emptybar {
  background-color: #2e3033;
  width: 100%;
  height: 100%;
}
.filledbar {
  position: absolute;
  top: 0px;
  z-index: 3;
  width: 0px;
  height: 100%;
  background: rgb(0, 154, 217);
  background: linear-gradient(
    90deg,
    rgba(0, 154, 217, 1) 0%,
    rgba(217, 147, 0, 1) 65%,
    rgba(255, 186, 0, 1) 100%
  );
  transition: 0.6s ease-out;
}
.card:hover .filledbar {
  width: 120px;
  transition: 0.4s ease-out;
}
.circle {
  position: absolute;
  top: 150px;
  left: calc(50% - 60px);
}
.stroke {
  stroke: white;
  stroke-dasharray: 360;
  stroke-dashoffset: 360;
  transition: 0.6s ease-out;
}
svg {
  fill: #17141d;
  stroke-width: 2px;
}

.card:hover .stroke {
  stroke-dashoffset: 100;
  transition: 0.6s ease-out;
}
</style>
