## Login

To authenticate (so we know who you are) and authorize (so we know what you're allowed to do) the user, they will need to perform a `Login`.


```go
import "github.com/strongdoc/client/go/api"

var userID string = "myuserID"
var password string = "password123"
var orgID string = "myOrgId"

token, err := api.Login(userID, password, orgID)
if err != nil {
    log.Printf("failed to log in: %s", err)
    os.Exit(1)
}
```

The `Login` function returns `token`, a string that acts as an identifier for the session. Most requests following this *must* contain it.

Once you log in, **keep your Bearer Token safe**, as anyone who has it
will be authenticated to do anything that you can. For instance, do not share them in publically accessible areas such as Github or in client code.

Every method requires authentication except this one, `Login` and `RegisterOrganization`.

## Logout

Once you finish your session, make sure to `Logout`. This will retire the key from use.

```go
import "github.com/strongdoc/client/go/api"

var token string = "myToken"

err := api.Logout(token)
if err != nil {
    log.Printf("Failed to log in: %s", err)
    os.Exit(1)
}
```

