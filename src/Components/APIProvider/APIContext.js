import React from 'react'

const APIContext = React.createContext()
export const useAPI = () => {
    return React.useContext(APIContext)
}
export default function APIProvider({children}) {
    const [data,setData] = React.useState([])
    const [cartData,setCartData] = React.useState([]);

    const onAddToCart = (id) => {
        data.forEach(obj=>{
            let alreadyPresent = false;
            if(obj.id===id) {
                const newCartData = cartData.map(object=>{
                    if(object.id===id){
                        alreadyPresent = true;
                        return {...object,newPrice:object.price+(object.newPrice ? object.newPrice : 0)}
                    }
                    return object;
                })
                console.log('newCartData',newCartData)
                if(alreadyPresent) setCartData(newCartData)
                else setCartData([...newCartData,obj])
            }
        })
    }

    const onUpdateQuantity = (id, value = 1) => {
        const updatedCartData = cartData.map(obj => {
            if (id === obj.id) {
                return {...obj, newPrice: obj.price * value};
            }
            return obj;
        });
        setCartData(updatedCartData);
    };

    const onRemoveItem = (id) => {
        const remainingCartData = cartData.filter(obj=>obj.id!==id)
        setCartData(remainingCartData)
        
    }
    React.useEffect(()=>{
        fetchData()
    },[])
    const fetchData = async() => {
        const result = await fetch('https://fakestoreapi.com/products')
        const res = await result.json()
        console.log('res: ', res);
        setData(res)
    }
  return (
    <APIContext.Provider value={{data,onAddToCart,cartData,setCartData,onUpdateQuantity,onRemoveItem}}>
        {children}
    </APIContext.Provider>
  )
}
