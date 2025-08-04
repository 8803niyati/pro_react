const initalState = {
    products: JSON.parse(localStorage.getItem("products")) || [],
    product: null,
    isLoading: false
}


export const productReducer = (state = initalState, action) => {
    switch(action.type){
        case "LOADING": 
        return {
            ...state,
            isLoading: true
        }
        case "ADD_PRODUCT":
            let allData = JSON.parse(localStorage.getItem("products")) || [];
            allData.push(action.payload);
            localStorage.setItem("products", JSON.stringify(allData));
            return {
                ...state,
                products: [...state.products, action.payload]
            };
        
        case "GET_ALL_PRODUCTS": 
            let prods = JSON.parse(localStorage.getItem("products")) || [];
            return {
                ...state,
                products: prods,
                isLoading: false
            }
        case "DELETE_PRODUCT":
            let alldata = JSON.parse(localStorage.getItem("products")) || [];
            alldata = alldata.filter(prod => prod.id != action.payload)
            localStorage.setItem("products", JSON.stringify(alldata));
            return {
                ...state,
                products: alldata
            }
        
        case "GET_PRODUCT":
            let alldatas = JSON.parse(localStorage.getItem("products")) || [];
            let singleRec = alldatas.find(prod => prod.id == action.payload)
            return {
                ...state,
                product: singleRec
            }
        
        case "UPDATE_PRODUCT":
            let data = JSON.parse(localStorage.getItem("products")) || [];
            let updatedData = data.map(prod => {
                if(prod.id == action.payload.id){
                    return action.payload
                }else{
                    return prod
                }
            })
            localStorage.setItem("products", JSON.stringify(updatedData));
            return {
                ...state,
                product: null,
                products: updatedData
            }
        default:
            return state;
    }
}