<script setup lang="ts">
import { useSearchStore } from '@/stores/searchStore';
import FlagIcon from '../icons/FlagIcon.vue';
import LocationIcon from '../icons/LocationIcon.vue';
import TextInputForm from './TextInput.vue';
import TransportTypeButtons from './TransportTypeButtons.vue';
import WalkIcon from '../icons/WalkIcon.vue';
import BikeIcon from '../icons/BikeIcon.vue';
import CarSideIcon from '../icons/CarSideIcon.vue';
import DateTimePicker from './DateTimePicker.vue';
import ActionButton from '../MainButton.vue';
import { Slide, toast } from 'vue3-toastify';
import GPSIcon from '../icons/GPSIcon.vue';
import { useGeolocationAPI } from '@/composables/useGeolocationAPI';
import { fetchCoordsFromLocation } from '@/api/nominatimApi';
import {ref} from 'vue'
import { storeToRefs } from 'pinia';
import PrecisionSlider from './PrecisionSlider.vue';
import { useNetworkStore } from '@/stores/networkStore';
import NoWifiIcon from '../icons/NoWifiIcon.vue';

const emits = defineEmits<{
  formSubmitted: []
}>()

const networkStore = useNetworkStore()

const searchStore = useSearchStore();
const {
  startCoords,
  endCoords
} = storeToRefs(searchStore)

const {getUserLocation} = useGeolocationAPI()

const buttonsDisabled = ref(false)

//erros
const startInputError = ref('')
const endInputError = ref('')

const transportIcons = {
  car: CarSideIcon,
  foot: WalkIcon,
  bike: BikeIcon
}

const resetFormData = () => {
  searchStore.resetAllValues()
  // toast.info("Form resetted!")
}

const submitFormData = async (e: Event) => {
  buttonsDisabled.value = true

  //validate destinations
  await validateFormInputs();

  if (startInputError.value !== "" || endInputError.value !== "") {
    e.preventDefault()
    toast.error("Invalid data in the form")
    buttonsDisabled.value = false
    return
  }

  buttonsDisabled.value = false

  emits('formSubmitted')
}

const validateFormInputs = async () => {
  // Validate start location
  if (!searchStore.startLocation.trim()) {
    startInputError.value = "Starting location is required";
  } else {
    const startingCoords = await fetchCoordsFromLocation(searchStore.startLocation);
    if (startingCoords === null) {
      startInputError.value = "Location not found";
      startCoords.value = {lat: null, lon: null}
    } else {
      startInputError.value = "";
      startCoords.value = { lat: startingCoords.lat, lon: startingCoords.lon };
    }
  }

  // Validate end location
  if (!searchStore.endLocation.trim()) {
    endInputError.value = "Destination is required";
  } else {
    const endCoordsFetched = await fetchCoordsFromLocation(searchStore.endLocation);
    if (endCoordsFetched === null) {
      endInputError.value = "Location not found";
      endCoords.value = {lat: null, lon: null}
    } else {
      console.log(endCoordsFetched)
      endInputError.value = "";
      endCoords.value = { lat: endCoordsFetched.lat, lon: endCoordsFetched.lon };
    }
  }
}

const locationLoading = ref(false)
const findUserLocation = async () => {
  locationLoading.value = true
  try {
    const coords = await getUserLocation()
    searchStore.startLocation = coords
    toast.success("GPS location found")
    startInputError.value = ""
  } catch (error) {
    startInputError.value = "Invalid starting location"
    toast.error(`Failed to get location data: ${error}`)
  }

  locationLoading.value = false

}

</script>

<template>
  <form class="main-form-cont" @submit.prevent="submitFormData" @reset.prevent="resetFormData">

    <div class="form-first-row">

      <div class="location-input-cont">

        <div class="location-label-cont">
          <LocationIcon class="input-icon"/>
          <p class="form-item-label">Start location</p>

          <button class="gps-button tooltip" @click="findUserLocation" type="button" :disabled="locationLoading || !networkStore.isOnline">
            <GPSIcon class="gps-icon"/>
            <span class="tooltiptext">Get current loaction</span>
          </button>
        </div>

        <TextInputForm placeholder="Enter a starting point" v-model="searchStore.startLocation" :error-msg="startInputError"/>
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
        <TextInputForm placeholder="Select a destination" v-model="searchStore.endLocation" :error-msg="endInputError"/>
      </div>
    </div>

    <div class="form-second-row-cont">

      <div class="transport-type-cont">
        <p class="form-item-label-second-row">Transport type</p>
        <TransportTypeButtons/>
      </div>

      <div class="date-pick-cont tooltip">
        <span class="tooltiptext">Leave blank to use current time</span>
        <p class="form-item-label-second-row">Departure time (optional)</p>
        <DateTimePicker/>
      </div>

    </div>

    <PrecisionSlider />


    <div class="buttons-cont">
      <ActionButton :button-text="'Reset'" :button-type="'reset'" :button-disabled="buttonsDisabled"/>
      <ActionButton :button-text="'Submit'" :button-type="'submit'" :button-disabled="buttonsDisabled || !networkStore.isOnline"/>
    </div>

    <p v-if="!networkStore.isOnline" class="offline-message"><NoWifiIcon/> Your are offline</p>

  </form>

</template>

<style scoped>
.main-form-cont{
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 800px;
  padding: 40px 20px;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.358);
  border-radius: var(--border-rad-big);
  border: 2px var(--primary-250) solid;
}

.form-item-label{
  color: var(--primary-100);
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
  color: var(--primary-100);
  margin-right: 5px;

}

.gps-button {
  margin-left: auto;
  padding: 5px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border-radius: var(--border-rad-main);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ease-in-out 0.1s;
}

.gps-button:hover {
  background-color: var(--primary-500);
  filter: brightness(1.1);
}

.gps-button:disabled {
  filter: brightness(0.8);
  cursor: not-allowed;
}

.gps-icon {
  color: var(--primary-100);
  width: 30px;
  height: 30px;
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
  color: var(--primary-100);
  position: absolute;
  bottom: 10px;
}

.inputs-connector-cont hr {
  width: 100%;
  height: 3px;
  border-radius: 10px;
  border: none;
  background-color: var(--primary-100);
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
  color: var(--primary-100);
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
  margin-top: 20px;
}

.offline-message {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: var(--header-text);
  color: rgb(254, 81, 81);
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
