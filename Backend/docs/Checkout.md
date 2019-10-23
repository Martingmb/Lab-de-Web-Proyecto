## Initialize checkout
| Endpoint    	| /checkout					 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Initialize an order from a given cart.	|                        	|
| Body        	|                        	|                                  	|
|             	| items            	      | An array of objects with schema { id, amount } per each item.				|
| Returns     	| 									|                                  	|
|             	| order_token             	| The new order's token, save this for future calls. |
|             	| items		              	| The order items with schema { product, quantity, cost, total }. (Product being the product's id) 					|
|             	| total	               	| The total to be paid in MXN			|
|             	| paid	               	| Whether the order has been paid or not	|

## Get order from checkout
| Endpoint    	| /checkout/get			 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Get the info from an order with the given token.	|                        	|
| Body        	|                        	|                                  	|
|             	| order_token             	| The new order's token, saved from /checkout call. |
| Returns     	| 									|                                  	|
|             	| items		              	| The order items with schema { id, quantity, cost, total, name }.					|
|             	| total	               	| The total to be paid in MXN			|
|             	| paid	               	| Whether the order has been paid or not	|