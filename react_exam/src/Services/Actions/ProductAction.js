// import axios from "axios";

// export const loading = () => ({ type: "LOADING" });

// export const addProductSUC = () => ({ type: "ADD_PRODUCT_SUC" });

// export const addProductRej = (err) => ({
//   type: "ADD_PRODUCT_REJ",
//   payload: err,
// });

// export const getAllProducts = (data) => ({
//   type: "GET_ALL_PRODUCTS_SUC",
//   payload: data,
// });

// export const getProductsRej = (err) => ({
//   type: "GET_ALL_PRODUCTS_REJ",
//   payload: err,
// });

// export const getProduct = (data) => ({
//   type: "GET_PRODUCT",
//   payload: data,
// });

// // ✅ Update success action
// export const updateProductSUC = () => ({
//   type: "UPDATE_PRODUCT_SUC",
// });

// // ✅ Reset update flag
// export const resetUpdate = () => ({
//   type: "RESET_UPDATE",
// });

// // 🔹 Get all products
// export const getAllProductAsync = () => {
//   return async (dispatch) => {
//     dispatch(loading());
//     try {
//       const res = await axios.get("http://localhost:3000/products");
//       dispatch(getAllProducts(res.data));
//     } catch (error) {
//       dispatch(getProductsRej(error.message));
//     }
//   };
// };

// // 🔹 Add product
// export const addProductAsync = (data) => {
//   return async (dispatch) => {
//     dispatch(loading());
//     try {
//       await axios.post("http://localhost:3000/products", data);
//       dispatch(addProductSUC());
//       dispatch(getAllProductAsync());
//     } catch (error) {
//       dispatch(addProductRej(error.message));
//     }
//   };
// };

// // 🔹 Delete product
// export const deleteProductAsync = (id) => {
//   return async (dispatch) => {
//     dispatch(loading());
//     try {
//       await axios.delete(`http://localhost:3000/products/${id}`);
//       dispatch(getAllProductAsync());
//     } catch (error) {
//       dispatch(addProductRej(error.message));
//     }
//   };
// };

// // 🔹 Get single product
// export const getProductAsync = (id) => {
//   return async (dispatch) => {
//     dispatch(loading());
//     try {
//       const res = await axios.get(`http://localhost:3000/products/${id}`);
//       dispatch(getProduct(res.data));
//     } catch (error) {
//       dispatch(addProductRej(error.message));
//     }
//   };
// };

// // 🔹 Update product
// export const updateProductAsync = (product) => {
//   return async (dispatch) => {
//     dispatch(loading());
//     try {
//       // 🔹 Update product
//       await axios.put(`http://localhost:3000/products/${product.id}`, product);
      
//       dispatch(updateProductSUC()); // ✅ Set update success flag

//       // 🔹 Refresh product list
//       dispatch(getAllProductAsync());
      
//     } catch (error) {
//       dispatch(addProductRej(error.message));
//     }
//   };
// };
import axios from 'axios';

export const loading = () => {
    return {
        type: "LOADING"
    }
}


export const addProductSUC = () => {
    return {
        type: "ADD_PRODUCT_SUC",
    }
}

export const addProductRej = (err) => {
    return {
        type: "ADD_PRODUCT_REJ",
        payload: err
    }
}



export const getAllProducts = (data) => {
    return {
        type: "GET_ALL_PRODUCTS_SUC",
        payload: data
    }
}
export const getProductsRej = (err) => {
    return {
        type: "GET_ALL_PRODUCTS_REJ",
         payload: err
    }
}


export const getProduct = (data) => {
    return {
        type: "GET_PRODUCT",
        payload: data
    }
}

export const updateProduct = () => {
    return {
        type: "UPDATE_PRODUCT"
    }
}


// async action
// get all product
export const getAllProductAsync = () => {
    return async(dispatch) => {
        dispatch(loading());
        try {
            let res = await axios.get('http://localhost:3000/products') 
            // console.log(res.data);
            dispatch(getAllProducts(res.data));
        } catch (error) {
            console.log(error);
            dispatch(getProductsRej(error.message))
        }
        
    }
}

// add new product
export const addProductAsync = (data) => {
    return async(dispatch) => {
        dispatch(loading());
        try {
            let res = await axios.post('http://localhost:3000/products', data) 
            // console.log(res);
            dispatch(addProductSUC());
        } catch (error) {
            console.log(error);
            dispatch(addProductRej(error.message))
        }
    }
}

// delete product
export const deleteProductAsync = (id) => {
    return async(dispatch) => {
        dispatch(loading());
        try {
            let res = await axios.delete(`http://localhost:3000/products/${id}`) 
            // console.log(res);
            dispatch(getAllProductAsync());
        } catch (error) {
            console.log(error);
            dispatch(addProductRej(error.message))
        }
    }
}

// get single product
export const getProductAsync = (id) => {
    return async(dispatch) => {
        dispatch(loading());
        try {
            let res = await axios.get(`http://localhost:3000/products/${id}`) 
            // console.log(res);
            dispatch(getProduct(res.data));
        } catch (error) {
            console.log(error);
            dispatch(addProductRej(error.message))
        }
    }
}

// update prpduct
export const updateProductAsync = (data) => {
    return async(dispatch) => {
        dispatch(loading());
        try {
            let res = await axios.put(`http://localhost:3000/products/${data.id}`, data) 
            // console.log(res);
            dispatch(updateProduct());
        } catch (error) {
            console.log(error);
            dispatch(addProductRej(error.message))
        }
    }
}
