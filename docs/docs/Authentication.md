## Login

To authenticate (so we know who you are) and authorize (so we know what you're allowed to do) the user, they will need to perform a `Login`.


```go
// set your credentials here
var userID string
var password string
var orgID string

token, err := api.Login(userID, password, orgID)
if err != nil {
    log.Printf("failed to log in: %s", err)
    os.Exit(1)
}
fmt.Printf("Successfully logged in.\n")
```

The `Login` function returns `token`, a string that acts as an identifier for the session. Most requests following this *must* contain it.

Once you log in, **keep your Bearer Token safe**, as anyone who has it
will be authenticated to do anything that you can. For instance, do not share them in publically accessible areas such as Github or in client code.

Every method requires authentication except this one, `Login` and `RegisterOrganization`.

## Logout

Once you finish your session, make sure to `Logout`. This will retire the key from use.

```go
var token string // set your token here

err := api.Logout(token)
if err != nil {
    log.Printf("Failed to log out: %s\n", err)
    os.Exit(1)
}
```

