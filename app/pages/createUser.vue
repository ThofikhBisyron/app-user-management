<script setup> 
definePageMeta({
    layout: 'dashboard',
    middleware: ['admin']
})

const email = ref('')
const name = ref('')
const password = ref('')
const role = ref('user')

const errorMessage = ref('')
const loading = ref(false)
const toast = useToast()

async function createuser() {
    errorMessage.value = ''

    if (!email.value || !name.value || !password.value) {
        errorMessage.value = 'All field are required'
        return
    }

    if (password.value.length < 8) {
        errorMessage.value = 'Password must be at least 8 characters'
        return
    }

    loading.value = true
    try{
        const response = await $fetch("/api/admin", {
            method: "POST",
            body: {
                name: name.value,
                email: email.value,
                password: password.value,
                role: role.value,
            }
        })

        toast.add({
            title: 'Success',
            description: 'User created successfully',
            color: 'green'
        })

        name.value = ''
        email.value = ''
        password.value = ''
        role.value = 'user'
    }catch(err){
        errorMessage.value = err?.data.statusMessage || 'Something went wrong'

        toast.add({
            title: 'Error',
            description: errorMessage.value,
            color: 'red'
        })
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="text-2xl mt-10 mb-5 text-center">Create User</div>
    <div class="flex justify-center">
        <UCard variant="solid" class="w-96">
            <UAlert
            v-if="errorMessage"
            color="red"
            variant="soft"
            :title="errorMessage"
            class="text-red-500"
            />
            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-2">
                    <div>Email</div>
                    <UInput
                    class="w-full"
                    v-model="email"
                    placeholder="Enter email user"
                    type="email"
                    />  
                </div>
                <div class="flex flex-col gap-2">
                    <div>Name</div>
                    <UInput
                    class="w-full"
                    v-model="name"
                    placeholder="Enter name user"
                    type="username"
                    />  
                </div>
                <div class="flex flex-col gap-2">
                    <div>Password</div>
                    <UInput
                    class="w-full"
                    v-model="password"
                    placeholder="Enter password user"
                    type="password"
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <div>Role</div>
                    <USelect
                    class="w-full z-50"
                    v-model="role"
                    :items="[
                        { label: 'User', value: 'user' },
                        { label: 'Admin', value: 'admin' }
                    ]"
                    />
                </div>
            </div>
            <div class="flex justify-center mt-14">
                <UButton @click="createuser" class="justify-center" :loading="loading">
                    Create User
                </UButton>
            </div>
        </UCard>
    </div>
</template>