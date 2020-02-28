## Login

To authenticate (so we know who you are) and authorize (so we know what you're allowed to do) the user, they will need to perform a `Login`.


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

The `Login` function returns a `token`. Most requests following this *must* contain it.

Once you log in, **keep your Bearer Token safe**, as anyone who has it
will be authenticated to do anything that you can. For instance, do not share them in publically accessible areas such as Github or in client code.

Every method requires authentication except this one, `Login` and `RegisterOrganization`.

## Logout

Once you finish your session, make sure to `Logout`. This will retire the key from use.

```go
import "github.com/strongdoc/client/go/api"

err := api.Logout(token)
if err != nil {
    log.Printf("Failed to log in: %s", err)
    os.Exit(1)
}
```

