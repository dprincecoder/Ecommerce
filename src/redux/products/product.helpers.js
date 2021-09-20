import { DB } from "../../firebase";

//helper function to add products to database
export const handleAddProduct = (product) => {
	return new Promise((resolve, reject) => {
		DB.collection("products")
			.doc()
			.set(product)
			.then(() => {
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});
};

//helper function to fetch products from database
export const handleFetchProducts = ({filterType, startAfterDoc, persistProducts=[]}) => {
	return new Promise((resolve, reject) => {
		
	const pageSize = 3
	let ref = DB.collection("products").orderBy("createdDate").limit(pageSize);
	
	if(filterType) {
		ref = ref.where("productCategory", "==", filterType);
	}
	if(startAfterDoc) {
		ref = ref.startAfter(startAfterDoc);
	}
		
		ref.get()
			.then((snapshot) => {
				const totalCount = snapshot.size
				const data = [
					...persistProducts,
					...snapshot.docs.map((doc) => {
						return {
							...doc.data(),
							documentID: doc.id,
						};
					})
				];
				resolve({data, queryDoc: snapshot.docs[totalCount - 1], isLastPage: totalCount < 1});
			})
			.catch((error) => {
				reject(error);
			});
	});
};

//helper function to delete products from database;
export const handleDeleteProducts = (documentID) => {
	return new Promise((resolve, reject) => {
		DB.collection("products")
			.doc(documentID)
			.delete()
			.then(() => {
				resolve();
			})
			.catch((error) => reject(error));
	});
};


//helper function to fetchproduct from database;
export const handleFetchProduct = productID => {
	return new Promise((resolve, reject) => {
		DB.collection("products").doc(productID).get().then((snapshot) => {
			if(snapshot.exists){
				resolve(snapshot.data())
			}
		}).catch((error) => reject(error));
	})
}