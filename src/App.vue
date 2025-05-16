<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      items: [
        {label: 'option.concerts', to: '/concerts'},
        {label: 'option.communities', to: '/communities'},
        {label: 'option.map', to: '/concerts-map' }

      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }

}
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header>
    <pv-toolbar class="custom-toolbar">
      <template #start>
        <div class="logo-section">
          <img src="https://the-rumbling.github.io/StayMap-Landing_Page/starymaplogo.png" alt="Logo" class="logo" />
        </div>
      </template>
      <template #center>
        <div class="flex gap-4 items-center">
          <router-link
              v-for="item in items"
              :key="item.label"
              :to="item.to"
              class="nav-button"
          >
            {{ $t(item.label) }}
          </router-link>
        </div>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer"/>
  </header>
  <main>
    <router-view/>
  </main>

</template>

<style>

</style>
