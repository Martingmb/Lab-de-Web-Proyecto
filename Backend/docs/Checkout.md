# Checkout

## Initialize checkout
| Endpoint    	| /cart						 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Get the info for the user's cart.	|                        	|
| Body        	|                        	|                                  	|
|             	| items            	      | An array of objects with schema { id, amount } per each item.				|
| Returns     	| 									|                                  	|
|             	| order_token             	| The new order's token, save this for future calls. |
|             	| items		              	| The order items with schema { product, quantity, cost, total }. (Product being the product's id) 					|
|             	| total	               	| The total to be paid in MXN			|
|             	| paid	               	| Whether the order has been paid or not	|

## Get order from checkout
| Endpoint    	| /cart						 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Get the info for the user's cart.	|                        	|
| Body        	|                        	|                                  	|
|             	| items            	      | An array of objects with schema { id, amount } per each item.				|
| Returns     	| 									|                                  	|
|             	| id		               	| The new order's id, save this for future calls. |
|             	| items		              	| The order items with schema { product, quantity, cost, total }. (Product being the product's id) 					|
|             	| total	               	| The total to be paid in MXN			|
|             	| paid	               	| Whether the order has been paid or not	|