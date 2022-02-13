<template>
    <div class="flex flex-col w-full mb-2">
        <button @click="toggle" class="flex items-center justify-between shadow bg-white p-2 text-xl font-medium leading-none text-gray-800">
            <slot name="title" />

            <svg
                class="w-3 transition-all duration-200 transform"
                :class="{ 'rotate-180': isOpen, 'rotate-0': !isOpen, }"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 10"
            >
                <path
                d="M15 1.2l-7 7-7-7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                />
            </svg>
        </button>

        <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
            <div v-if="isOpen" class="p-4">
                <slot name="content" />
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        expand: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            isOpen: this.expand,
        }
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },
        beforeEnter(e) {
            e.style.height = '0';
        },
        enter(e) {
            e.style.height = e.scrollHeight + 'px';
        },
        beforeLeave(e) {
            e.style.height = e.scrollHeight + 'px';
        },
        leave(e) {
            e.style.height = '0';
        },
    }
}
</script>