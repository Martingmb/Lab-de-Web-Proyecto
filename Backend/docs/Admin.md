
# Admin User CRUD
## Login
| Endpoint    	| /admin/login 	|                                  	|
|-------------	|--------------	|----------------------------------	|
| Method      	| POST         	|                                  	|
| Description 	| Login the user, returns a token to be used in all the calls for admin stuff.|
| Body        	|              	|                                  	|
|             	| email        	| The user's email                 	|
|             	| password     	| The user's password in plaintext 	|
| Returns     	|              	|                                  	|
|             	| name         	| The user's name                  	|
|          		| email         	| The user's email                 	|
|          		| token         	| The token to be used. Needs to be stored in session. |

## Get admin users
| Endpoint 	| /admin/users 	|                                  	|
|----------	|--------------	|----------------------------------	|
| Method   	| POST         	|                                  	|
| Description 	| Get a list of active admin users  	|                                  	|
| Returns  	| List of users  	|                                  	|

## Get a user
| Endpoint    	| /admin/users/get 	|                                  	|
|-------------	|------------------	|----------------------------------	|
| Method      	| POST             	|                                  	|
| Description 	|                  	|                                  	|
| Body        	|                  	|                                  	|
|             	| email            	| The user's email                 	|
|             	| password         	| The user's password in plaintext 	|
| Returns     	|                  	|                                  	|
|             	| name             	| The user's name                  	|
|             	| email             	| The user's email                 	|

## Create a user
| Endpoint    	| /admin/users/create 	|                                  	|
|-------------	|---------------------	|----------------------------------	|
| Method      	| POST                	|                                  	|
| Description 	| Create an admin user	|                                  	|
| Body        	|                     	|                                  	|
|             	| name               	| The user's name                 	|
|             	| email               	| The user's email                 	|
|             	| password            	| The user's password in plaintext 	|
| Returns     	|                     	|                                  	|
|             	| id		              	| The new user's id               	|

## Delete a user
| Endpoint    	| /admin/users/delete 	|                                  	|
|-------------	|---------------------	|----------------------------------	|
| Method      	| POST                	|                                  	|
| Description 	| Delete an admin user	|                                  	|
| Body        	|                     	|                                  	|
|             	| id               		| The user to delete id            	|
| Returns     	|                     	|                                  	|
|             	| deleted              	| Boolean whether the user was deleted 	|

# Admin Product CRUD
## Get admin products
| Endpoint    	| /admin/products			 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Get the list of products returns all the products since its admin.	|                                  	|
| Returns     	| List of products        	|                                  	|

## Get a product
| Endpoint    	| /admin/products/delete 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Get a product			   |                                  	|
| Body        	|                        	|                                  	|
|             	| id            	      	| The id of the product to get.		|
| Returns     	|                        	|                                  	|
|             	| name                  	| The product's name						|
|             	| description             	| The products description				|
|             	| cost                  	| The cost in MXN							|
|             	| amount                  	| The amount of products available	|
|             	| available               	| Boolean whether the product is available |

## Add a product
| Endpoint    	| /admin/products/add	 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Add a product		     	|                                  	|
| Body        	|                        	|                                  	|
|             	| name                  	| The new product's name				|
|             	| description             	| The products description				|
|             	| cost                  	| The cost in MXN							|
|             	| amount                  	| The amount of products available	|
|             	| available               	| Boolean whether the product is available |
| Returns     	|                        	|                                  	|
|             	| id	                   	| The new product's id					|

## Edit a product
| Endpoint    	| /admin/products/edit	 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Edit a product		     	|                                  	|
| Body        	|                        	|                                  	|
|             	| id            	      	| The id of the product that is going to be edited. |
|             	| name                  	| The product's name						|
|             	| description             	| The products description				|
|             	| cost                  	| The cost in MXN							|
|             	| amount                  	| The amount of products available	|
|             	| available               	| Boolean whether the product is available |
| Returns     	|                        	|                                  	|
|             	| edited                  	| Boolean whether the product was edited or not. |

## Delete a product
| Endpoint    	| /admin/products/delete 	|                                  	|
|-------------	|------------------------	|----------------------------------	|
| Method      	| POST                   	|                                  	|
| Description 	| Delete a product		   |                                  	|
| Body        	|                        	|                                  	|
|             	| id            	      	| The id of the product to delete.	|
| Returns     	|                        	|                                  	|
|             	| deleted                 	| Boolean whether the product was deleted or not. |