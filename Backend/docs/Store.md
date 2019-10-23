
# Products

## Get product list
| Endpoint    	| /products					 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Get the product list with pagination |                                  	|
| Body        	|                        	|                                  	|
|             	| offset            	      | The offset of the list. Ex: Page 2 with 20 product count per page is offset 40.	|
|             	| count            	      | The amount of products to return.	|
| Returns     	| Array of products			|                                  	|

## Search products
| Endpoint    	| /products/search		 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Search a product with a string query. |                                  	|
| Body        	|                        	|                                  	|
|             	| query            	      | The query to search for a product name. |
| Returns     	| Array of products			|                                  	|

## Get a product
| Endpoint    	| /products/get			 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Get a product from id.	|                                  	|
| Body        	|                        	|                                  	|
|             	| id	            	      | The id of the product.				|
| Returns     	| 									|                                  	|
|             	| name                  	| The product's name						|
|             	| description             	| The products description				|
|             	| cost                  	| The cost in MXN							|
|             	| amount                  	| The amount of products available	|
|             	| available               	| Boolean whether the product is available |

## Get a product's image
| Endpoint    	| /product/image/:id			|
|-------------	|------------------------	|
| Method      	| GET                   	|
| Description 	| Get a product's image, replace ':id' with the product's id.		|


# Cart
## Get a cart
| Endpoint    	| /cart						 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Get the info for the user's cart.	|                                  	|
| Body        	|                        	|                                  	|
|             	| items            	      | An array of objects with schema { id, amount } per each item.				|
| Returns     	| Array of products from the user's cart. |                                  	|