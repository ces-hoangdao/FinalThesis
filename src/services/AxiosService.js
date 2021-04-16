class AxiosService {
    token = () => { return {Authorization: "Token " + localStorage.getItem("token") }}
}

export default AxiosService;