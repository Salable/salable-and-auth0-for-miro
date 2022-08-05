const getLicence = async (email) => {
    // const user = await miro.board.getUserInfo();
    const productUuid = "5108c23c-efe4-40f7-9043-0caed0b3cbd4"
    const url = `https://api.salable.org/licenses/check?productUuid=${productUuid}&granteeIds=[${email}]`
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'qInsLxVYeT6GOPaNq2qAR4rFW1ZrBuVS9uHJIjUH'
            }
            })
        if (response.status === 200) return response.json()
        return null
    } catch (err) {
        console.log(err)
        return null
    }
  }

  export const getLicensesForPurchaser = async (email) => {
    // const user = await miro.board.getUserInfo();
    const productUuid = "5108c23c-efe4-40f7-9043-0caed0b3cbd4"
    console.log(email)
    const url = `https://api.salable.org/licenses/purchaser?productUuid=${productUuid}&purchaser=${email}`
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'qInsLxVYeT6GOPaNq2qAR4rFW1ZrBuVS9uHJIjUH'
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
