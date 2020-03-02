## Register User

Creates a user in the organization.

```go
var username string // fill in new user's info here
var password string // fill in new user's info here
var email string // fill in new user's info here
var admin bool // indicate if the new user should be admin here

userID, err := api.RegisterUser(token, username, password, email, admin)
if err != nil {
    log.Printf("failed to Register User: %s", err)
    os.Exit(1)
}
fmt.Println("New user created, userID: [%s]\n", userID)
```

## Delete User

Deletes a user in the organization.

```go
var userID string // set user's UserID here

count, err := api.RemoveUser(token, userID)
if err != nil {
    log.Printf("failed to Remove User: %s", err)
    os.Exit(1)
}
fmt.Printf("User [%s] deleted.\n", userID)
```

## List Users

Lists all the users in the organization of the current user.

```go
users, err := ListUsers(token)
if err != nil {
    log.Printf("failed to List User: %s", err)
    os.Exit(1)
}
for i, u := range users {
    fmt.Printf("%d | UserName: [%s], UserID: [%s], IsAdmin: [%t]\n--------\n", i, u.UserName, u.UserID, u.IsAdmin)
}
```

## Authentication

Some functions require you to be an administrator to execute,
or may grant additional functionality.

### Promote User

Promotes a user in the organization to the Administrator level.

```go
var userID string // set user's UserID here

ok, err := api.PromoteUser(token, userID)
if err != nil {
    log.Printf("failed to Promote User: %s", err)
    os.Exit(1)
}
fmt.Printf("User [%s] Promoted.\n", userID)
```

> You can only promote users that are in your organization. 

### Demote User

Demotes a user in the organization from the Administrator level.

```go
var userID string // set user's UserID here

ok, err := api.DemoteUser(token, userID)
if err != nil {
    log.Printf("failed to Demote User: %s", err)
    os.Exit(1)
}
fmt.Printf("User [%s] Demoted.\n", userID)
```

> You cannot demote a user if he is the last administrator of the organization.

> You can only demote users that are in your organization. 