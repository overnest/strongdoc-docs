
Strongdoc is 

The recommended method of accessing the Strongdoc API is via our GRPC endpoints. We support Go, Python, Java, and Node.js. A REST endpoint is also available here.

## Authentication

These methods generally deal with management of the session keys
that are required for most API calls.

All requests must contain a valid Bearer
Token obtained from the `login` method.
Do not share this token because anyone who
has it can do anything that you can,
including potentially destructive actions.

Before logging in, ensure that you have an account.
If you are the administrator of your organization,
register it to obtain your account details (link to registration).
Otherwise, request your administrator to make one for you.
(link to account creation)

### Login
POST /v1​/auth​/login

Once you have an organization with the account, the login method enables one to
obtain a session token. All requests following this must attach this Bearer Token
in the request headers / API calls.


```go
import "github.com/strongdoc/client/go/api"

adminID := "8253d03e-b24f-40e6-9838-fbc64b08b1fe"
adminPassword := "password123"
orgID := "63acb244-6575-4706-bfb3-6dc6616b4d69"

token, err := api.Login(adminID, adminPassword, orgID)
if err != nil {
    log.Printf("Failed to log in: %s", err)
    os.Exit(1)
}
```

### Logout

Retires the Bearer token in use, ending the session.

POST /v1​/logout

```go
import "github.com/strongdoc/client/go/api"

err := api.Logout(token)
if err != nil {
    log.Printf("Failed to log in: %s", err)
    os.Exit(1)
}
```


## Organizations

### Register Organization

POST /v1​/account​/registerOrganization

Before you start your operations, you will need to set up by
registering your organization. This request should contain
the organization name, organization address, the name of
the admin creator, their password, and email.

It returns the generated Organization ID and user ID which
you can use to start a session.

```go

import "github.com/strongdoc/client/go/api"

orgName := "myOrg"
orgAddr := "myAddr"
adminName := "john-doe"
adminPassword := "password123"
adminEmail := "hello@strongsalt.com"

orgID, adminID, err := api.RegisterOrganization(orgName, orgAddr, adminName, adminPassword, adminEmail)
if err != nil {
    log.Printf("Failed to register organization: %s", err)
    os.Exit(1)
}
```

### Remove Organization​

DELETE /v1​/account​/removeOrganization​/{force}
Remove an organization and its search indexes

### Remove Sharable Organization

PATCH
​/v1​/account​/removeSharableOrg
Remove a sharable organization from the user's organization.

### Add Sharable Organization

PATCH
​/v1​/account​/addSharableOrg
Add a sharable organization to the user's organization.

### Set Multi-Level Sharing

PUT
​/v1​/account​/setMultiLevelSharing
Update the organization's multi-level sharing setting

### Get Index Size

GET
​/v1​/doc​/getIndexSize
Obtain size of the organization's indexes

## Users & Access Control

### Register User

POST
​/v1​/account​/registerUser
Register new user

### List User

GET
​/v1​/account​/listUsers
List the users of the organization

### Promote User

POST
​/v1​/account​/promoteUser
Promote a regular user to administrator at the organization

### Demote User

POST
​/v1​/account​/demoteUser
Demote administrator to regular user at the organization. Attempting to demote the last administrator of an organization will fail

### Remove User

POST
​/v1​/account​/removeUser
Remove user from organization


## Documents

### Upload Document

POST /v1​/doc​/upload

Uploads an arbitrary amount of bytes into storage. 
The bytes you upload will be encrypted and stored
by us on the platform you choose. We currently offer
S3 storage, with more options coming soon.

#### Example 
The payload can be any arbitrary bytes. In this case, the 
bytes are obtained from a file located locally in the same
directory as the Go program being executed.
```go
import (
    "github.com/strongdoc/client/go/api"
    "io/ioutil"
)

token, _ := api.Login(adminID, adminPassword, orgID)
fileName := "CompanyIntro.txt"
fileBytes, _ := ioutil.ReadFile(filename)
uploadDocID, err := api.UploadDocument(token, fileName, fileBytes)
	if err != nil {
		log.Printf("Can not upload document: %s", err)
		os.Exit(1)
	}
```
*Uploading a file on the local filesystem.*

### Download Document

GET
​/v1​/doc​/download​/{docID}
Download document

### Decrypt Document

GET
​/v1​/doc​/decrypt​/{docID}
Decrypt document decrypts the ciphertext passed in and returns decrypted plain text back to the user without storing it

### Encrypt Document

POST
​/v1​/doc​/encrypt
Encrypt document encrypts the document and returns the ciphertext back to the user without storing it.

### Get Document Size

GET
​/v1​/doc​/getSize
Obtain the size of the user's stored documents

The payload can be any arbitrary bytes. In this case, the 
bytes are obtained from a file located locally in the same
directory as the Go program being executed.
```go
import (
    "github.com/strongdoc/client/go/api"
    "io/ioutil"
)

token, _ := api.Login(adminID, adminPassword, orgID)
fileName := "CompanyIntro.txt"
fileBytes, _ := ioutil.ReadFile(filename)
uploadDocID, err := api.UploadDocument(token, fileName, fileBytes)
	if err != nil {
		log.Printf("Can not upload document: %s", err)
		os.Exit(1)
	}
```

## Billing

### Get Billing Period

GET
​/v1​/account​/billing​/period
Obtain the billing period

### List Billing

GET
​/v1​/account​/billing
List all items of the cost breakdown and also other details such as the billing period

### Update Billing Period

PUT
​/v1​/account​/billing​/period
Change the billing period

## Miscellany

### Show Server Configuration

**Admin** | Method requires Admin privileges.

Shows current server configuration. 

GET
​/v1​/configuration