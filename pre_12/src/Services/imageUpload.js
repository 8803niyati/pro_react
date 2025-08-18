import axios from "axios";


export const uploadImage = async (data) => {
    let formData = new FormData();

    formData.append('file', data);
    formData.append('upload_preset', "product");
    formData.append('cloud_name', 'dheweokqn');

    let res = await axios.post(`https://api.cloudinary.com/v1_1/dheweokqn/image/upload`, formData)
    return res.data.secure_url;
}