import { DB } from "../../firebase"

export const handleSaveOrder = order => {
    return new Promise((resolve, reject) => {
        DB.collection("orders").doc().set(order).then(() => {
            resolve()
        }).catch((error => reject(error)))
    })
};


export const handleGetUserOrderHistory = uid => {
    return new Promise((resolve, reject) => {
        let ref = DB.collection("orders").orderBy("orderCreatedDate");
        ref = ref.where("orderUserID", "==", uid);

        ref.get().then(snap => {
            const data = [
                ...snap.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
            ];
            resolve({ data })
        }).catch((error) => reject(error));
    });
};


export const handleGetOrder = orderID => {
    return new Promise((resolve, reject) => {
        DB.collection("orders").doc(orderID).get().then(snap => {
            if (snap.exists) {
                resolve({...snap.data(), documentID: orderID})
            }
        }).catch((error) => reject(error))
    })
}