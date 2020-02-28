Welcome to Strongdoc *Getting Started* guide. Strongdoc is a service that makes data privacy simple to implement in your own services.

Following the instructions in this guide will properly equip you to start using the Strongdoc API.

## Prerequisites

There is only one prerequisite, and it is that you have your preferred language installed on your device. 

**Install Go on your OS**: (https://golang.org/doc/install)

## Downloading and Setting Up the Strongdoc Go API

The API is available as a Go Module. To use it, run

`go get github.com/overnest/strongdoc-go@v0.1.10`

Then, import it into your files at the top of your files:

```go
import (
    // other imports
    "github.com/overnest/strongdoc-go-sdk/api"`
    // even more imports
)
```

Alternatively, you can first do the above and run `go get all`.


**Link to API Github Repository**: https://github.com/overnest/strongdoc-go-sdk


## Setting up your first account

Before logging in, ensure that you have an account. 
If you do not have one, what you need to do depends on 
your role in your organization:

### A. You are a **regular user**

If you are a regular user, you need to ask your organization administrator 
to help you set up an account. They should give you:
a. a `userID`
b. a `password` 
c. the `orgID` belonging to your organization

### B. You are an **organization administrator**

Again, this depends. If...

#### I. You are not the first Administrator

If you are an admin of your organization and do not have an account,
contact an existing administrator create one for you. 

#### II. You are the first Administrator of your Organization

However, if you are the *first* administrator of your organization, you need to register below.

Do the following:

```go

import "github.com/strongdoc/client/go/api"

// Replace the below values as appropriate
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
fmt.Printf("Successfully registered.\n Your orgID: [%s]\n, adminID: [$s]\n", orgID, adminID)
```

If your registration is successful, then you should receive a response.

> **Warning**, if you are the only admin and you lose your credentials,
> please contact us for assistance.



