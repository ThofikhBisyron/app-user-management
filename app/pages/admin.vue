<script setup>
definePageMeta({
    layout: 'dashboard',
    middleware: ['admin']
})

const {data : users, refresh} = await useFetch('/api/users?role=admin')
const toast = useToast()

async function updateRole(id, role) {
    try{
        await $fetch(`/api/admin/${id}`, {
            method: 'PATCH',
            body: {role}
        })

        toast.add({
            title: 'Success',
            description: 'Role updated',
            color: 'success'
        })

        await refresh()
    }catch(err){
        toast.add({
        title: 'Error',
        description: err?.data?.statusMessage || 'Failed to update role',
        color: 'error'
        })
    }
}

async function deleteUser(id) {
  try {
    await $fetch(`/api/admin/${id}`, {
      method: 'DELETE'
    })

    toast.add({
      title: 'Success',
      description: 'User deleted successfully',
      color: 'success'
    })

    await refresh()

  } catch (err) {
    toast.add({
      title: 'Error',
      description: err?.data?.statusMessage || 'Failed to delete user',
      color: 'error'
    })
  }
}
</script>
<template>
    <div class="text-2xl mt-10 mb-5 text-center">List Admin</div>
    <div class="flex justify-center">
        <UCard class="bg-linear-to-r from-blue-50 to-indigo-50 border shadow-md flex justify-center items-center">
            <table class="text-left border-collapse">
                <thead>
                    <tr class="">
                        <th class="p-3">No</th>
                        <th class="p-3">Name</th>
                        <th class="p-3">Email</th>
                        <th class="p-3">Role</th>
                        <th class="p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="user.id">
                        <td class="p-3">{{ index + 1 }}</td>
                        <td class="p-3">{{ user.name }}</td>
                        <td class="p-3">{{ user.email }}</td>
                        <td class="p-3">
                            <div :class="['border rounded-xl p-1.5 text-center border-hidden', user.role === 'admin' ? 'bg-green-200' : 'bg-blue-200']">
                                {{ user.role }}
                            </div>
                        </td>
                        <td class="p-3">
                            <div class="flex gap-2">
                                <UButton class="bg-green-400" @click="updateRole(user.id, 'user')">   
                                    Make User
                                </UButton>
                                <UButton class="bg-red-400" @click="deleteUser(user.id)">
                                    Delete
                                </UButton>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </UCard>
    </div>
</template>