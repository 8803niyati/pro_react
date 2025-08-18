import axios from "axios";


export const uploadImage = async (data) => {
    let formData = new FormData();

    formData.append('file', data);
    formData.append('upload_preset', "Blinkit_API");
    formData.append('cloud_name', 'dpkewgpv2');

    let res = await axios.post(`https://api.cloudinary.com/v1_1/dpkewgpv2/image/upload`, formData)
    return res.data.secure_url;
}