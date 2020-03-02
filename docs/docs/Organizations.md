## Add Organization

Add organization creates an organization with the given input and returns the organization ID. 

This function also creates a new administrator account.
```go
// Replace the below values as appropriate
var orgName string
var orgAddr string
var adminName string
var adminPassword string
var adminEmail string

var orgID string
var adminID string

orgID, adminID, err := RegisterOrganization(orgName, orgAddr, adminName, adminPassword, adminEmail)
if err != nil {
    fmt.Printf("Could not Register Organization: %v", err)
    os.Exit(1)
}
fmt.Printf("Created new Organization. orgID: %s, adminID: %f\n", orgID, adminID)
```

## Remove Organization

Removes the organization and all users, documents, associated with it.

```go
var orgID string // set your orgID here

ok, err := RemoveOrganization(orgID)
if err != nil {
    fmt.Printf("Could not Remove Organization: %v", err)
    os.Exit(1)
}
fmt.Println("Removed Organization successfully.")
```
