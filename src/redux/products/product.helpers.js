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
export const handleFetchProducts = ({filterType}) => {
	return new Promise((resolve, reject) => {
	let ref = DB.collection("products").orderBy("createdDate");
	
	if(filterType) {
		ref = ref.where("productCategory", "==", filterType);
	}
		
		ref.get()
			.then((snapshot) => {
				const productsArray = snapshot.docs.map((doc) => {
					return {
						...doc.data(),
						documentID: doc.id,
					};
				});
				resolve(productsArray);
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
