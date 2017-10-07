<template>
    <select :style="{ width }" @changed="$emit('input', $event.target.value)">
        <option
            v-for="option in options"
            :value="option"
            :key="option"
        >{{ option }}</option>
    </select>
</template>
<script>
export default {
    props: {
        options: {
            type: Array,
            required: true
        },
        width: {
            type: String,
            default: '100%'
        }
    }
}
</script>
