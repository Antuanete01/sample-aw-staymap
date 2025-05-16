<script>
import CreateAndEditComponent from "@/shared/components/create-and-edit.component.vue";

export default {
  name: "concert-item-create-and-edit-dialog",
  components: {CreateAndEditComponent},
  props: {
    item: null,
    visible: false,
    edit: false,
  },
  emits: ['cancel-requested', 'save-requested'],
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested', this.item);
    }
  }
}
</script>

<template>
  <create-and-edit-component
      :entity="item"
      :visible="visible"
      :edit="edit"
      entity-name="Concert"
      @cancel-action-requested="onCancelRequested"
      @save-action-requested="onSaveRequested"
  >
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="item.name" :class="{ 'p-invalid': submitted && !item.name }"/>
          </pv-float-label>
        </div>
        <div class="field mt-3">
          <pv-float-label>
            <label for="memberQuantity">Members</label>
            <pv-input-text id="memberQuantity" v-model="item.memberQuantity"/>
          </pv-float-label>
        </div>
        <div class="field mt-3">
          <pv-float-label>
            <label for="image">Image URL</label>
            <pv-input-text id="image" v-model="item.image"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit-component>
</template>

<style scoped>

</style>