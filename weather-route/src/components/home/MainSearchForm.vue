<script setup lang="ts">
import { useSearchStore } from '@/stores/searchStore';
import FlagIcon from '../icons/FlagIcon.vue';
import LocationIcon from '../icons/LocationIcon.vue';
import TextInputForm from './TextInputForm.vue';
import TransportTypeButtons from './TransportTypeButtons.vue';
import WalkIcon from '../icons/WalkIcon.vue';
import BikeIcon from '../icons/BikeIcon.vue';
import CarSideIcon from '../icons/CarSideIcon.vue';
import DateTimePicker from './DateTimePicker.vue';
import ActionButton from '../ActionButton.vue';
import { toast } from 'vue3-toastify';

const searchStore = useSearchStore();

const transportIcons = {
  car: CarSideIcon,
  walk: WalkIcon,
  bike: BikeIcon
}

const resetFormData = () => {
  searchStore.resetAllValues()
  toast.info("Form resetted!")
}

</script>

<template>
  <main class="main-form-cont">

    <div class="form-first-row">
      <div class="location-input-cont">
        <div class="location-label-cont">
          <LocationIcon class="input-icon"/>
          <p class="form-item-label">Start location</p>
        </div>

        <TextInputForm placeholder="Enter a starting point" v-model="searchStore.startLocation"/>
      </div>

      <div class="inputs-connector-cont">
        <component :is="transportIcons[searchStore.transportMode]" class="dynamic-transport-icon"/>
        <hr>
      </div>

      <div class="location-input-cont">
        <div class="location-label-cont">
          <FlagIcon class="input-icon"/>
          <p class="form-item-label">Destination</p>
        </div>
        <TextInputForm placeholder="Select a destination" v-model="searchStore.endLocation"/>
      </div>
    </div>

    <div class="form-second-row-cont">
      <div class="transport-type-cont">
        <p class="form-item-label-second-row">Transport type</p>
        <TransportTypeButtons/>
      </div>

      <div class="date-pick-cont">
        <p class="form-item-label-second-row">Departure time (optional)</p>
        <DateTimePicker/>
      </div>

    </div>

    <div class="buttons-cont">
      <ActionButton :button-text="'Reset'" :button-type="'reset'" @button-click="resetFormData"/>
      <ActionButton :button-text="'Submit'" :button-type="'submit'"/>

    </div>

  </main>

</template>

<style scoped>
.main-form-cont{
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 800px;
  padding: 40px 20px;
  background-color: var(--green-2000);
  border-radius: var(--border-rad-big);
  border: 2px var(--green-250) solid;
}

.form-item-label{
  color: var(--green-100);
  /* margin-bottom: 10px; */
}

.form-first-row{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
}

.location-input-cont {
  display: flex;
  flex-direction: column;
}

.location-label-cont{
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 5px;
  padding-left: 5px;
}

.input-icon {
  width: 30px;
  height: 30px;
  color: var(--green-100);
  margin-right: 5px;

}


/* connection line with icon */
.inputs-connector-cont {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  position: relative;
  top: 20px;
}

.dynamic-transport-icon {
  width: 30px;
  height: 30px;
  color: var(--green-100);
  position: absolute;
  bottom: 10px;
}

.inputs-connector-cont hr {
  width: 100%;
  height: 3px;
  border-radius: 10px;
  border: none;
  background-color: var(--green-100);
}

/* second line with transport type and date and time picker */

.form-second-row-cont {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 700px;
  margin-top: 20px;
}

.form-item-label-second-row{
  color: var(--green-100);
  margin-bottom: 5px;
}


.date-pick-cont{
  display: flex;
  flex-direction: column;
  align-items: end;
}

/* buttons */
.buttons-cont{
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
}

@media (max-width: 800px) {
  .main-form-cont{
    width: 95%;
  }
}

/* display at two columns */
@media (max-width: 600px) {
  .main-form-cont{
    height: auto;
    padding: 20px 15px;
    width: 100%;
    /* border: none; */
    border-radius: 0;
  }

  /* adjust first row with the inputs */
  .form-first-row{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .location-input-cont{
    margin-bottom: 20px;
  }

  .inputs-connector-cont{
    display: none;
  }

  /* adjust second row with other settings */
  .form-second-row-cont{
    flex-direction: column;
    align-items: center;
  }

  .transport-type-cont{
    margin-bottom: 20px;
  }

  .buttons-cont{
    margin-top: 20px;
    justify-content: space-evenly;
  }
}
</style>
