<template>
    <div>
        <v-dialog class="modal" max-width="50%" v-model="cValue"  scrollable>
            <v-card>
            <h1>Country Modal</h1>
            <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.
                </v-card-text>
                <!-- <v-card-actions>
                        <v-btn color="primary" block @click="openModal = false">Close Dialog</v-btn>
                </v-card-actions> -->
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRef, toRefs } from 'vue'

export default defineComponent({
    prop:{
        require: true,
        modelValue:true
    },
    emits: ['show'],
    name: "CountryModal",
    setup(props) {
        let cValue = true;
        //const {temp} = toRefs(props);
        const {temp} = toRefs(props) as any;
        //console.log('openModal value from Modal', temp.value);
     

        function close(){
        
            cValue=false;
            console.log('cValue',cValue);
        }
        return ({cValue, close, props});
    },
})
</script>
