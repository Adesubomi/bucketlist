FORMAT: 1A

# Bucketlist

A simple restful API for a bucketlist service

# Group Bucketlists

This is the bucketlist to hold the list of items

## Create Bucketlist & Bucketlist Collection [/bucketlists]
### Bucketlist Collection [GET]
+ Response 200 (application/json)
	{
	    "status": "success",
	    "message": "List of Bucketlists",
	    "payload": [
	        {
	            "id": 1,
	            "created_by": 1,
	            "name": "My first bucketlist (edited)",
	            "created_at": "2018-10-03 21:46:40",
	            "updated_at": "2018-10-04 14:13:27"
	        }, ...
		]
	}

### Create a bucketlist [POST]
You may create your a new bucketlist using this action. It takes a JSON object
containing the name of the buckelist as request body, and it returns the
bucketlist that was created
+ Request (application/json)
    {
        "name": "New bucketlist title",
	}

+ Response 200 (application/json)
	{
		"status": "success",
		"message": "Bucketlist created successfully",
		"payload": {
			"name": "New bucketlist title",
			"created_by": 1,
			"created_at": "2018-10-04 19:43:29",
			"updated_at": "2018-10-04 19:43:29",
			"id": 7
		}
	}

## View, Update & Delete Bucketlist [/bucketlists/{bucketlists_id}]
+ Parameters
    + bucketlists_id (number) - ID of the bucketlist in the form of an integer

### View a bucketlist detail [GET]
You can view the details of bucketlist and items within this bucketlist
from this endpoint
+ Request (application/json)

+ Response (application/json)


### Update a bucketlist detail [PUT]
This is where you get to update a bucketlist
+ Request (application/json)

+ Response (application/json)


### Delete a bucketlist detail [DELETE]
You can delete a bucketlist by id in the form of an integer
+ Request (application/json)

+ Response (application/json)





# Group Items

This is the <b>items</b> we want to fit inside the bucketlists
