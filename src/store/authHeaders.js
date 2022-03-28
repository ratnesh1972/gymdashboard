const authHeaders = () => {
    if (localStorage.getItem('token')) {
        return {
            headers: { 'X-Auth-Token': localStorage.getItem('token') }
        }
    }
}
export default authHeaders;