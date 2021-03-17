class apiConfig {
    token = () => { return {Authorization: "Token " + localStorage.getItem("token") }}
}

export default apiConfig;