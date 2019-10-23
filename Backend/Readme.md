# Backend

## Response format
| Key   	| Description                                                        	|                    	|
|-------	|--------------------------------------------------------------------	|--------------------	|
| error 	| If there's no error, returns false, if not returns the following   	|                    	|
|       	| code                                                               	| The error code     	|
|       	| Message                                                            	| Message to display 	|
| data  	| The data returned from the call. If there's an error returns false 	|                    	|
|       	|                                                                    	|                    	|


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

## Delete a user
| Endpoint    	| /admin/users/delete 	|                                  	|
|-------------	|---------------------	|----------------------------------	|
| Method      	| POST                	|                                  	|
| Description 	| Delete an admin user	|                                  	|
| Body        	|                     	|                                  	|
|             	| id               		| The user to delete id            	|
| Returns     	|                     	|                                  	|
|             	| deleted              	| Boolean whether the user was deleted 	|