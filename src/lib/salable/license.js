const getLicence = async (email) => {
    // const user = await miro.board.getUserInfo();

    const productUuid = process.env.REACT_APP_SALABLE_PRODUCT_UUID
    const url = `https://api.salable.app/licenses/check?productUuid=${productUuid}&granteeIds=[${email}]`
    if (productUuid) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.REACT_APP_SALABLE_API_KEY
                }
                })
            if (response.status === 200) return response.json()
            return null
        } catch (err) {
            console.log(err)
            return null
        }
    }   else return null
  }

  export const getLicensesForPurchaser = async (email) => {
    // const user = await miro.board.getUserInfo();
    const productUuid = process.env.REACT_APP_SALABLE_PRODUCT_UUID
    const url = `https://api.salable.app/licenses/purchaser?productUuid=${productUuid}&purchaser=${email}`
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_SALABLE_API_KEY
            }
            })
        if (response.status === 200) return response.json()
        return null
    } catch (err) {
        console.log(err)
        return null
    }
  }
  
  export default getLicence
